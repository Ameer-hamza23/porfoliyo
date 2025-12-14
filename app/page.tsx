"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "./_component/Navbar";
import HeadSection from "./_component/HeadSection";
import BodySection from "./_component/BodySection";
import FooterSection from "./_component/FooterSection";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(()=> {router.push("/terminal")},[])

  return (
    <div className="relative">
      {/* <Navbar />
      <HeadSection />
      <BodySection />
      <FooterSection /> */}
      
      {/* 
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={() => router.push("/terminal")}
          className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 rounded-lg border border-cyan-500/50 transition-all backdrop-blur-sm shadow-lg hover:shadow-cyan-500/50 font-semibold"
        >
          💻 Terminal View
        </button>
        <button
          onClick={() => router.push("/graphical")}
          className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg border border-blue-500/50 transition-all backdrop-blur-sm shadow-lg hover:shadow-blue-500/50 font-semibold"
        >
          🎨 Graphical View
        </button>
        <button
          onClick={() => router.push("/3d")}
          className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 rounded-lg border border-purple-500/50 transition-all backdrop-blur-sm shadow-lg hover:shadow-purple-500/50 font-semibold"
        >
          ✨ 3D View
        </button>
      </div>
      */}
    </div>
  );
}
