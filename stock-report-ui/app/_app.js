


import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Redirect to /login if there's no token
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  if (!isMounted) return null; // Ensure client-side rendering

  return <Component {...pageProps} />;
}

export default MyApp;
