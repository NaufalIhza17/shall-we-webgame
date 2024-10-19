"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col gap-10 justify-between h-full w-[294px]">
      <Header />
      <div className="flex flex-col gap-[34px] justify-center items-center">
        <h1 className="text-5xl text-cst-gray">Shall We</h1>
        <div className="flex flex-col gap-3">
          <Link href={'/join'}>
            <button
              className="w-[200px] py-5 bg-[#4A4A4A] hover:bg-white transition-colors rounded-[20px] text-center"
            >
              <span className="uppercase text-[#989898]">Join Room</span>
            </button>
          </Link>
          <Link href={'/create'}>
            <button
              className="w-[200px] py-5 bg-[#4A4A4A] hover:bg-white transition-colors rounded-[20px] text-center"
              >
              <span className="uppercase text-[#989898]">Create Room</span>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
