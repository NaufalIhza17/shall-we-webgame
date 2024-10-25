"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuickChoose from "../games/quick-choose/page";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function JoinPage() {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedRoomId = sessionStorage.getItem("liveblocksRoomId");
    const storedNickname = sessionStorage.getItem("liveblocksNickname");

    if (storedRoomId && storedNickname) {
      setRoomId(storedRoomId);
      setNickname(storedNickname);
      setJoined(true);
    }
  }, []);

  const handleJoinRoom = () => {
    if (nickname.trim() !== "" && roomId.trim() !== "") {
      sessionStorage.setItem("liveblocksRoomId", roomId);
      sessionStorage.setItem("liveblocksNickname", nickname);
    }
  };

  const handleRedirect = () => {
    const query = new URLSearchParams({
      roomId,
      nickname
    }).toString();

    if (joined && roomId) {
      router.push(`/games/quick-choose?${query}`);
    }
  };

  useEffect(() => {
    if (joined && roomId) {
      handleRedirect();
    }
  }, [joined, roomId]);

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
          <div className="w-[300px] p-5 rounded-[10px] bg-[#4A4A4A]">
            <input
              type="text"
              placeholder="Insert Party Id..."
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>
          <button
            onClick={handleJoinRoom}
            type="submit"
            className="mt-[22px] bg-white rounded-full w-20 h-20"
          >
            <span className="text-[#989898]">join</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
