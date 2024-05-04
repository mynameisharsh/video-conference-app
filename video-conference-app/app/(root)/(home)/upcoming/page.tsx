"use client";

import Loading from "@/components/Loading";
import MeetingInformationCard from "@/components/MeetingInformationCard";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";

const Upcoming = () => {
  const { upcoming, loading } = useGetCalls();
  const router = useRouter();

  if (loading) return <Loading />;
  return (
    <section className="flex flex-col w-full gap-10">
      <h1 className="text-2xl font-bold text-white">Upcoming Meetings</h1>

      {upcoming.length ? (
        <div className="grid grid-col-1 xl:grid-cols-2 gap-3">
          {upcoming.map((meeting, index) => (
            <MeetingInformationCard
              key={index}
              type="upcoming"
              isPrevious={false}
              title={meeting.state.custom.description}
              date={
                meeting.state.startsAt?.toLocaleString() || "No date specified"
              }
              buttonText="Start"
              onClick={() => {
                router.push(`meeting/${meeting.id}`);
              }}
              link={`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
            />
          ))}
        </div>
      ) : (
        <p className="mt-[50px] w-full text-center text-white">
          No upcoming meetings
        </p>
      )}
    </section>
  );
};

export default Upcoming;
