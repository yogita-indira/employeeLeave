'use client'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useFormik } from 'formik';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

const Login = () => {
  const router = useRouter();
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        if (decodedToken) {
          const userRole = decodedToken.role;
          setRole(userRole);
        } else {
          console.error('Failed to decode token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []); 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/login', values);
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          const token = localStorage.getItem('token');

          if (token) {
            try {
              const decodedToken = jwt.decode(token);
              if (decodedToken) {
                const userRole = decodedToken.role;
                setRole(userRole);
                if (userRole === 'Admin') {
                  router.push('/adminDashboard');
                } else {
                  router.push('/userDashboard');
                }
              } else {
                console.error('Failed to decode token');
              }
            } catch (error) {
              console.error('Error decoding token:', error);
            }
          }
        } else {
          console.error('Failed to login:');
          toast.error('Failed to login');
        }
      } catch (error) {
        console.error('Failed to login:', error.message);
        toast.error('Failed to login');
      }
    }
  });
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="max-w-screen-xl w-1/3 mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>
            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                      focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                        formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                      }`
                    }
                    placeholder="Email address"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                      focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                        formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                      }`
                    }
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center">
              <p>
                Don't have an account?{' '}
                <Link href="/register">
                  Register
                </Link>
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
