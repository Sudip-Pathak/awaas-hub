// components/Loading.tsx
"use client";

import React from "react";
import { Spinner } from "@/components/ui/spinner";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-50 gap-4">
      <Spinner className="w-10 h-10 text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default Loading;
