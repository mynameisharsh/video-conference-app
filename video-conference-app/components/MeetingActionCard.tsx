import { cn } from "@/lib/utils";
import Image from "next/image";

interface MeetingActionCardProps {
  title: string;
  description: string;
  icon: string;
  className: string;
  onClick: () => void;
}

const MeetingActionCard: React.FC<MeetingActionCardProps> = ({
  className,
  description,
  icon,
  onClick,
  title,
}: MeetingActionCardProps) => {
  return (
    <div
      className={cn(
        "h-[260px] rounded-[20px] flex flex-col justify-between p-[25px] cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[12px]">
        <Image src={icon} width={27} height={27} alt={title} />
      </div>
      <div>
        <h1 className="font-2xl text-white font-bold">{title}</h1>
        <p className="text-lg text-white font-normal">{description}</p>
      </div>
    </div>
  );
};

export default MeetingActionCard;
