
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingProposalsList = () => (
  <div className="space-y-2 pr-2">
    {[1, 2, 3].map((index) => (
      <div key={index} className="p-3 border rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="mt-1">
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    ))}
  </div>
);
