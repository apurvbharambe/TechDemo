// app/components/Navbar.js
"use client"; // Ensure this is a client component

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from './LogoutButton'; // Adjust path if necessary
import '/app/styles/navbar.css';

const Navbar = () => {
  const pathname = usePathname();

  // Check if the current path is the login or register page
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) return null; // Hide the navbar on the login and register pages

  return (
    <>
      <h1 className="centered-heading">Stock Monitoring System</h1>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><Link href="/all-data">All Data</Link></li>
          <li className="nav-item"><Link href="/gainers">Gainers</Link></li>
          <li className="nav-item"><Link href="/losers">Losers</Link></li>
          <li className="nav-item"><LogoutButton /></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;









// // app/components/Navbar.js
// "use client"; // Ensure this is a client component

// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import LogoutButton from './LogoutButton'; // Adjust path if necessary
// import '/app/styles/navbar.css';

// const Navbar = () => {
//   const pathname = usePathname();

//   // Check if the current path is the login page
//   const isLoginPage = pathname === '/login';

//   if (isLoginPage) return null; // Hide the navbar on the login page

//   return (
//     <>
//       <h1 className="centered-heading">Stock Monitoring System</h1>
//       <nav className="navbar">
//         <ul className="nav-list">
//           <li className="nav-item"><Link href="/all-data">All Data</Link></li>
//           <li className="nav-item"><Link href="/gainers">Gainers</Link></li>
//           <li className="nav-item"><Link href="/losers">Losers</Link></li>
//           <li className="nav-item"><LogoutButton /></li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
