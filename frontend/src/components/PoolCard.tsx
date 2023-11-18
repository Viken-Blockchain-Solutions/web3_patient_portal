import Image from "next/image";
import Docs from "../public/assets/images/docs.png";
import PoolModal from "./pools/PoolModal";

interface PoolCardProps {
  title: string;
  startDate: string;
  endDate: string;
  funding: number;
  currency_unit: string;
}

export default function PoolCard({ title, startDate, endDate, funding, currency_unit }: PoolCardProps) {

  return (
    <>
      <div className="p-4 rounded-lg  bg-slate-100 w-full relative pt-2">

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
        <div className="text-sm m-2 p-5 border-2 rounded-lg border-purple-300">
          <h5 className="text-md text-slate-800 font-semibold">About:</h5>
          <ol className="text-xs font-medium ml-2 text-gray-600">
            <li>Name: <span className="text-main">Lipid Panel</span></li>
            <li>Issuer: <span className="text-main">VBS-Labs</span></li>
            <div>
              <h6 className="pl-1 font-semibold text-slate-800">Required:</h6>
              <p className="pl-2 font-medium text-xs text-gray-600">Cholesterol:</p>
              <div className="pl-4 text-main text-xs">
                <li>Value, Unit, Reference Range</li>
              </div>
            </div>
          </ol>
        </div>
        <div className="my-4">
          <p className="text-main font-semibold">Reward: { funding.toLocaleString() + " " + currency_unit }</p>
        </div>
        <PoolModal />
        <div className="inline-flex gap-2 rounded-lg w-full p-3 mt-5">
          <p className="font-semibold text-gray-500">Start Date: {startDate} </p>
          <p className="font-semibold text-gray-500">- End Date: {endDate}</p>
        </div>
      </div>


    </>
  );
}
