"use client";
import dynamic from "next/dynamic";

const Portfolio3D = dynamic(() => import("../_component/Portfolio3D"), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <p className="text-cyan-400 font-mono animate-pulse">Loading 3D scene...</p>
    </div>
  ),
});

export default function ThreeDPage() {
  return <Portfolio3D />;
}
