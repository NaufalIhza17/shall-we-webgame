"use client";

import { Room } from "@/app/Room";
import { CollaborativeApp } from "@/app/CollaborativeApp";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function QuickChooseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuickChoose />
    </Suspense>
  );
}

function QuickChoose() {
  const searchParams = useSearchParams();

  const roomId = searchParams.get("roomId");
  const nickname = searchParams.get("nickname");
  const isCreator = searchParams.get("isCreator") === "true" || false;
  const maxCapacity = Number(searchParams.get("maxCapacity")) || 2;

  if (!roomId || !nickname) {
    return <div>Missing room information</div>;
  }

  return (
    <Room
      roomId={roomId}
      nickname={nickname}
      isCreator={isCreator}
      maxCapacity={maxCapacity}
    >
      <CollaborativeApp roomId={roomId} />
    </Room>
  );
}
