import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

interface MeetingModalProps {
  title: string;
  buttonText: string;
  isOpen: boolean;
  image?: string;
  onClick: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

const MeetingModal = ({
  buttonText,
  isOpen,
  onClick,
  onClose,
  title,
  children,
  image,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-1 border-none px-8 py-10">
        <div className="flex flex-col gap-8 justify-center items-center">
          {image ? (
            <Image src={image} width={50} height={50} alt="Meeting Created" />
          ) : null}
          <h1 className="text-white text-2xl text-bold text-center">{title}</h1>
          {children}
          <Button onClick={onClick} className="bg-blue-1">
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
