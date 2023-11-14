// components/PoolCard.tsx
import Image from "next/image";

interface PoolCardProps {
  title: string;
  startDate: string;
  endDate: string;
  funding: number;
}

export default function PoolCard({
  title,
  startDate,
  endDate,
  funding
}: PoolCardProps) {
  return (
    <div className="max-w-[400px] border border-gray-200 rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-3">
        <Image
          src=""
          alt="Pool Logo"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm text-gray-500">Start Date: {startDate}</p>
          <p className="text-sm text-gray-500">End Date: {endDate}</p>
        </div>
      </div>
      <hr className="my-4 border-t border-gray-200" />
      <p className="text-lg font-semibold">Funding: ${funding}</p>
      <button className="mt-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Contribute
      </button>
    </div>
  );
}
