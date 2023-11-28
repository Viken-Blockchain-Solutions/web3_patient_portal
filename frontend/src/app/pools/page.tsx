// frontend/src/app/pools/page.tsx
"use client";
import React from "react";
import PoolCard from "../../components/PoolCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFetchPools } from "../../hooks/useFetchPools";

/**
 * Renders the PoolsPage component.
 *
 * @return {JSX.Element} The rendered PoolsPage component.
 */
const PoolsPage = () => {

  const { isLoading, researchPools } = useFetchPools();
  if (isLoading) return <p>Loading pools...</p>;
  if (researchPools.length === 0) return <p>No research pools available.</p>;

  console.log(researchPools);
  return (
    <>
      <div className="mx-auto relative mb-10">
        <div className="absolute left-5 top-5 rounded-lg bg-slate-300 p-2 hover:bg-slate-2 hover:text-gray-700 font-bold text-gray-500 text-sm">
          <Link href="/dashboard"><FontAwesomeIcon icon={faArrowLeft} /> Go back</Link>
        </div>
        <div className="bg-slate-100 rounded-lg p-10">
          <div className="text-center m-auto">
            <h1 className="text-3xl mb-3">
              Research Pools
            </h1>
            <hr className="divider" />
            <div className="mt-5">
              <h3 className="mb-3">Here you can find various Research Pools that you can contribute to.</h3>
              <p className="mb-1">Browse through the available pools, check their details, and click <span className="font-bold">´Contribute´</span> to participate.</p>
              <p>By contributing your Verifiable Credentials, you can earn from the research funds allocated to each pool.</p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchPools.map((pool) => (
            <PoolCard
              key={pool.pool_id}
              title={pool.pool_heading}
              startDate={pool.start_date}
              endDate={pool.end_date}
              funding={pool.funding_amount}
              currency_unit={pool.currency_unit}
              proofTemplateID={pool.proof_template}
              testName={pool.test_name}
              issuerName={pool.issuer_name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PoolsPage;
