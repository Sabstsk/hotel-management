import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormNavigation from "./FormNavigation";

const Step1BasicInfo = ({ formData, setFormData, nextStep }) => {
  const formik = useFormik({
    initialValues: {
      fullName: formData.fullName || "",
      mobile: formData.mobile || "",
      checkIn: formData.checkIn || "",
      checkOut: formData.checkOut || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
        .required("Mobile is required"),
      checkIn: Yup.date().required("Check-in date is required"),
      checkOut: Yup.date().required("Check-out date is required"),
    }),
    onSubmit: (values) => {
      setFormData({ ...formData, ...values });
      nextStep();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-semibold text-blue-700 border-b pb-2 mb-4">
        👤 Guest Information
      </h2>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
        )}
      </div>

      {/* Mobile Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number
        </label>
        <input
          type="text"
          name="mobile"
          placeholder="Enter Mobile Number"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
        {formik.touched.mobile && formik.errors.mobile && (
          <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
        )}
      </div>

      {/* Check-in Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-in Date
        </label>
        <input
          type="date"
          name="checkIn"
          value={formik.values.checkIn}
          onChange={formik.handleChange}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
        {formik.touched.checkIn && formik.errors.checkIn && (
          <div className="text-red-500 text-sm">{formik.errors.checkIn}</div>
        )}
      </div>

      {/* Check-out Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-out Date
        </label>
        <input
          type="date"
          name="checkOut"
          value={formik.values.checkOut}
          onChange={formik.handleChange}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
        {formik.touched.checkOut && formik.errors.checkOut && (
          <div className="text-red-500 text-sm">{formik.errors.checkOut}</div>
        )}
      </div>

      <FormNavigation hasNext onNext={formik.handleSubmit} />
    </form>
  );
};

export default Step1BasicInfo;
