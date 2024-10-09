"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { v4 as uuidv4 } from "uuid";

type RoomProps = {
  children: ReactNode;
  roomId: string;
  nickname: string;
};

export function Room({ children, roomId, nickname }: RoomProps) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_IosqkimtCQjLyFnW_wB4xL5Yual1t5j-ZQt-2BK8xa7gqr2UWsiln71PP4PZjX_-"
      }
    >
      <RoomProvider id={roomId} initialPresence={{ nickname, id: uuidv4() }}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
