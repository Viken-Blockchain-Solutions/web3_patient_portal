// admin/components/PoolTable.tsx
import React from "react";
import { Pool } from "../../../../types";

type PoolTableProps = {
  pools: Pool[] | any[];
};

const PoolTable: React.FC<PoolTableProps> = ({ pools }) => {
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100 ltr:text-left rtl:text-right">
            {["Pool ID", "Heading", "Created At", "Start Date", "End Date", "Funding Amount", "Contributions", "Proof Template"].map((header) => (
              <th key={header} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {header}
              </th>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pools.map((pool) => (
              <tr key={pool.pool_id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {pool.pool_id}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {pool.pool_heading}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {pool.created_at}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {pool.start_date}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {pool.end_date}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {`${pool.funding_amount} ${pool.currency_unit}`}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {pool.contributions_amount}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {pool.proof_template}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolTable;
