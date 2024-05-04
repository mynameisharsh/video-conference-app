import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const client = useStreamVideoClient();
  const { user } = useUser();
  useEffect(() => {
    console.log(client, user);
    if (!client || !user?.id) return;

    const getCalls = async () => {
      const { calls } = await client.queryCalls({
        sort: [
          {
            field: "starts_at",
            direction: -1,
          },
        ],
        filter_conditions: {
          starts_at: { $exists: true },
          $or: [
            {
              created_by_user_id: user?.id,
            },
            { members: { $in: [user?.id] } },
          ],
        },
      });
      console.log(calls);
      setCalls(calls);
      setLoading(false);
    };

    getCalls();
  }, [client, user?.id]);
  const now = new Date();
  const upcoming = calls.filter(
    ({ state: { startsAt } }: Call) => startsAt && startsAt > now
  );
  const ended = calls.filter(
    ({ state: { startsAt, endedAt } }: Call) =>
      !!endedAt || (startsAt && startsAt < now)
  );

  return {
    upcoming,
    ended,
    recordings: calls,
    loading,
  };
};
