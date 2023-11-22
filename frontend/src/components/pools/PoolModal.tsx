"use client";
import { useState } from "react";
import { ProofTemplateVerification } from "./ProofTemplateVerification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import HolderCredentialsModal from "../HolderCredentialsModal";
import Reward from "../../public/assets/images/reward.png";
import Modal from "../Modal";

export default function PoolModal({ poolId, proofTemplate }: any) {
  const [contributionProcessed, setContributionProcessed] = useState(false);
  const [alreadyContributed, setAlreadyContributed] = useState(false);
  const [holderCredentials, setHolderCredentials] = useState<any>([]);
  const [isProofVerified, setIsProofVerified] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);


  return (
    <div className="mx-auto container">
      <button
        type="button"
        className="btn-primary w-full"
        onClick={() => setOpen(true)}
      >
        Contribute
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)} >
        {
          !contributionProcessed ?
            !alreadyContributed ?
              <div className="bg-white">
                <h3 className="text-main text-xl under font-semibold text-gray-900 ">
                  <FontAwesomeIcon icon={faQrcode} /> Scan Qr
                </h3>
                <p className="bg-slate-100 rounded-lg p-2 mt-2">
                  Use the QR code scanner with mobile Dock Wallet App and contribute with your VC
                </p>
                <div className="ta-c">
                  <ProofTemplateVerification
                    poolId={poolId}
                    proofTemplate={proofTemplate}
                    setHolderCredentials={setHolderCredentials}
                    setIsProofVerified={setIsProofVerified}
                    setContributionProcessed={setContributionProcessed}
                    setAlreadyContributed={setAlreadyContributed}
                  />
                  {isProofVerified !== null && <div>Proof Verification Status: {isProofVerified ? "Verified" : "Not Verified"}</div>}
                  {(holderCredentials && holderCredentials.length > 0) && <HolderCredentialsModal holderCredentials={holderCredentials} />}
                </div>
              </div>
              :
              <div className="bg-white px-4 pb-4 pt-5 ta-c bg-green-100">
                <Image className="mt-4 balancing sha" src={Reward} height={200} width={200} sizes="100%" alt={"Reward"} />
                <p className="text-main text-xl">
                  You already contribute to this pool!
                </p>
              </div>
            :
            <div className="bg-white px-4 pb-4 pt-5 ta-c bg-green-100">
              <Image className="mt-4 balancing sha" src={Reward} height={200} width={200} sizes="100%" alt={"Reward"} />
              <p className="text-main text-xl">
                Thanks for your contributions!
                <br />
                We have credit your account with $25
              </p>
            </div>
        }
      </Modal>
    </div>
  );
}