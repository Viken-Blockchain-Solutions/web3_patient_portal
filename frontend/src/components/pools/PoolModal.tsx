"use client";
import { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import HolderCredentialsModal from "../HolderCredentialsModal";
import { ProofTemplateVerification } from "../ProofTemplateVerification";
import { Contribution } from "../../../types";
import { handleContribution } from "../../utils/db/handleContribution";
import { incrementContributions } from "../../utils/db/pools/addDataByPool";

export default function PoolModal() {
  const [open, setOpen] = useState(false);
  const [holderCredentials, setHolderCredentials] = useState<any>([]);
  const [isProofVerified, setIsProofVerified] = useState<boolean | null>(null);
  const cancelButtonRef = useRef(null);


  useEffect(() => {
    if (isProofVerified) {
      onUserContribution();
    }
  }, [isProofVerified]);

  const onUserContribution = async () => {

    if (isProofVerified && holderCredentials && holderCredentials.length > 0) {
      let contributionProcessed = false;
      for (const credential of holderCredentials) {
        console.log(`Handling Credential with ID: ${credential.id}`);
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

        console.log("Contribution Data:", contributionData);

        try {
          const newContribution = await handleContribution(contributionData);
          if (newContribution) {
            await incrementContributions(newContribution.pool_id);
            contributionProcessed = true;
          }
        } catch (error) {
          if (error instanceof Error && error.message === "This contribution has already been made.") {
            console.error("Contribution Error:", error.message);
            break;
          } else {
            console.error("An error was encountered:", error);
          }
        }
      }

      if (!contributionProcessed) {
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
    <div className="mt-10 mx-auto container">
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
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Scan Qr code with Dock Wallet App and contribute with your VC
                        </Dialog.Title>
                        <ProofTemplateVerification
                          setHolderCredentials={setHolderCredentials}
                          setIsProofVerified={setIsProofVerified}
                        />
                        {isProofVerified !== null && <div>Proof Verification Status: {isProofVerified ? "Verified" : "Not Verified"}</div>}
                        {holderCredentials && <HolderCredentialsModal holderCredentials={holderCredentials} />}
                      </div>
                      <div className="mt-5">
                        {isProofVerified !== null && <div>Proof Verification Status: {isProofVerified ? "Verified" : "Not Verified"}</div>}
                        {isProofVerified && <HolderCredentialsModal holderCredentials={holderCredentials} />}
                      </div>
                    </div>
                  </div>
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