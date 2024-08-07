import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
          router.push('/login');
        } else {
          try {
            await axios.get('http://192.168.49.2:30001/api/auth/verify-token/', {
              headers: { Authorization: `Bearer ${token}` },
            });
          } catch (error) {
            console.error("Invalid token:", error);
            router.push('/login');
          }
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  AuthHOC.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`; // Set the display name

  return AuthHOC;
};

export default withAuth;












