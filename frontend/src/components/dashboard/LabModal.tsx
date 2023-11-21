"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { issueTestResult } from "../../utils/laboratoryUtils";
import { userStore } from "../../../stores/appStore";
import { ModalComponentProps } from "@/types/credentials";
import Modal from "../Modal";
import QrReader from "./QrReader";
import { toast } from "react-toastify";
import ModalSubmit from "./ModalSubmit";

export default function ModalComponent({
  buttonText,
  credentialIssued,
  setCredentialId,
  setCredentialIssued,
  setQrUrl
}: ModalComponentProps) {
  const userDid = userStore((state: any) => state.Did);
  const setDid = userStore((state: any) => state.setDid);

  const cancelButtonRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (receiverDID: string) => {
    if (receiverDID.trim() === "") {
      toast.error("DID cannot be empty")
      return;
    }

    setIsLoading(true);
    const response = await issueTestResult(receiverDID, setIsLoading, setQrUrl);

    setIsLoading(false);

    if (response.credentialId) {
      setCredentialId(response.credentialId);
      setCredentialIssued(true);
      setOpen(false);
    } else {
      toast.error("Failed to issue credential")
    }
  };

  return (
    <div className="mt-10 mx-auto container">
      <button
        type="button"
        className="bg-green-600 border-1 py-4 px-4 text-white rounded-lg"
        onClick={() => setOpen(true)}
        disabled={isLoading}
      >
        {buttonText}
      </button>

      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <IdentificationIcon className="h-6 w-6 text-green-600" aria-hidden="true" />

        <div className="mt-3">
          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            Receive Laboratory Results
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500 py-2">
              Enter or scan your <strong>DID</strong> to receive your <strong>Lab-Results</strong> as a <strong>Verifiable Credential</strong>.
            </p>
          </div>
          <label htmlFor="did" className="block text-lg font-semibold text-gray-700 mt-2 ">
            <input
              type="text"
              placeholder="Enter your DID"
              name="did"
              value={userDid}
              onChange={(e) => setDid(e.target.value)}
              className="border border-indigo-300 rounded-lg p-2 font-normal w-full"
            />
          </label>

          <h3 className="mt-3">
            Or scan it from your <span className="text-main"> Dock Wallet App </span>
          </h3>
          <p className="my-3 text-xs">
            <span className="text-gray-500">(Open the <strong>Dock Wallet App</strong> in your mobile, there you can find your DID on clicking on the link in the bottom menu.)</span>
          </p>
          <div className="mb-4">
          <QrReader />
          </div>
        </div>

        <ModalSubmit
          handleSubmit={() => handleSubmit(userDid)}
          isLoading={isLoading}
          credentialIssued={credentialIssued}
        />
      </Modal>



    </div>
  );
}
