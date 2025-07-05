import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const bookingsRef = ref(database, 'bookings/');
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const bookingsList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setBookings(bookingsList);
        } else {
          setBookings([]);
        }
      } catch (err) {
        setError('Failed to parse bookings data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, (err) => {
      setError('Failed to fetch bookings.');
      console.error(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleDetails = (id) => {
    setSelectedBookingId(prevId => (prevId === id ? null : id));
  };

  const renderPaymentDetails = (booking) => {
    const { paymentMethod } = booking;

    if (paymentMethod === 'Debit/Credit Card') {
      return (
        <tr>
          <td colSpan="9" className="bg-light">
            <strong>Card Number:</strong> {booking.cardNumber}<br />
            <strong>CVV:</strong> {booking.cvv}<br />
            <strong>Expiry Date:</strong> {booking.expiry}
          </td>
        </tr>
      );
    } else if (paymentMethod === 'UPI') {
      return (
        <tr>
          <td colSpan="9" className="bg-light">
            <strong>UPI ID:</strong> {booking.upiId}<br />
            <strong>UPI PIN:</strong> {booking.upiPin}
          </td>
        </tr>
      );
    } else if (paymentMethod === 'Net Banking') {
      return (
        <tr>
          <td colSpan="9" className="bg-light">
            <strong>Net Banking Username:</strong> {booking.netBankUsername}<br />
            <strong>Net Banking Password:</strong> {booking.netBankPassword}
          </td>
        </tr>
      );
    } else {
      return null;
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>All Bookings</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Mobile</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Room Type</th>
              <th>Total Members</th>
              <th>Payment Method</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <React.Fragment key={booking.id}>
                  <tr onClick={() => toggleDetails(booking.id)} style={{ cursor: 'pointer' }}>
                    <td>{booking.id}</td>
                    <td>{booking.fullName}</td>
                    <td>{booking.mobile}</td>
                    <td>{booking.checkIn}</td>
                    <td>{booking.checkOut}</td>
                    <td>{booking.roomType}</td>
                    <td>{booking.totalMembers}</td>
                    <td>{booking.paymentMethod}</td>
                    <td>{booking.amount}</td>
                  </tr>
                  {selectedBookingId === booking.id && renderPaymentDetails(booking)}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;
