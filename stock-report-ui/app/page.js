// app/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /login if the user is on the root path
    router.replace('/login');
  }, [router]);

  return null; // Render nothing while redirecting
}





