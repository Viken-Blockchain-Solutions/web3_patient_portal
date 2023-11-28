// app/pages/LandingPage.tsx
"use client";
import React from "react";
import Header from "../components/homepage/Header";
import About from "../components/homepage/About";
import Steps from "../components/homepage/Steps";
import ResearchPools from "../components/homepage/ResearchPools";
import Colaborate from "../components/homepage/Colaborate";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className='mx-auto'>

      <Header />

      <About />

      <Steps />

      <ResearchPools />

      <div className="mx-auto pb-10 w-96">
        <Link className="w-full" href="/dashboard">
          <button className="btn-primary text-2xl w-full font-semibold">
            Get Started!
          </button>
        </Link>
      </div>

      <Colaborate />

    </div>
  );
};

export default LandingPage;
