import React, { useState } from "react";
import Step1BasicInfo from "../components/Step1BasicInfo";
import Step2BookingDetails from "../components/Step2BookingDetails";
import Step3PaymentMethod from "../components/Step3PaymentMethod";
import BookingConfirmation from "./BookingConfirmation";

const steps = [
  { label: "Basic Info" },
  { label: "Booking Details" },
  { label: "Payment" },
];

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submissionAttempt, setSubmissionAttempt] = useState(0);
  const [globalMessage, setGlobalMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    checkIn: "",
    checkOut: "",
    totalMembers: "",
    roomType: "",
    amount: "",
    paymentMethod: "",
    netBankUsername: "",
    netBankPassword: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const goToFirstStep = () => setStep(1);
  const incrementSubmissionAttempt = () => setSubmissionAttempt(prev => prev + 1);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card">
        <h1 className="text-3xl font-bold text-center mb-4">🌟 DreamStay Booking</h1>

        {/* Global Message */}
        {globalMessage && (
          <p className="text-red-600 font-bold text-center mb-4">
            {globalMessage}
          </p>
        )}

        {/* Step Indicator */}
        {!submitted && (
          <div className="step-indicator mb-6">
            {steps.map((s, idx) => (
              <div
                key={s.label}
                className={`step${step === idx + 1 ? " active" : ""}`}
                title={s.label}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        )}

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
                submissionAttempt={submissionAttempt}
                incrementSubmissionAttempt={incrementSubmissionAttempt}
                goToFirstStep={goToFirstStep}
                setGlobalMessage={setGlobalMessage}
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
  );
};

export default BookingForm;
