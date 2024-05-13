'use client'
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

const ApplyLeave = ({ decodedToken }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log(decodedToken, "heyyyyyyyyyyyyyyyyyyyyyyyyyy")

  const formik = useFormik({
    initialValues: {
      fromDate: '',
      toDate: '',
      leaveType: '',
      reason: '',
    },
    validationSchema: Yup.object({
      fromDate: Yup.string().required('From date is required'),
      toDate: Yup.string().required('To date is required'),
      leaveType: Yup.string().required('Leave type is required'),
      reason: Yup.string().required('Reason is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
      
        const userEmail=decodedToken.email
        const userId=decodedToken.userId;
        
        // Create leave entry API call
        const leaveResponse = await fetch('/api/saveLeave', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            ...values,
          }),
        });
console.log(leaveResponse, "leaveresponse.............")
        if (!leaveResponse.ok) {
          throw new Error('Failed to create leave entry');
        }

        // // Send email API call
        // const emailResponse = await fetch('/api/sendEmail', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     userEmail,
        //     subject: 'Leave Application',
        //     html: `Leave application details: 
        //       From Date: ${values.fromDate}
        //       To Date: ${values.toDate}
        //       Leave Type: ${values.leaveType}
        //       Reason: ${values.reason}`,
        //   }),
        // });

        // if (emailResponse.ok) {
        //   alert('Email sent successfully');
        // } else {
        //   throw new Error('Failed to send email');
        // }
      } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to submit leave application');
      }
      setIsSubmitting(false);
    },
  });

  const handleCloseForm = () => {
    // Add logic to close the form
    console.log('Closing the form...');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Apply for Leave</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="fromDate" className="text-gray-700 font-semibold mb-2">From Date</label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={formik.values.fromDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.fromDate && formik.errors.fromDate ? (
              <div className="text-red-500">{formik.errors.fromDate}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="toDate" className="text-gray-700 font-semibold mb-2">To Date</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={formik.values.toDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.toDate && formik.errors.toDate ? (
              <div className="text-red-500">{formik.errors.toDate}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="leaveType" className="text-gray-700 font-semibold mb-2">Leave Type</label>
            <select
              id="leaveType"
              name="leaveType"
              value={formik.values.leaveType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="annual">Annual Leave</option>
            </select>
            {formik.touched.leaveType && formik.errors.leaveType ? (
              <div className="text-red-500">{formik.errors.leaveType}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="reason" className="text-gray-700 font-semibold mb-2">Reason</label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.reason && formik.errors.reason ? (
              <div className="text-red-500">{formik.errors.reason}</div>
            ) : null}
          </div>
          <div className="flex justify-center">
            <button type="submit" disabled={isSubmitting} className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md">Submit</button>
            <button type="button" onClick={handleCloseForm} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md ml-4">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
