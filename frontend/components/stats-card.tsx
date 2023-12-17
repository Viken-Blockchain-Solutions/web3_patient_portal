import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StatsCardProps {
    title: string;
    count: number;
    subtitle: string;
    icon?: any;
}

const StatsCard = ({ title, count, subtitle, icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Image src={icon} alt="icon" width={20} height={20}/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
