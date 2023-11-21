import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export default function LabInfo() {

  return (
    <div>
      <h2 className='text-md mb-3 font-semibold text-green-500'>For Patients</h2>
      <p className='text-md mb-3'>
                In a real-life scenario, a Verifiable Credential from a laboratory test is issued by an accredited laboratory.
        <br />
                For testing purposes, we simulate the role of a laboratory to issue this test Verifiable Credential (VC).
      </p>
      <p className='text-md mb-3'>
          This credential represents your lab results and is a key to participating in medical research pools and earn rewards.
      </p>
      <p className="bg-green-300 rounded-lg p-3">
        <FontAwesomeIcon icon={faWarning} className="mr-2" />
                If you already own this credential into your dock wallet app, you can go to research pools to contribute.
      </p>
    </div>
  );
}