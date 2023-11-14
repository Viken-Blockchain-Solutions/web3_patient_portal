// app/pages/LandingPage.tsx
"use client";
import React from "react";
import Header from "../components/homepage/Header";
import About from "../components/homepage/About";
import Steps from "../components/homepage/Steps";
import ResearchPools from "../components/homepage/ResearchPools";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div className='mx-auto'>

            <Header />

            <About />

            <Steps />

            <ResearchPools />

            <div className="w-1/4 mx-auto pb-10">
                <Link className="w-full" href="/dashboard">
                    <button className="btn-primary text-2xl w-full font-semibold">
                        Get Started!
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default LandingPage;
