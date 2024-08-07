// app/layout.js
import { Inter } from "next/font/google";
import Navbar from './components/Navbar'; // Import the Navbar component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Use the Navbar component */}
        <main>{children}</main>
      </body>
    </html>
  );
}




