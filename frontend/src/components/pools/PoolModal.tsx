"use client";
import { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ProofTemplateVerification } from "./ProofTemplateVerification";
import { Contribution } from "../../../types";
import { handleContribution } from "../../utils/db/handleContribution";
import Image from "next/image";
import HolderCredentialsModal from "../HolderCredentialsModal";
import Reward from "../../public/assets/images/reward.png";

export default function PoolModal() {
  const [open, setOpen] = useState(false);
  const [contributionProcessed, setContributionProcessed] = useState(false);
  const [alreadyContributed, setAlreadyContributed] = useState(false);
  const [holderCredentials, setHolderCredentials] = useState<any>([]);
  const [isProofVerified, setIsProofVerified] = useState<boolean | null>(null);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (isProofVerified) {
      onUserContribution();
    }
    // eslint-disable-next-line
  }, [isProofVerified]);

  const onUserContribution = async () => {

    if (isProofVerified && holderCredentials && holderCredentials.length > 0) {
      let processed = false;
      for (const credential of holderCredentials) {

        const contributionData: Contribution = {
          credential_id: credential.id as string,
          contributor_id: credential.credentialSubject.id as string,
          test_name: credential.credentialSubject.testName,
          issuer_id: credential.issuer.id,
          issuer_name: credential.issuer.name,
          issuer_logo: credential.issuer.logo,
          cholesterol_value: credential.credentialSubject.results.totalCholesterol.value,
          cholesterol_unit: credential.credentialSubject.results.totalCholesterol.unit,
          cholesterol_reference_range: credential.credentialSubject.results.totalCholesterol.referenceRange,
          pool_id: "e93cc9c8-22c6-412b-bba8-6e4f57de72f8"
        };

        try {
          const newContribution = await handleContribution(contributionData);
          if (newContribution) {
            processed = true;
            setContributionProcessed(processed);
          }
        } catch (error) {
          if (error instanceof Error && error.message === "This contribution has already been made.") {
            console.error("Contribution Error:", error.message);
            setAlreadyContributed(true);
            break;
          } else {
            console.error("An error was encountered:", error);
          }
        }
      }
      if (!processed) {
        console.log("an error with the a contribution was encountered.");
      } else {
        console.log("Contribution was processed successfully.");
      }
    }
  };

  function handleOpen() {
    setOpen(true);
  }


  return (
    <div className="mx-auto container">
      <button
        type="button"
        className="btn-primary w-full"
        onClick={() => handleOpen()}
      >
        Contribute
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                  {
                    !contributionProcessed ?
                      !alreadyContributed ?
                        <div className="bg-white p-4">
                          <Dialog.Title as="h3" className="text-main text-xl under font-semibold text-gray-900 ">
                            Scan Qr
                          </Dialog.Title>
                          <p className="bg-slate-100 rounded-lg p-2 mt-2">
                            Use the QR code scanner with mobile Dock Wallet App and contribute with your VC
                          </p>
                          <div className="ta-c">
                            <ProofTemplateVerification
                              setHolderCredentials={setHolderCredentials}
                              setIsProofVerified={setIsProofVerified}
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
                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="btn-primary-transparent"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}