"use client";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import jwt from "jsonwebtoken";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        if (decodedToken) {
          const userRole = decodedToken.role;
          setRole(userRole);
        } else {
          console.error("Failed to decode token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/auth/login", values);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const decodedToken = jwt.decode(token);
            if (decodedToken) {
              const userRole = decodedToken.role;
              setRole(userRole);
              if (userRole === "Admin") {
                router.push("/admin/adminDashboard");
              } else {
                router.push("/employee/EDashboard");
              }
            } else {
              console.error("Failed to decode token");
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        }
      } else {
        console.error("Failed to login");
        toast.error("Failed to login");
      }
    } catch (error) {
      console.error("Failed to login:", error.message);
      toast.error("Failed to login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="max-w-screen-xl w-1/3 mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-full p-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
              Login
            </h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col space-y-4 px-4">
             
                  <div>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="input-field"
                      placeholder="Email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="input-field"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="text-center">
              <p>
                Don't have an account?{" "}
                <Link href="/Auth/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
