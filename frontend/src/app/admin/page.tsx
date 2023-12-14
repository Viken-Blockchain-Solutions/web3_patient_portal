"use client";
import { useEffect } from "react";
import ContributorsComponent from "./components/ContributorsComponent";
import CredentialsComponent from "./components/CredentialsComponent";
import PoolsComponent from "./components/PoolsComponent";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow rounded-lg p-6 mb-6">
    {children}
  </div>
);

const AdminPage = () => {

  useEffect(() => {
    document.body.classList.add("admin-container");
    return () => {
      document.body.classList.remove("admin-container");
    };
  }, []);

  return (
    <div className="admin-container">
      <h1 className="text-3xl font-semibold text-gray-700 mb-8">Admin Page</h1>
      <Card>
        <PoolsComponent />
        <ContributorsComponent />
      </Card>
      <Card>
        <CredentialsComponent />
      </Card>
    </div>
  );
};

export default AdminPage;
