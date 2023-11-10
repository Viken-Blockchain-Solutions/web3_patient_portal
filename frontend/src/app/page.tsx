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

import { Account } from "../components/Account";
import { ConnectKitButton } from "../components/ConnectKitButton";
import { Connected } from "../components/Connected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";

import Menu from "../components/Menu";

const Page: React.FC = () => {
  return (
    <>
      <h1 className='text-xl p-4'>wagmi + ConnectKit + Next.js</h1>

      <ConnectKitButton />
      <Menu />
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
