"use client";

import Image from "next/image";
import MeetingActionCard from "./MeetingActionCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MeetingActionsList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isInstantMeeting" | "isJoiningMeeting" | undefined
  >(undefined);

  return (
    <section className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <MeetingActionCard
        icon="/icons/add-meeting.svg"
        className="bg-orange-1"
        title="New Meeting"
        description="Start an instant meeting"
        onClick={() => setMeetingState("isInstantMeeting")}
      />
      <MeetingActionCard
        icon="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        onClick={() => setMeetingState("isJoiningMeeting")}
      />
      <MeetingActionCard
        icon="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        onClick={() => setMeetingState("isScheduleMeeting")}
      />
      <MeetingActionCard
        icon="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        onClick={() => router.push("/recordings")}
      />
    </section>
  );
};

export default MeetingActionsList;
