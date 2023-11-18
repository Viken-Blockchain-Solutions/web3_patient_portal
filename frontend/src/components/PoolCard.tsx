import Image from "next/image";
import Docs from "../public/assets/images/docs.png";
import PoolModal from "./pools/PoolModal";

interface PoolCardProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  funding: number;
}

export default function PoolCard({ title, startDate, endDate, funding, content }: PoolCardProps) {

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
        <p>
          About:
        </p>
        <p className="text-gray-600">
          {content}
        </p>

        <div className="my-4">
          <p className="text-main font-bold">Reward: ${funding}</p>
        </div>

        <PoolModal />
      </div>

      <div className="inline-flex gap-2 rounded-lg  bg-slate-100 w-full p-3 mt-5">
        <p className="font-bold text-gray-500">Start Date: {startDate} </p>
        <p className="font-bold text-gray-500">- End Date: {endDate}</p>
      </div>


    </>
  );
}
