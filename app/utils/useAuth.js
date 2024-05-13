// useAuth.js

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        try {
          const decodedToken = jwt.decode(token);
          if (decodedToken) {
            // Optionally, you can validate token expiration, roles, etc. here
          } else {
            console.error('Failed to decode token');
            router.push('/login');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          router.push('/login');
        }
      }
    }
  }, [router]);

  return null; // Custom hook doesn't need to return anything
};

export default useAuth;
