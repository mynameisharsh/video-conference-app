"use client";

import { tokenProvider } from "@/actions/video.action";
import Loading from "@/components/Loading";
import { useUser } from "@clerk/nextjs";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const VideoClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  const clerkUser: User = {
    id: user?.id || "",
    name: user?.username || user?.id,
    image: user?.imageUrl,
    type: "authenticated",
  };
  useEffect(() => {
    if (!user && !isLoaded) return;

    if (!apiKey) throw new Error("API KEY is not available");

    const client = new StreamVideoClient({
      apiKey,
      user: clerkUser,
      tokenProvider: tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);
  if (!videoClient) return <Loading />;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default VideoClientProvider;
