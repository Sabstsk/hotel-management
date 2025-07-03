import React from "react";
import FormNavigation from "./FormNavigation";

const Step2BookingDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div className="form-step space-y-5">
      <h2 className="text-2xl font-semibold text-blue-700 border-b pb-2 mb-4">
        🛏️ Booking Details
      </h2>

      {/* Total Members */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Total Members
        </label>
        <input
          type="number"
          placeholder="Enter Total Members"
          value={formData.totalMembers}
          onChange={(e) =>
            setFormData({ ...formData, totalMembers: e.target.value })
          }
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>

      {/* Room Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room Type
        </label>
        <select
          value={formData.roomType}
          onChange={(e) =>
            setFormData({ ...formData, roomType: e.target.value })
          }
          className="border border-gray-300 p-2 w-full rounded-md"
        >
          <option value="">Select Room Type</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Booking Amount (₹)
        </label>
        <input
          type="number"
          placeholder="Enter Amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>

      {/* Navigation Buttons */}
      <FormNavigation
        hasPrev={true}
        onPrev={prevStep}
        hasNext={true}
        onNext={nextStep}
      />
    </div>
  );
};

export default Step2BookingDetails;
