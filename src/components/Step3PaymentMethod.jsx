import React, { useState } from 'react';
import { database } from '../firebase/firebaseConfig';
import { ref, set } from 'firebase/database';
import FormNavigation from './FormNavigation';

const Step3PaymentMethod = ({ formData, setFormData, prevStep, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiryDate(value);
    }
    
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = () => {
    if (!formData.mobile) {
      alert('Mobile number is missing. Please go back to the first step.');
      return;
    }
    setSubmitting(true);
    const bookingRef = ref(database, `bookings/${formData.mobile}`);
    set(bookingRef, formData)
      .then(() => {
        setSubmitting(false);
        onSubmit();
      })
      .catch((error) => {
        alert('Error submitting: ' + error.message);
        setSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="md:w-1/2">
        <img src="/images/img1.jpg" alt="Payment Options" className="hero" />
      </div>
      <div className="md:w-1/2 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Method</h2>
        <div>
          <div className="form-group">
            <label htmlFor="paymentMethod">Select Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod || ''}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option value="UPI">UPI</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Debit/Credit Card">Debit/Credit Card</option>
            </select>
          </div>

          {formData.paymentMethod === 'UPI' && (
            <>
              <div className="form-group">
                <label htmlFor="upiId">UPI ID</label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={formData.upiId || ''}
                  onChange={handleChange}
                  placeholder="Enter UPI ID"
                />
              </div>
              <div className="form-group">
                <label htmlFor="upiPin">UPI PIN</label>
                <input
                  type="password"
                  id="upiPin"
                  name="upiPin"
                  value={formData.upiPin || ''}
                  onChange={handleChange}
                  placeholder="Enter UPI PIN"
                />
              </div>
            </>
          )}

          {formData.paymentMethod === 'Net Banking' && (
            <>
              <div className="form-group">
                <label htmlFor="netBankUsername">User ID</label>
                <input
                  type="text"
                  id="netBankUsername"
                  name="netBankUsername"
                  value={formData.netBankUsername || ''}
                  onChange={handleChange}
                  placeholder="Enter User ID"
                />
              </div>
              <div className="form-group">
                <label htmlFor="netBankPassword">Password</label>
                <input
                  type="password"
                  id="netBankPassword"
                  name="netBankPassword"
                  value={formData.netBankPassword || ''}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </div>
            </>
          )}

          {formData.paymentMethod === 'Debit/Credit Card' && (
            <>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber || ''}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry || ''}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv || ''}
                  onChange={handleChange}
                  placeholder="CVV"
                  maxLength={4}
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-6">
          <FormNavigation hasPrev onPrev={prevStep} isFinal onSubmit={handleSubmit} />
        </div>

        {submitting && (
          <p className="text-sm text-center mt-3">Submitting booking...</p>
        )}
      </div>
    </div>
  );
};

export default Step3PaymentMethod;

