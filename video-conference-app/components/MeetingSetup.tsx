import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface MeetingSetupProps {
  setIsSetupComplete: (flag: boolean) => void;
}

const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
  const [isPermissionGrantedToggle, setIsPermissionGrantedToggle] =
    useState(false);

  const call = useCall();
  if (!call) throw new Error("Call should be available");
  useEffect(() => {
    if (isPermissionGrantedToggle) {
      call?.microphone.disable();
      call?.camera.disable();
    } else {
      call?.microphone.enable();
      call?.camera.enable();
    }
  }, [isPermissionGrantedToggle, call?.camera, call?.microphone]);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4 p-5">
      <h1 className="text-white text-4xl font-bold">Setup</h1>
      <VideoPreview className="w-[800px] max-sm:w-full" />
      <div className="flex flex-col gap-3 items-center justidy-center">
        <label className="text-white flex gap-2 items-center justidy-center">
          <input
            type="checkbox"
            checked={isPermissionGrantedToggle}
            onChange={(e) => setIsPermissionGrantedToggle(e.target.checked)}
          />
          Join without camera and microphone
        </label>
        <DeviceSettings />
        <Button
          className="bg-blue-1"
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
