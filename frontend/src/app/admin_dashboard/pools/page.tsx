
import { getPoolsAction, getPoolsTotalFundingAction } from "../../../actions/pools-action";
import StatsCard from "../../../../components/stats-card";
import { DashboardPoolsTable } from "./_components/table";
import peopleIcon from "../../../public/assets/icons/people.png";
import dollarIcon from "../../../public/assets/icons/dollar.png";


const AdminPoolsPage = async () => {
  const pools = await getPoolsAction();
  const totFunding = await getPoolsTotalFundingAction();

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Active Pools"
          count={pools?.length || 0 }
          subtitle="Total active pools on the platform"
          icon={peopleIcon}
        />
        <StatsCard
          title="Total Allocated Funding"
          count={totFunding.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          subtitle="Total allocated funding on the platform"
          icon={dollarIcon}
        />
        <StatsCard
          title="Most Popular Pool"
          count={"N/A" || 0 }
          subtitle="Total allocated funding on the platform"
          icon={dollarIcon}
        />
      </div>
      <div className="container mx-auto py-10">
        <DashboardPoolsTable />
      </div>
    </div>
  );
};

export default AdminPoolsPage;