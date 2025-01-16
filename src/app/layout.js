'use client'; // Marking this file as a client component

import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../styles/style.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head"; // For handling dynamic meta tags
import axios from 'axios';
import { useState, useEffect } from 'react'; // Importing hooks for client-side functionality
import { Suspense } from "react";
import { useParams } from 'next/navigation';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
axios.interceptors.request.use(request => {
  console.log('Axios Request URL:', request.url);
  return request;
});
export default function RootLayout({ children }) {
  // State to store navigation links
  const [navLinks, setNavLinks] = useState([]);
  const params = useParams();

  useEffect(() => {
    // Fetch nav links (e.g., from an API or static data)
    axios.get('https://stagging.aiwordsolver.com/admin/tool/getAllTools') // Replace with actual endpoint
      .then((response) => {
        setNavLinks(response.data);
       
      })
      .catch((error) => {
        console.error('Error fetching nav links:', error);
      });
  }, []);

  return (
    <html lang="en">
      <Head>
        {/* Removed default metadata as it's now handled on each page */}
      </Head>
      <body className="bubbles-background bg-white text-oxford-blue dark:bg-oxford-blue dark:text-white">
        {/* Pass navLinks to both Navbar and Footer */}
        <Navbar navLinks={navLinks} />
        <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
        <Footer navLinks={navLinks} />
      </body>
    </html>
  );
}
