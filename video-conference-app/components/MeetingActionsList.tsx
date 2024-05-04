"use client";

import Image from "next/image";
import MeetingActionCard from "./MeetingActionCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingActionsList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isInstantMeeting" | "isJoiningMeeting" | undefined
  >(undefined);

  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

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

      {meetingState === "isScheduleMeeting" && !callDetail ? (
        <MeetingModal
          title="Create Meeting"
          buttonText="Schedule Meeting"
          isOpen={meetingState === "isScheduleMeeting"}
          onClick={() => createMeeting()}
          onClose={() => setMeetingState(undefined)}
        >
          <div className="w-full flex flex-col gap-2">
            <label className="text-white font-normal">Description</label>
            <Textarea
              className="bg-dark-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
            <label className="text-white font-normal">Date and Time</label>
            <ReactDatePicker
              selected={values.dateTime}
              className="bg-dark-2 rounded p-2 w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
              onChange={(e) => setValues({ ...values, dateTime: e! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d,yyyy h:mm aa"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          title="Meeting created"
          image="/icons/checked.svg"
          buttonText="Copy meeting link"
          isOpen={meetingState === "isScheduleMeeting"}
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`
            );
            toast({ title: "Link copied" });
          }}
          onClose={() => setMeetingState(undefined)}
        />
      )}

      {meetingState === "isInstantMeeting" ? (
        <MeetingModal
          title="Start an instant meeting"
          buttonText="Start Meeting"
          isOpen={meetingState === "isInstantMeeting"}
          onClick={() => createMeeting()}
          onClose={() => setMeetingState(undefined)}
        />
      ) : null}
      {meetingState === "isJoiningMeeting" ? (
        <MeetingModal
          title="Type the link here"
          buttonText="Join Meeting"
          isOpen={meetingState === "isJoiningMeeting"}
          onClick={() => router.push(values.link)}
          onClose={() => setMeetingState(undefined)}
        >
          <Input
            onChange={(e) => {
              setValues({ ...values, link: e.target.value });
            }}
            className="text-white bg-dark-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </MeetingModal>
      ) : null}
    </section>
  );
};

export default MeetingActionsList;
