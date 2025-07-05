import React from 'react';
import FormNavigation from './FormNavigation';

const Step2BookingDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="md:w-1/2">
        <img src="/images/img3.jpg" alt="Hotel Room" className="hero" />
      </div>
      <div className="md:w-1/2 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Booking Details</h2>
        <div>
          <div className="form-group">
            <label htmlFor="totalMembers">Total Members</label>
            <input
              type="number"
              id="totalMembers"
              name="totalMembers"
              value={formData.totalMembers || ''}
              onChange={handleChange}
              placeholder="Enter Total Members"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="roomType">Room Type</label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Room Type</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount || ''}
              onChange={handleChange}
              placeholder="Enter Amount"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <FormNavigation hasPrev onPrev={prevStep} hasNext onNext={nextStep} />
        </div>
      </div>
    </div>
  );
};

export default Step2BookingDetails;

