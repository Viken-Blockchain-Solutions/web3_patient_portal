// app/pages/PatientPage.tsx
"use client";
import React from "react";
import PoolCard from "../../components/PoolCard";

// Mockup of some research pools
const researchPools = [
  {
    id: 1,
    title: "Lipid Panel - Research",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    funding: 10000
  }
  // Add more research pools here
];

const MedicalHubPage = () => {
  return (
    <div className="container mx-auto max-w-6xl p-8">
      <h1 className="text-4xl mb-8 font-semibold text-blue-700">
        Patient Dashboard
      </h1>

      <div className="mb-8 p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-medium text-blue-600 mb-4">
          How It Works
        </h2>
        <div className="text-lg">
          <h3>Welcome to the Patient Dashboard.</h3>
          <ol>
            <li>
              Here you can find various research pools that you can contribute
              to.
            </li>
            <li>
              By contributing your Verifiable Credentials, you can earn from the
              research funds allocated to each pool.
            </li>
            <li>
              Browse through the available pools, check their details, and click
              ´Contribute´ to participate.
            </li>
          </ol>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {researchPools.map((pool) => (
          <div key={pool.id} className="p-8 rounded-lg shadow-lg">
            <PoolCard
              key={pool.id}
              title={pool.title}
              startDate={pool.startDate}
              endDate={pool.endDate}
              funding={pool.funding}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHubPage;
