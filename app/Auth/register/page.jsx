"use client";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const Register = () => {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

          if (response.ok) {
        toast.success("Registration successful");
        router.push("/Auth/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      toast.error("Failed to register");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="max-w-screen-xl w-1/3 mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-full p-8">
            {/* Title */}
            <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
              User Registration
            </h2>
            {/* Form */}
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                role: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col space-y-4 px-4">
                  {/* Username input */}
                  <div>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Username"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  {/* Email input */}
                  <div className="mb-4">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  {/* Role input */}
                  <div className="mb-4">
                    <label className="block text-md font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Field
                          id="role-employee"
                          name="role"
                          type="radio"
                          value="employee"
                          className="toggle-switch"
                        />
                        <label
                          htmlFor="role-employee"
                          className="toggle-switch-label"
                        >
                          Employee
                        </label>
                      </div>
                      <div>
                        <Field
                          id="role-admin"
                          name="role"
                          type="radio"
                          value="admin"
                          className="toggle-switch"
                        />
                        <label
                          htmlFor="role-admin"
                          className="toggle-switch-label"
                        >
                          Admin
                        </label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-2 px-4 text-md font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-4 text-center">
              <p>
                Already registered? <Link href="/Auth/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
