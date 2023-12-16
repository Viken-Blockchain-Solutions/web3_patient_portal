import { DashboardPoolsTable } from "./_components/table";


const AdminPoolsPage = () => {
  return (
    <section>
      <div>
        <h2 className="text-3xl py-6">PoolsPage</h2>
        <DashboardPoolsTable />
      </div>
    </section>
  );
};

export default AdminPoolsPage;