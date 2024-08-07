"use client"; // Mark this component as client-side

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the authentication token (adjust according to your auth logic)
    localStorage.removeItem('token');
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
