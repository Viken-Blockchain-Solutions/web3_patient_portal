// components/PoolCard.tsx
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

interface PoolCardProps {
  title: string;
  startDate: string;
  endDate: string;
  funding: number;
}

export default function PoolCard({ title, startDate, endDate, funding }: PoolCardProps) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">Start Date: {startDate}</p>
          <p className="text-small text-default-500">End Date: {endDate}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Funding: ${funding}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <button className='p-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
          Contribute
        </button>
      </CardFooter>
    </Card>
  );
}
