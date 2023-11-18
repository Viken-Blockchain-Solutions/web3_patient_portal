"use client";
import "./globals.css";
import "./animation.css";
import { Providers } from "./providers";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='body'>
        <Providers>
          <Navbar />
          <div className='main'>
            {children}
          </div>
          <Footer />
        </Providers>

      </body>
    </html>
  );
}
