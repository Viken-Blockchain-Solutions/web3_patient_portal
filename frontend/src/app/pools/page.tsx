// app/pages/PoolsPage.tsx
"use client";
import React from "react";
import PoolCard from "../../components/PoolCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const researchPools = [
  {
    id: 1,
    title: "Blood Test Research",
    content: "Investigate genetic markers present in the blood to gain insights into hereditary conditions and susceptibilities.",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    funding: 25
  },
  {
    id: 2,
    title: "Cholesterol Level Study",
    content: "Discover cholesterol indicators that enable early detection of health issues, facilitating proactive and preventive healthcare measures.",
    startDate: "2023-02-01",
    endDate: "2023-11-30",
    funding: 20
  },
  {
    id: 3,
    title: "Diabetes Monitoring",
    content: "Discover diabetes indicators that enable early detection of health issues, facilitating proactive and preventive healthcare measures.",
    startDate: "2023-03-01",
    endDate: "2023-09-30",
    funding: 15
  }
  // Add more research pools here
];

const Pools = () => {
  return (
    <>

      <div className="mx-auto relative">
        <div className="absolute left-5 top-5 rounded-lg bg-slate-300 p-2 hover:bg-slate-2 hover:text-gray-700 font-bold text-gray-500 text-sm">
          <Link href="/dashboard"><FontAwesomeIcon icon={faArrowLeft} /> Go back</Link>
        </div>

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
            <div key={pool.id}>
              <PoolCard
                key={pool.id}
                title={pool.title}
                content={pool.content}
                startDate={pool.startDate}
                endDate={pool.endDate}
                funding={pool.funding}
              />
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Pools;
