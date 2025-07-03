import React, { useState } from "react";
import Step1BasicInfo from "../components/Step1BasicInfo";
import Step2BookingDetails from "../components/Step2BookingDetails";
import Step3PaymentMethod from "../components/Step3PaymentMethod";
import BookingConfirmation from "./BookingConfirmation";

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    checkIn: "",
    checkOut: "",
    totalMembers: "",
    roomType: "",
    amount: "",
    paymentMethod: "",
    upiId: "",
    netBankUsername: "",
    netBankPassword: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    atmPin: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-60 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            🌟 DreamStay Hotel Booking
          </h1>

          {!submitted ? (
            <>
              {step === 1 && (
                <Step1BasicInfo
                  formData={formData}
                  setFormData={setFormData}
                  nextStep={nextStep}
                />
              )}
              {step === 2 && (
                <Step2BookingDetails
                  formData={formData}
                  setFormData={setFormData}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {step === 3 && (
                <Step3PaymentMethod
                  formData={formData}
                  setFormData={setFormData}
                  prevStep={prevStep}
                  onSubmit={() => setSubmitted(true)}
                />
              )}
            </>
          ) : (
            <BookingConfirmation
              formData={formData}
              onEdit={() => {
                setStep(1);
                setSubmitted(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
