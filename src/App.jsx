import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookingForm from './pages/BookingForm';
import BookingConfirmation from './pages/BookingConfirmation';
import AllBookings from './pages/AllUsers';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookingForm />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/portal/b-data-list-7a9f3c" element={<AllBookings />} />
    </Routes>
  );
}

export default App;
