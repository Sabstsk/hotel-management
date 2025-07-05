import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormNavigation from './FormNavigation';

const Step1BasicInfo = ({ formData, setFormData, nextStep }) => {
  const formik = useFormik({
    initialValues: {
      fullName: formData.fullName || '',
      mobile: formData.mobile || '',
      checkIn: formData.checkIn || '',
      checkOut: formData.checkOut || '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number')
        .required('Mobile is required'),
      checkIn: Yup.date().required('Check-in date is required'),
      checkOut: Yup.date().required('Check-out date is required'),
    }),
    onSubmit: (values) => {
      setFormData({ ...formData, ...values });
      nextStep();
    },
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="md:w-1/2">
        <img src="/images/img2.jpg" alt="Hotel Lobby" className="hero" />
      </div>
      <div className="md:w-1/2 w-full">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">Enter Your Details</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              placeholder="Enter Full Name"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="danger text-sm mt-1">{formik.errors.fullName}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              placeholder="Enter Mobile Number"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="danger text-sm mt-1">{formik.errors.mobile}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="checkIn">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formik.values.checkIn}
              onChange={formik.handleChange}
            />
            {formik.touched.checkIn && formik.errors.checkIn && (
              <div className="danger text-sm mt-1">{formik.errors.checkIn}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="checkOut">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formik.values.checkOut}
              onChange={formik.handleChange}
            />
            {formik.touched.checkOut && formik.errors.checkOut && (
              <div className="danger text-sm mt-1">{formik.errors.checkOut}</div>
            )}
          </div>
          <FormNavigation hasNext onNext={formik.handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default Step1BasicInfo;

