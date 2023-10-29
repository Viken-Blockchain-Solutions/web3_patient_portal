// app/pages/LandingPage.tsx
'use client'
import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className='container mx-auto max-w-6xl p-8'>
      <h1 className='text-6xl mb-12 text-center font-semibold text-blue-700'>Welcome to Medical Research Hub</h1>

      <section className='bg-blue-100 p-12 rounded-lg mb-12 shadow-lg'>
        <h2 className='text-4xl mb-6 font-medium text-blue-600'>For Research Institutes</h2>
        <p className='text-xl mb-6'>
          Are you looking to gather valuable medical data for your next groundbreaking research? Our platform allows you to initiate research pools, specify your domain in laboratory diagnostics, and allocate research funds. 
        </p>
        <p className='text-xl mb-6'>
          Collaborate with patients willing to contribute their Verifiable Credentials for medical research and offer them a share from your research funds.
        </p>
        <Link href='/institute'className='inline-block mt-4 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
            Go to Institute Dashboard
        </Link>
      </section>

      <section className='bg-green-100 p-12 rounded-lg shadow-lg'>
        <h2 className='text-4xl mb-6 font-medium text-green-600'>For Patients</h2>
        <p className='text-xl mb-6'>
          Are you interested in contributing to medical research and earning from it? Explore our available research pools, contribute your Verifiable Credentials, and earn a share from the research funds.
        </p>
        <p className='text-xl mb-6'>
          Your data is encrypted and secure, and you have full control over who can access it. Contribute to the future of medicine while earning from it.
        </p>
        <Link href='/patient' className='inline-block mt-4 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700'>
            Go to Patient Dashboard
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
