import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface MeetingInformtionCardProps {
  type: "upcoming" | "previous" | "recordings";
  title?: string;
  date: string;
  onClick: () => void;
  buttonText: string;
  link: string;
  isPrevious: boolean;
}

const MeetingInformationCard = ({
  type,
  title,
  date,
  onClick,
  link,
  buttonText,
  isPrevious,
}: MeetingInformtionCardProps) => {
  const { toast } = useToast();

  return (
    <div className="bg-dark-1 p-5 rounded-lg flex flex-col gap-5">
      <Image
        src={
          type === "upcoming"
            ? "/icons/upcoming.svg"
            : type === "previous"
            ? "/icons/previous.svg"
            : type === "recordings"
            ? "/icons/recordings.svg"
            : ""
        }
        height={24}
        width={24}
        alt="Meeting Icon"
      />

      <h1 className="text-white font-bold text-xl">
        {title || "No Description"}
      </h1>

      <p className="text-[#ECF0FF]">{date}</p>

      {
        <div className="grid grid-cols-2 gap-4">
          {!isPrevious && (
            <Button className="bg-blue-1 hover:bg-blue-1" onClick={onClick}>
              {buttonText}
            </Button>
          )}
          {!isPrevious && (
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
            >
              Copy URL
            </Button>
          )}
        </div>
      }
    </div>
  );
};

export default MeetingInformationCard;
