// app/pages/PatientPage.tsx
'use client'
import React from 'react';

// Mockup of some research pools
const researchPools = [
  {
    id: 1,
    title: 'Blood Clot Research',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    funding: 10000,
    // Add more FHIR or other standard data here
  },
  {
    id: 2,
    title: 'Cholesterol Level Study',
    startDate: '2023-02-01',
    endDate: '2023-11-30',
    funding: 15000,
    // Add more FHIR or other standard data here
  },
  {
    id: 3,
    title: 'Diabetes Monitoring',
    startDate: '2023-03-01',
    endDate: '2023-09-30',
    funding: 8000,
    // Add more FHIR or other standard data here
  },
  // Add more research pools here
];

const PatientPage = () => {
  return (
    <div className='container mx-auto max-w-6xl p-8'>
      <h1 className='text-4xl mb-8 font-semibold text-blue-700'>Patient Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {researchPools.map((pool) => (
          <div key={pool.id} className='bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-medium text-blue-600 mb-4'>{pool.title}</h2>
            <p className='text-lg mb-2'>Start Date: {pool.startDate}</p>
            <p className='text-lg mb-2'>End Date: {pool.endDate}</p>
            <p className='text-lg mb-2'>Funding: ${pool.funding}</p>
            {/* Add more FHIR or other standard data here */}
            <button className='mt-4 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700'>
              Contribute
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
