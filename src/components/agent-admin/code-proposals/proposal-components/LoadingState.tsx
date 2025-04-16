
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingProposalDetails = () => (
  <div className="space-y-4">
    <div>
      <Skeleton className="h-6 w-64 mb-2" />
      <Skeleton className="h-4 w-40" />
    </div>
    
    <Skeleton className="h-px w-full my-4" />
    
    <div>
      <Skeleton className="h-4 w-24 mb-1" />
      <Skeleton className="h-20 w-full rounded-md" />
    </div>
    
    <div>
      <Skeleton className="h-4 w-32 mb-1" />
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
    </div>
    
    <div>
      <Skeleton className="h-4 w-20 mb-1" />
      <Skeleton className="h-[300px] w-full rounded-md" />
    </div>
  </div>
);
