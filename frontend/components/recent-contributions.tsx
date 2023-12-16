import { convertToCET, truncateString } from "@/src/utils/tools";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";

interface RecentContributionsProps {
  contributions: any[];
}

export function RecentContributions({ contributions }: RecentContributionsProps) {
  return (
    <div className="space-y-8">
      {contributions.map((contribution, index) => 
        index < 5 && (
          <div className="flex items-center" key={contribution.id}>
            <Avatar className="h-9 w-9">
              <AvatarImage src={"../src/public/assets/images/vbs-medical-research-hub.png"} alt="Avatar" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{convertToCET(contribution.submitted_at)}</p>
              <p className="text-sm text-muted-foreground">{truncateString(contribution.contributor_did)}</p>
            </div>
            <div className="ml-auto font-medium">{contribution.test_name}</div>
          </div>
        )
      )}
    </div>
  );
}
