"use client";

import { useState } from "react";
import { Room } from "../Room";
import { CollaborativeApp } from "../CollaborativeApp";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CreatePage() {
  const [nickname, setNickname] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [maxCapacity, setMaxCapacity] = useState(1);
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  const handleCreateRoom = () => {
    if (nickname.trim() !== "") {
      const newRoomId = uuidv4();
      setRoomId(newRoomId);
      setJoined(true);
    }
  };

  if (joined && roomId) {
    return (
      <Room roomId={roomId} nickname={nickname}>
        <CollaborativeApp roomId={roomId} />
      </Room>
    );
  }

  return (
    <div className="flex flex-col gap-10 justify-between h-full w-full">
      <Header />
      <div className="flex flex-col gap-[34px] justify-center items-center">
        <Link href={"/"}>
          <h1 className="text-5xl text-cst-gray">Shall We</h1>
        </Link>
        <div className="flex flex-col gap-3 items-center">
          <div className="w-[300px] p-5 rounded-[10px] bg-[#4A4A4A]">
            <input
              type="text"
              placeholder="Insert Username..."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="w-full flex justify-between">
            <div className="w-[170px] p-5 rounded-[10px] bg-[#4A4A4A]">
              <select
                value={gameMode}
                onChange={(e) => setGameMode(e.target.value)}
                className="w-full bg-transparent outline-none"
              >
                <option value="" disabled>Game Mode</option>
                <option value="quick-choose" className="text-black">Quick Choose</option>
              </select>
            </div>
            <div className="w-[120px] p-5 rounded-[10px] bg-[#4A4A4A]">
              <input
                type="number"
                placeholder="Max. Party"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(Number(e.target.value))}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleCreateRoom}
            type="submit"
            className="mt-[22px] bg-white rounded-full w-20 h-20"
          >
            <span className="text-[#989898]">create</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
