import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export default function LabInfo() {

  return (
    <div>
      <h2 className='text-md mb-3 font-semibold text-green-500'>For Patients</h2>
      <p className='text-md mb-3'>
        Typically, a Verifiable Credential (VC) for a laboratory test is issued by an accredited laboratory. This process guarantees the authenticity and reliability of your medical test results.
      </p>
      <p className='text-md mb-3'>
        In this demonstration, we´ll simulate a laboratory´s role to issue three distinct VCs, each representing a specific laboratory test result. This step is crucial for ensuring the integrity of the data used in our testing environment.
      </p>
      <p className='text-md mb-3'>
        These VCs symbolize your personal lab results, serving as a digital passport that unlocks opportunities to participate in medical research studies. By contributing, you not only aid scientific progress but also stand to earn rewards for your participation.
      </p>
      <p className="bg-green-300 rounded-lg p-3">
        <FontAwesomeIcon icon={faWarning} className="mr-2" />
        Should you already possess these credentials in your DOCK Wallet app, feel free to explore and contribute to various research pools available, furthering medical advancements and potentially earning rewards.
      </p>
    </div>

  );
}