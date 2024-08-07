"use client"; // This ensures that the component is rendered on the client side

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/auth'; // Ensure this path is correct

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [router]);

    if (!isAuthenticated()) {
      return null; // Render nothing until redirect
    }

    return <WrappedComponent {...props} />;
  };

  AuthHOC.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`; // Set the display name

  return AuthHOC;
};

export default withAuth;












