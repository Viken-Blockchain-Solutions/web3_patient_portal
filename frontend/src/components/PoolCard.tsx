// components/PoolCard.tsx
import React from "react";
import Image from "next/image";
import avatarLogo from '../public/assets/images/verifyed.png'

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
    <div className="max-w-[400px]">
      <div className="flex gap-3 place-items-center">
        <Image
          alt="avatar"
          width={50}
          height={50}
          className="verifyLogo"
          src={avatarLogo}
        />
        <div className="flex flex-col ">
          <p className="text-lg">{title}</p>
        </div>
      </div>
      <hr className="divider" />
      <p className="text-small text-default-500">Start Date: {startDate}</p>
      <p className="text-small text-default-500">End Date: {endDate}</p>
      <div className="my-4">
        <p>Funding: ${funding}</p>
      </div>

      <div>
        <button className="btn-primary">
          Contribute
        </button>
      </div>
    </div>
  );
}
