import React from "react";

const FormNavigation = ({ hasPrev, onPrev, hasNext, onNext, isFinal, onSubmit }) => {
  return (
    <div className="flex justify-between mt-6">
      {hasPrev ? (
        <button
          onClick={onPrev}
          className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
        >
          Back
        </button>
      ) : (
        <div /> // to keep spacing consistent when no Back button
      )}

      {hasNext && (
        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Next
        </button>
      )}

      {isFinal && (
        <button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
