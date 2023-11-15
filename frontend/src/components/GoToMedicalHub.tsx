// components/GoToMedicalHubButton.tsx
import Link from "next/link";

const GoToMedicalHubButton = () => {
  return (
    <>
      <Link type="button" href="/medicalhub" className="bg-blue-500 hover:bg-blue-600 text-black py-2 px-4 rounded border-2 border-purple-200">
          Go To Medical Hub
      </Link>
    </>
  );
};

export default GoToMedicalHubButton;