"use client";

import Loading from "@/components/Loading";
import { useGetCallById } from "@/hooks/useGetCallById";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isLoading } = useGetCallById(params.id);

  if (isLoading) return <Loading />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? "Meeting Setup" : "Meeting Room"}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;