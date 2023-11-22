import ContributorsComponent from "./components/ContributorsComponent";
import CredentialsComponent from "./components/CredentialsComponent";
import PoolsComponent from "./components/PoolsComponent";

const AdminPage = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-700 mb-8">Admin Page</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <PoolsComponent />
        <ContributorsComponent />
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <CredentialsComponent />
      </div>
    </div>
  );
};

export default AdminPage;
