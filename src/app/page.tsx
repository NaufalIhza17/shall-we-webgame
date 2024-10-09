"use client";

import { useState } from "react";
import { Room } from "./Room";
import { CollaborativeApp } from "./CollaborativeApp";
import { v4 as uuidv4 } from "uuid"; // Import uuid

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(true);

  // Function to create a new room
  const handleCreateRoom = () => {
    if (nickname.trim() !== "") {
      const newRoomId = uuidv4(); // Generate a unique room ID
      setRoomId(newRoomId);
      setJoined(true);
    }
  };

  // Function to join an existing room
  const handleJoinRoom = () => {
    if (nickname.trim() !== "" && roomId.trim() !== "") {
      setJoined(true);
    }
  };

  if (joined && roomId) {
    return (
      <Room roomId={roomId} nickname={nickname}>
        {/* Pass roomId as prop to CollaborativeApp */}
        <CollaborativeApp roomId={roomId} />
      </Room>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col gap-3 justify-center items-center">
      <h1>Create or Join a Room</h1>

      {/* Toggle between creating or joining a room */}
      <div className="flex gap-3 text-black">
        <button onClick={() => setIsCreatingRoom(true)} className="px-4 py-2 bg-white rounded">Create Room</button>
        <button onClick={() => setIsCreatingRoom(false)} className="px-4 py-2 bg-white rounded">Join Room</button>
      </div>

      {/* Input for Nickname */}
      <div>
        <input
          type="text"
          placeholder="Enter your nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="text-black"
        />
      </div>

      {/* If joining a room, show room ID input */}
      {!isCreatingRoom && (
        <div>
          <input
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="text-black"
          />
        </div>
      )}

      {/* Show buttons based on the current action (create or join) */}
      {isCreatingRoom ? (
        <button onClick={handleCreateRoom} className="px-4 py-2 border border-white rounded">Create</button>
      ) : (
        <button onClick={handleJoinRoom}>Join</button>
      )}
    </div>
  );
}
