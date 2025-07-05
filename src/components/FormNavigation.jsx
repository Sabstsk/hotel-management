import React from "react";

const FormNavigation = ({ hasPrev, onPrev, hasNext, onNext, isFinal, onSubmit, nextLabel = 'Next' }) => {
  const baseButtonStyles = 'font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out';
  const primaryButtonStyles = `${baseButtonStyles} text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 hover:shadow-2xl`;
  const secondaryButtonStyles = `${baseButtonStyles} text-gray-800 bg-gray-100 hover:bg-gray-200 hover:scale-105`;

  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
      {hasPrev ? (
        <button
          type="button"
          onClick={onPrev}
          className={secondaryButtonStyles}
        >
          Back
        </button>
      ) : (
        <div /> // to keep spacing consistent when no Back button
      )}

      {hasNext && (
        <button
          type="button"
          onClick={onNext}
          className={primaryButtonStyles}
        >
          {nextLabel}
        </button>
      )}

      {isFinal && (
        <button
          type="button"
          onClick={onSubmit}
          className={primaryButtonStyles}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
