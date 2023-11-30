// frontend/src/components/dashboard/LabModal.tsx
"use client";
import { useState } from "react";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { issueTestResult } from "../../utils/laboratoryUtils";
import { userStore } from "../../../stores/appStore";
import { ModalComponentProps } from "../../../types/credentials";
import Modal from "../Modal";
import QrReader from "./QrReader";
import { toast } from "react-toastify";
import ModalSubmit from "./ModalSubmit";

/**
 * Renders a modal component for receiving laboratory results.
 *
 * @param {ModalComponentProps} {
 *   buttonText,
 *   credentialIssued,
 *   setCredentials,
 *   setCredentialIssued,
 *   setQrUrl
 * } - The props for the modal component.
 * @return {JSX.Element} The rendered modal component.
 */
const ModalComponent = ({
  buttonText,
  credentialIssued,
  setCredentials,
  setCredentialIssued,
  setQrUrl
}: ModalComponentProps) => {
  const userDid = userStore((state: any) => state.Did);
  const setDid = userStore((state: any) => state.setDid);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (receiverDID: string) => {
    if (receiverDID.trim() === "") {
      toast.error("DID cannot be empty");
      return;
    }

    setIsLoading(true);
    const response: any = await issueTestResult(receiverDID, setIsLoading, setQrUrl);
    console.log("issueTestResult response: ", response);
    setIsLoading(false);

    if (response.issuedCredentials) {
      setCredentials(response.issuedCredentials);
      setCredentialIssued(true);
      setOpen(false);
    } else {
      toast.error("Failed to issue credential");
    }
  };

  function Info() {
    return (
      <div className="font-bold">
        Remember to turn on <b>Test mode</b> in the settings in Dock Wallet App
      </div>
    );
  }

  function showAlert() {
    toast.info(<Info />, {
      closeOnClick: true,
      autoClose: false,
      position: "bottom-center"
    });
  }

  return (
    <div className="mt-10 mx-auto container">
      <button
        type="button"
        className="bg-green-600 border-1 py-4 px-4 text-white rounded-lg"
        onClick={() => {
          setOpen(true);
          showAlert();
        }}
        disabled={isLoading}
      >
        {buttonText}
      </button>

      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <IdentificationIcon className="h-6 w-6 text-green-600" aria-hidden="true" />

        <div className="mt-3">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Receive Laboratory Results
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500 py-2">
              Enter or scan your <strong>DID</strong> to receive your <strong>Lab-Results</strong> as a <strong>Verifiable Credential</strong>.
            </p>
          </div>
          <label htmlFor="did" className="block text-lg font-semibold text-gray-700 mt-2 ">
            <input
              type="text"
              id="did"
              placeholder="Enter your DID"
              name="did"
              value={userDid}
              onChange={async (e) => {
                setDid(e.target.value);
              }}
              className="border border-indigo-300 rounded-lg p-2 font-normal w-full"
            />
          </label>
          <h3 className="mt-3">
            Or scan it from your <span className="text-main"> Dock Wallet App </span>
          </h3>
          <p className="my-3 text-xs">
            <span className="text-gray-500">(Open the <strong>Dock Wallet App</strong> in your mobile, there you can find your DID by clicking on the icon in the bottom menu.)</span>
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
};

export default ModalComponent;