import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableRow,
  TableHeader
} from "../../../../../components/ui/table";
import { getPoolsAction } from "../../../../actions/pools-action";
import { Pool } from "../../../../../types";
import { convertToCET } from "../../../../utils/tools";

export const DashboardPoolsTable = async () => {
  const pools: any | [] = await getPoolsAction();
  return (
    <div>
      <Table>
        <TableCaption>The list of the pools.</TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px]">PoolId</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Pool heading</TableHead>
            <TableHead className="text-right">Start</TableHead>
            <TableHead className="text-right">End</TableHead>
            <TableHead className="text-right">Funding amount</TableHead>
            <TableHead className="text-right">Proof-template</TableHead>
            <TableHead className="text-center">Test name</TableHead>
            <TableHead className="text-center">Issuer name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools?.map((pool: Pool) => (
            <TableRow key={pool.pool_id}>
              <TableCell className="font-sm">{pool.pool_id}</TableCell>
              <TableCell>{convertToCET(pool.created_at)}</TableCell>
              <TableCell>{pool.pool_heading}</TableCell>
              <TableCell className="text-right">{pool.start_date}</TableCell>
              <TableCell className="text-right">{pool.end_date}</TableCell>
              <TableCell className="text-right">
                {pool.currency_unit} {(pool.funding_amount * 1000).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </TableCell>
              <TableCell className="text-right">
                {pool.proof_template}
              </TableCell>
              <TableCell className="text-right">{pool.test_name}</TableCell>
              <TableCell className="text-right">{pool.issuer_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
