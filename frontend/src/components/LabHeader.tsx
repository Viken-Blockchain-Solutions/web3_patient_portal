import Image from "next/image";
import logoImage from "../public/assets/images/vbs-medical-research-hub.png";

export const LabHeader = () => {
  return (
    <div>
      <header className="text-center mb-12">
        <div className="flex flex-row justify-center gap-6">
          <Image src={logoImage} alt="Laboratory Logo" width={125} height={125} className="mb-2 rounded-full" priority />
          <h1 className="text-2xl font-bold text-blue-600 mt-2">Lab Test Results</h1>
        </div>
      </header>
    </div>
  );
};