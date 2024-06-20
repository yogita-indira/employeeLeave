"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwt from "jsonwebtoken";

const ApplyLeave = ({ decodedToken }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
const handleSubmitButton=()=>{
  router.push('/employee/EDashboard');
}
  const formik = useFormik({
    initialValues: {
      userId: decodedToken.userId, // Add userId field
      start_date: "", // Change fromDate to start_date
      end_date: "", // Change toDate to end_date
      leave_type: "",
      status: "", // Change leaveType to leave_type
      reason: "",
    },
    validationSchema: Yup.object({
      start_date: Yup.string().required("From date is required"), // Change fromDate to start_date
      end_date: Yup.string().required("To date is required"), // Change toDate to end_date
      leave_type: Yup.string().required("Leave type is required"), // Change leaveType to leave_type
      reason: Yup.string().required("Reason is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const leaveResponse = await fetch("/api/employee/saveLeave", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: decodedToken.userId,
            start_date: values.start_date,
            end_date: values.end_date,
            leave_type: values.leave_type,
            status: "pending",
            reason: values.reason,
          }),
        });
        if (!leaveResponse.ok) {
          throw new Error("Failed to create leave entry");
        } else {
          console.log("done");
        }

        const sendersEmail = decodedToken.email;
        console.log(sendersEmail);
        const emailContent = "<p>This is the HTML content of the email.</p>";
        const subject = "request for leave";
        const sendEmailResponse = await fetch("/api/employee/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sendersEmail: sendersEmail,
            subject: subject,
            emailContent: emailContent,
          }),
        });

        if (!sendEmailResponse.ok) {
          throw new Error("Failed to send email");
        } else {
          router.push("/employee/emailSuccessPage");
          console.log("email sent successfully........");
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("Failed to submit leave application");
      }
      setIsSubmitting(false);
    },
  });

  const handleCloseForm = () => {
    console.log("Closing the form...");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Apply for Leave
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="start_date"
              className="text-gray-700 font-semibold mb-2"
            >
              From Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formik.values.start_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.start_date && formik.errors.start_date ? (
              <div className="text-red-500">{formik.errors.start_date}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="end_date"
              className="text-gray-700 font-semibold mb-2"
            >
              To Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formik.values.end_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.end_date && formik.errors.end_date ? (
              <div className="text-red-500">{formik.errors.end_date}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="leave_type"
              className="text-gray-700 font-semibold mb-2"
            >
              Leave Type
            </label>
            <select
              id="leave_type"
              name="leave_type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.leave_type}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="">Select Leave Type</option>
              <option value="sick">sick</option>
              <option value="annual">annual</option>
            </select>
            {formik.touched.leave_type && formik.errors.leave_type ? (
              <div className="text-red-500">{formik.errors.leave_type}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="reason"
              className="text-gray-700 font-semibold mb-2"
            >
              Reason
            </label>
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md"
              onClick={handleSubmitButton}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCloseForm}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md ml-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
