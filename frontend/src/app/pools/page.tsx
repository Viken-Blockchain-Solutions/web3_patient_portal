// app/pages/PoolsPage.tsx
"use client";
import React from "react";
import PoolCard from "../../components/PoolCard";
// Mockup of some research pools
const researchPools = [
  {
    id: 1,
    title: "Blood Test Research",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    funding: 10000
  },
  {
    id: 2,
    title: "Cholesterol Level Study",
    startDate: "2023-02-01",
    endDate: "2023-11-30",
    funding: 15000
  },
  {
    id: 3,
    title: "Diabetes Monitoring",
    startDate: "2023-03-01",
    endDate: "2023-09-30",
    funding: 8000
  }
  // Add more research pools here
];

const Pools = () => {
  return (
    <div className="mx-auto p-8">
      <div className="bg-slate-100 rounded-lg p-10">
        <div className="text-center  m-auto">

          <h1 className="text-3xl mb-3">
            Research Pools
          </h1>
          <hr className="divider" />

          <p>
            Here you can find various research pools that you can contribute to.
            <br />By contributing your Verifiable Credentials, you can earn from the research funds allocated to each pool.
            <br />Browse through the available pools, check their details, and click ´Contribute´ to participate.
          </p>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {researchPools.map((pool) => (
          <div key={pool.id} className="p-4 rounded-lg border-slate-200 bg-slate-100">
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

export default Pools;
