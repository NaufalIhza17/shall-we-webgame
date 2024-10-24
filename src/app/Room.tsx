"use client";

import { ReactNode, useEffect } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
  useOthers,
  useMutation,
  useStorage,
} from "@liveblocks/react/suspense";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import GoBack from "@/components/GoBack";

type RoomProps = {
  children: ReactNode;
  roomId: string;
  nickname: string;
  maxCapacity?: number;
  isCreator?: boolean;
};

export function Room({
  children,
  roomId,
  nickname,
  maxCapacity = 2,
  isCreator = false,
}: RoomProps) {
  return (
    <LiveblocksProvider
      publicApiKey={
        process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY || "your_api_key_here"
      }
    >
      <RoomProvider
        id={roomId}
        initialPresence={{ nickname, id: uuidv4() }}
        initialStorage={{ maxCapacity }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <RoomContent
            children={children}
            maxCapacity={maxCapacity}
            isCreator={isCreator}
          />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

type RoomContentProps = {
  children: ReactNode;
  maxCapacity: number;
  isCreator: boolean;
};

function RoomContent({ children, maxCapacity, isCreator }: RoomContentProps) {
  const others = useOthers();
  const currentUsersCount = others.length + 1;

  const storedMaxCapacity = useStorage((root) => root.maxCapacity);

  const setMaxCapacity = useMutation(({ storage }, maxCapacity) => {
    storage.set("maxCapacity", maxCapacity);
  }, []);

  useEffect(() => {
    if (isCreator && !storedMaxCapacity) {
      setMaxCapacity(maxCapacity);
    }
  }, [storedMaxCapacity, maxCapacity, setMaxCapacity, isCreator]);

  const capacity = storedMaxCapacity || maxCapacity;
  if (currentUsersCount > capacity) {
    toast.error("The room is full");
    return <GoBack />;
  }

  return <>{children}</>;
}
