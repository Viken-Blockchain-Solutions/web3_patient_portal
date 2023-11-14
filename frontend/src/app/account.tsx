// import { Balance } from "../components/Balance";
// import { BlockNumber } from "../components/BlockNumber";
// import { ReadContract } from "../components/ReadContract";
// import { ReadContracts } from "../components/ReadContracts";
// import { ReadContractsInfinite } from "../components/ReadContractsInfinite";
// import { SendTransaction } from "../components/SendTransaction";
// import { SendTransactionPrepared } from "../components/SendTransactionPrepared";
// import { SignMessage } from "../components/SignMessage";
// import { SignTypedData } from "../components/SignTypedData";
// import { Token } from "../components/Token";
// import { WatchContractEvents } from "../components/WatchContractEvents";
// import { WatchPendingTransactions } from "../components/WatchPendingTransactions";
// import { WriteContract } from "../components/WriteContract";
// import { WriteContractPrepared } from "../components/WriteContractPrepared";import { Balance } from "../components/Balance";
// import { BlockNumber } from "../components/BlockNumber";
// import { ReadContract } from "../components/ReadContract";
// import { ReadContracts } from "../components/ReadContracts";
// import { ReadContractsInfinite } from "../components/ReadContractsInfinite";
// import { SendTransaction } from "../components/SendTransaction";
// import { SendTransactionPrepared } from "../components/SendTransactionPrepared";
// import { SignMessage } from "../components/SignMessage";
// import { SignTypedData } from "../components/SignTypedData";
// import { Token } from "../components/Token";
// import { WatchContractEvents } from "../components/WatchContractEvents";
// import { WatchPendingTransactions } from "../components/WatchPendingTransactions";
// import { WriteContract } from "../components/WriteContract";
// import { WriteContractPrepared } from "../components/WriteContractPrepared";

import { Account } from "../components/web3/Account";
import { ConnectKitButton } from "../components/web3/ConnectKitButton";
import { Connected } from "../components/homepage/Connected";
import { NetworkSwitcher } from "../components/web3/NetworkSwitcher";

const Page: React.FC = () => {
  return (
    <>
      <h1 className='text-xl p-4'>wagmi + ConnectKit + Next.js</h1>

      <ConnectKitButton />

      <Connected>
        <hr />
        <h2>Network</h2>
        <NetworkSwitcher />
        <br />
        <hr />
        <h2>Account</h2>
        <Account />
        <br />
        <hr />
      </Connected>
    </>
  );
};

export default Page;
