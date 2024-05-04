"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const Table = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="text-white flex flex-col xl:flex-row items-center">
      <h1 className="text-sky-1 text-normal text-[#C9DDFF] w-[160px]">
        {title}:&nbsp;
      </h1>
      <h1 className="font-bold">{value}</h1>
    </div>
  );
};

const PersonalRoom = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const { call, isLoading } = useGetCallById(user!.id);

  const client = useStreamVideoClient();

  if (isLoading) return <Loading />;

  const startMeeting = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", user!.id);
      const startsAt = new Date().toISOString();
      const description = "Personal Room";
      await newCall.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
    }

    router.push(`/meeting/${user!.id}?personal=true`);
  };

  return (
    <section className="flex flex-col w-full gap-4">
      <h1 className="text-2xl font-bold text-white">Personal Room</h1>
      <div className="bg-dark-1 p-4 rounded-lg flex flex-col gap-3">
        <Table title="Topic" value={`${user!.username}'s personal room`} />
        <Table title="Meeting ID" value={user!.id} />
        <Table
          title="Meeting Link"
          value={`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
            user!.id
          }?personal=true`}
        />
      </div>
      <div className="flex gap-5">
        <Button
          className="bg-blue-1 hover:bg-dark-1 text-white"
          onClick={startMeeting}
        >
          Start
        </Button>
        <Button
          className="bg-dark-1 hover:bg-dark-2 text-white"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                user!.id
              }?personal=true`
            );
            toast({ title: "Link copied" });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
