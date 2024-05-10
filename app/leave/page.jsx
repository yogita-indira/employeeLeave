'use client'
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Leave = () => {
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
    onSubmit: (values) => {
      console.log(values);
      // Add submission logic here
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="max-w-screen-xl w-1/3 mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Apply for Leave</h2>
            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="fromDate" className="sr-only">From Date</label>
                  <input
                    id="fromDate"
                    name="fromDate"
                    type="date"
                    autoComplete="off"
                    required
                    value={formik.values.fromDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                      focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                        formik.touched.fromDate && formik.errors.fromDate ? 'border-red-500' : ''
                      }`
                    }
                    placeholder="From Date"
                  />
                  {formik.touched.fromDate && formik.errors.fromDate ? (
                    <div className="text-red-500">{formik.errors.fromDate}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="toDate" className="sr-only">To Date</label>
                  <input
                    id="toDate"
                    name="toDate"
                    type="date"
                    autoComplete="off"
                    required
                    value={formik.values.toDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                      focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                        formik.touched.toDate && formik.errors.toDate ? 'border-red-500' : ''
                      }`
                    }
                    placeholder="To Date"
                  />
                  {formik.touched.toDate && formik.errors.toDate ? (
                    <div className="text-red-500">{formik.errors.toDate}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="leaveType" className="sr-only">Leave Type</label>
                  <select
                    id="leaveType"
                    name="leaveType"
                    autoComplete="off"
                    required
                    value={formik.values.leaveType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                      focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                        formik.touched.leaveType && formik.errors.leaveType ? 'border-red-500' : ''
                      }`
                    }
                  >
                    <option value="">Select Leave Type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="annual">Annual Leave</option>
                  </select>
                  {formik.touched.leaveType && formik.errors.leaveType ? (
                    <div className="text-red-500">{formik.errors.leaveType}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="reason" className="sr-only">Reason</label>
                  <input
                    id="reason"
                    name="reason"
                    type="text"
                    autoComplete="off"
                    required
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                      focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                        formik.touched.reason && formik.errors.reason ? 'border-red-500' : ''
                      }`
                    }
                    placeholder="Reason"
                  />
                  {formik.touched.reason && formik.errors.reason ? (
                    <div className="text-red-500">{formik.errors.reason}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply for Leave
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
