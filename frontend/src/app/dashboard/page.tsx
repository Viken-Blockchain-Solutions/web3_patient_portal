import HomeCards from "../../components/homepage/HomeCards";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="bg-slate-100 rounded-lg p-10">
        <div className="text-center  m-auto">

          <h1 className="text-3xl mb-3">
            Welcome back!
          </h1>
          <hr className="divider" />

          <p>
            Use your DID from your Dock Wallet mobile app to access Research Pools with your Lab test verifyable credentials (VC).
            <br />
            You can request Lab test results from our Laboratory
          </p>
        </div>
      </div>
      <HomeCards />
    </>
  );
};

export default Dashboard;
