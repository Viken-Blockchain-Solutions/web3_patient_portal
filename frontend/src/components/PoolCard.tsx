// frontend/src/components/PoolCard.tsx
import Image from "next/image";
import Docs from "../public/assets/images/docs.png";
import PoolModal from "./pools/PoolModal";
import { PoolCardProps } from "../../types";

/**
 * Renders the PoolCard component.
 *
 * @param {PoolCardProps} props - The props object containing the title, start date, end date, funding, currency unit, and proof template ID.
 * @return {JSX.Element} The rendered PoolCard component.
 */
export default function PoolCard({ title, startDate, endDate, funding, currency_unit, proofTemplateID, testName, issuerName }: PoolCardProps) {

  return (
    <div>
      <div className="p-4 rounded-lg bg-slate-100 w-full relative pt-2">
        <div className="flex pt-2">
          <div className="flex flex-col">
            <p className="text-lg inline-flex place-items-center">
              <Image
                alt="avatar"
                width={40}
                height={40}
                sizes="100%"
                className="verifyLogo"
                src={Docs}
                priority
              />
              {title}</p>
          </div>
        </div>
        <hr className="divider" />
        <div className="text-md p-2">
          <h5 className="text-sm text-slate-800 font-semibold">About:</h5>
          <ol className="text-xs font-medium ml-2 text-gray-600">
            <li>Test name: <span className="text-main">{testName}</span></li>
            <li>Issuer: <span className="text-main">{issuerName}</span></li>
          </ol>
        </div>
        <div className="mt-2 mb-5 mx-2">
          <p className="text-main font-semibold">Reward: {funding.toLocaleString() + " " + currency_unit}</p>
        </div>
        <PoolModal poolName={title} proofTemplateID={proofTemplateID} />
      </div>
      <div className="inline-flex gap-2 rounded-lg w-full mt-3 justify-center">
        <p className="font-semibold text-gray-500">Start Date: {startDate} </p>
        <p className="font-semibold text-gray-500">- End Date: {endDate}</p>
      </div>

    </div>
  );
}
