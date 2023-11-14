// frontend/src/components/ModalComponent.tsx
"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { issueTestResult } from "../utils/laboratoryUtils";

type ModalComponentProps = {
  buttonText: string;
  receiverDID: string;
  error: string;
  qrUrl: string;
  credentialIssued: boolean;
  setCredentialId: (id: string) => void;
  setCredentialIssued: (issued: boolean) => void;
  setReceiverDID: (did: string) => void;
  setError: (error: string) => void;
  setQrUrl: (url: string) => void;
};

export default function ModalComponent({
  buttonText,
  receiverDID,
  qrUrl,
  credentialIssued,
  setCredentialId,
  setCredentialIssued,
  setReceiverDID,
  setError,
  setQrUrl
}: ModalComponentProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleSubmit = async (receiverDID: string) => {
    if (receiverDID.trim() === "") {
      setError("DID cannot be empty");
      return;
    }
    setIsLoading(true);
    setError("");
    const response = await issueTestResult(receiverDID, setIsLoading, setError, setQrUrl);
    console.log("Response:", response);
    console.log("QRUrl:", qrUrl);
    setIsLoading(false);

    if (response.credentialId) {
      setCredentialId(response.credentialId);
      setCredentialIssued(true);
      setOpen(false);
    } else {
      setError("Failed to issue credential");
    }
  };

  return (
    <div>
      <button
        type="button"
        className="bg-blue-100 hover:bg-blue-200 text-black py-2 px-4 rounded"
        onClick={() => setOpen(true)}
        disabled={isLoading}
      >
        {buttonText}
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Receive Laboratory Results
                        </Dialog.Title>
                        <div className="mt-2">
                          <h3>
                          Your role in this ecosystem is straightforward:
                          </h3>
                          <ol className="text-sm text-gray-500 py-2">
                            <li>
                            Step 1. Enter or select your DID to receive your lab results as a Verifiable Credential.
                            </li>
                          </ol>
                        </div>
                        <label htmlFor="did" className="block text-lg font-semibold text-gray-700 mt-2 ">
                          <input
                            type="text"
                            placeholder="Enter your DID"
                            name="did"
                            value={receiverDID}
                            onChange={(e) => setReceiverDID(e.target.value)}
                            className="border border-indigo-300 rounded-lg p-2 font-normal w-full"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-black shadow-sm sm:ml-3 sm:w-auto"
                      onClick={() => {
                        handleSubmit(receiverDID);
                      }}
                      disabled={credentialIssued} // Disable the button if credential has been issued
                    >
                    Get Verified Credential
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
