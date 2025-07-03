import React, { useState } from "react";
import { database } from "../firebase/firebaseConfig";
import { ref, push } from "firebase/database";
import FormNavigation from "./FormNavigation";

const Step3PaymentMethod = ({ formData, setFormData, prevStep, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    const bookingRef = ref(database, "bookings");
    push(bookingRef, formData)
      .then(() => onSubmit())
      .catch((error) => {
        alert("Error submitting: " + error.message);
        setSubmitting(false);
      });
  };

  return (
    <div className="form-step space-y-5">
      <h2 className="text-2xl font-semibold text-blue-700 border-b pb-2 mb-4">
        💳 Payment Method
      </h2>

      {/* Select Payment Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Payment Method
        </label>
        <select
          className="w-full border border-gray-300 p-2 rounded-md"
          value={formData.paymentMethod}
          onChange={(e) =>
            setFormData({ ...formData, paymentMethod: e.target.value })
          }
        >
          <option value="">-- Select --</option>
          <option value="Net Banking">Net Banking</option>
          <option value="UPI">UPI</option>
          <option value="Debit/Credit Card">Debit/Credit Card</option>
        </select>
      </div>

      {/* Net Banking Fields */}
      {formData.paymentMethod === "Net Banking" && (
        <>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Enter Username"
              value={formData.netBankUsername || ""}
              onChange={(e) =>
                setFormData({ ...formData, netBankUsername: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Enter Password"
              value={formData.netBankPassword || ""}
              onChange={(e) =>
                setFormData({ ...formData, netBankPassword: e.target.value })
              }
            />
          </div>
        </>
      )}

      {/* UPI Field */}
      {formData.paymentMethod === "UPI" && (
        <div>
          <label className="block text-sm font-medium">UPI ID</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="example@upi"
            value={formData.upiId || ""}
            onChange={(e) =>
              setFormData({ ...formData, upiId: e.target.value })
            }
          />
        </div>
      )}

      {/* Card Fields */}
      {formData.paymentMethod === "Debit/Credit Card" && (
        <>
          <div>
            <label className="block text-sm font-medium">Card Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              type="month"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={formData.expiry || ""}
              onChange={(e) =>
                setFormData({ ...formData, expiry: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CVV</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="123"
              maxLength={3}
              value={formData.cvv || ""}
              onChange={(e) =>
                setFormData({ ...formData, cvv: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">ATM PIN</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="****"
              maxLength={4}
              value={formData.atmPin || ""}
              onChange={(e) =>
                setFormData({ ...formData, atmPin: e.target.value })
              }
            />
          </div>
        </>
      )}

      {/* Navigation Buttons */}
      <FormNavigation
        hasPrev={true}
        onPrev={prevStep}
        isFinal={true}
        onSubmit={handleSubmit}
      />

      {submitting && (
        <p className="text-sm text-gray-500 mt-3">Submitting booking...</p>
      )}
    </div>
  );
};

export default Step3PaymentMethod;
