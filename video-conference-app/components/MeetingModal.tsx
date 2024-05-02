import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface MeetingModalProps {
  title: string;
  buttonText: string;
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
}

const MeetingModal = ({
  buttonText,
  isOpen,
  onClick,
  onClose,
  title,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-1 border-none px-8 py-10">
        <div className="flex flex-col gap-10">
          <h1 className="text-white text-2xl text-bold text-center">{title}</h1>

          <Button onClick={onClick} className="bg-blue-1">
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
