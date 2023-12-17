import { SubHeading } from "../../../components/sub-heading";
import { MainNav } from "../../../components/main-nav";
import { Search } from "../../../components/search";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
          </div>
        </div>
      </div>
      <div className="hidden flex-col md:flex">
        <SubHeading />
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;