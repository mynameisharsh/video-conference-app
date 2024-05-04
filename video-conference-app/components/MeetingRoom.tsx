import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { LayoutIcon, UserIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCall from "./EndCall";

type LayoutType = "speaker-left" | "speaker-right" | "grid";

const MeetingRoom = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const personal = !!searchParam.get("personal");
  const [layoutType, setLayoutType] = useState<LayoutType>("speaker-left");
  const [showParticipant, setShowParticipant] = useState<boolean>(true);

  const CallLayout = () => {
    switch (layoutType) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="h-screen w-full flex flex-col p-5 text-white">
      <div className="relative flex full-size items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipant,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipant(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <LayoutIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-white bg-dark-1 border-none">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((layout, index) => (
              <DropdownMenuItem
                key={layout}
                onClick={() => setLayoutType(layout as LayoutType)}
              >
                {layout}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button onClick={() => setShowParticipant((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <UserIcon />
          </div>
        </button>

        {!personal && <EndCall />}
      </div>
    </section>
  );
};

export default MeetingRoom;
