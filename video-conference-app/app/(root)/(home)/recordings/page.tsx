"use client";

import Loading from "@/components/Loading";
import MeetingInformationCard from "@/components/MeetingInformationCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording, useCall } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Recordings = () => {
  const { toast } = useToast();
  const [data, setData] = useState<CallRecording[]>([]);
  const { recordings, loading } = useGetCalls();
  const router = useRouter();
  useEffect(() => {
    const callRecordings = async () => {
      try {
        const records = await Promise.all(
          recordings.map((recording) => recording.queryRecordings())
        );
        const filteredRecordings = records
          .filter((record) => record.recordings.length > 0)
          .flatMap((record) => record.recordings);
        setData(filteredRecordings);
      } catch (e) {
        toast({ title: "Please try again later" });
      }
    };

    callRecordings();
  }, [recordings]);

  if (loading) return <Loading />;
  return (
    <section className="flex flex-col w-full gap-10">
      <h1 className="text-2xl font-bold text-white">Recordings</h1>

      {data.length ? (
        <div className="grid grid-col-1 xl:grid-cols-2 gap-3">
          {data.map((meeting, index) => (
            <MeetingInformationCard
              key={index}
              type="recordings"
              isPrevious={false}
              title={meeting.filename}
              date={meeting.start_time || "No date specified"}
              buttonText="Play"
              onClick={() => {
                router.push(`${meeting.url}`);
              }}
              link={`${meeting.url}`}
            />
          ))}
        </div>
      ) : (
        <p className="mt-[50px] w-full text-center text-white">No recordings</p>
      )}
    </section>
  );
};

export default Recordings;
