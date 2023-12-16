import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableRow,
  TableHeader
} from "../../../../../components/ui/table";
import { getPoolsAction } from "../../../../../src/actions/get-pools-action";
import { Pool } from "../../../../../types";
import { convertToCET } from "../../../../../src/utils/tools";

export const DashboardPoolsTable = async () => {
  const pools: any | [] = await getPoolsAction();
  return (
    <div>
      <Table>
        <TableCaption>A list of the contributors.</TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px]">PoolId</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Pool heading</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead className="text-right">Funding amount</TableHead>
            <TableHead>Contributions amount</TableHead>
            <TableHead>Proof template</TableHead>
            <TableHead>Test name</TableHead>
            <TableHead>Issuer name</TableHead>
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
                {pool.currency_unit} {pool.funding_amount}
              </TableCell>
              <TableCell className="text-right">
                {pool.contributions_amount}
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
