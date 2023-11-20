// admin/components/PoolTable.tsx
import React from "react";
import { Pool } from "../../../../types";

type PoolTableProps = {
  pools: Pool[] | any[];
};

const PoolTable: React.FC<PoolTableProps> = ({ pools }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-100">
            {["Pool ID", "Heading", "Created At", "Start Date", "End Date", "Funding Amount", "Contributions", "Proof Template"].map((header) => (
              <th key={header} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pools.map((pool) => (
            <tr key={pool.pool_id} className="hover:bg-gray-50">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                {pool.pool_id}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                {pool.pool_heading}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                {pool.created_at}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                {pool.start_date}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                {pool.end_date}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                {`${pool.funding_amount} ${pool.currency_unit}`}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                {pool.contributions_amount}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                {pool.proof_template}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PoolTable;
