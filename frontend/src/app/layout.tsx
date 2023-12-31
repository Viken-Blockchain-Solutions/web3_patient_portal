"use client";
import "./globals.css";
import "./animation.css";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='body'>
        <Providers>
          <ToastContainer />
          <Navbar />
          <div className='main'>
            {children}
          </div>
          <Footer />
          <Analytics />
        </Providers>

      </body>
    </html>
  );
}
