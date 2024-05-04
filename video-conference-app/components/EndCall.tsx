import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCall = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;
  if (!isMeetingOwner) return null;

  return (
    <Button
      onClick={() => {
        call.endCall();
        router.push("/");
      }}
      className="bg-blue-1"
    >
      End Call
    </Button>
  );
};

export default EndCall;
