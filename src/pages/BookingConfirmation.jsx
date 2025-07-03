import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BookingConfirmation = ({ formData, onEdit }) => {
  const downloadReceipt = () => {
    const receiptElement = document.getElementById("receipt");

    if (!receiptElement) {
      alert("Receipt section not found!");
      return;
    }

    html2canvas(receiptElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("hotel-booking-receipt.pdf");
    });
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-green-600 text-5xl">✅</div>
      <h2 className="text-3xl font-bold text-blue-700">Booking Confirmed!</h2>

      <p className="text-gray-600">
        Thank you for choosing <strong>DreamStay</strong>. Your stay has been booked successfully!
      </p>

      <button
        onClick={onEdit}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
      >
        ✏️ Edit Info
      </button>

      {/* 📋 Receipt Content */}
      <div
        id="receipt"
        className="text-left bg-gray-100 p-4 rounded-lg shadow space-y-4 mt-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1 mb-1">
            👤 Guest Information
          </h3>
          <p>
            <strong>Name:</strong> {formData.fullName}
          </p>
          <p>
            <strong>Mobile:</strong> {formData.mobile}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1 mb-1">
            🛏️ Booking Details
          </h3>
          <p>
            <strong>Check-in:</strong> {formData.checkIn}
          </p>
          <p>
            <strong>Check-out:</strong> {formData.checkOut}
          </p>
          <p>
            <strong>Total Members:</strong> {formData.totalMembers}
          </p>
          <p>
            <strong>Room Type:</strong> {formData.roomType}
          </p>
          <p>
            <strong>Amount:</strong> ₹{formData.amount}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1 mb-1">
            💳 Payment Method
          </h3>
          <p>
            <strong>Mode:</strong> {formData.paymentMethod}
          </p>

          {formData.paymentMethod === "UPI" && (
            <p>
              <strong>UPI ID:</strong> {formData.upiId}
            </p>
          )}

          {formData.paymentMethod === "Net Banking" && (
            <p>
              <strong>Username:</strong> {formData.netBankUsername}
            </p>
          )}

          {formData.paymentMethod === "Debit/Credit Card" && (
            <>
              <p>
                <strong>Card Number:</strong> **** **** ****{" "}
                {formData.cardNumber?.slice(-4)}
              </p>
              <p>
                <strong>Expiry:</strong> {formData.expiry}
              </p>
            </>
          )}
        </div>
      </div>

      {/* 📄 Download PDF Button */}
      <button
        onClick={downloadReceipt}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
      >
        📄 Download Receipt
      </button>

      {/* 📱 WhatsApp Share */}
      <a
        href={`https://wa.me/?text=My hotel booking is confirmed at DreamStay! Check-in: ${formData.checkIn}, Check-out: ${formData.checkOut}, Room: ${formData.roomType}, Amount: ₹${formData.amount}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 bg-green-500 text-white text-center py-2 rounded-lg hover:bg-green-600"
      >
        📱 Share on WhatsApp
      </a>
    </div>
  );
};

export default BookingConfirmation;
