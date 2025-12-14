"use client";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text, Html, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { name, title, bio, projects, skills, socialLinks, colors } from "../data";
import { useRouter } from "next/navigation";

// 3D Card Component for Projects
function ProjectCard({ project, position, index }: { project: any; position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.1 : 1}
        >
          <boxGeometry args={[2, 2.5, 0.2]} />
          <meshStandardMaterial
            color={hovered ? colors.accent : colors.primary}
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? colors.accent : colors.primary}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>
        <Html position={[0, 1.4, 0.15]} center>
          <div className="bg-black/80 px-3 py-1 rounded border border-cyan-500/50">
            <p className="text-cyan-300 text-sm font-bold whitespace-nowrap">{project.name}</p>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// Rotating Skill Orb
function SkillOrb({ skill, position, index }: { skill: string; position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 + index;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color={colors.secondary}
            metalness={0.9}
            roughness={0.1}
            emissive={colors.secondary}
            emissiveIntensity={0.2}
          />
        </mesh>
        <Html position={[0, 0.6, 0]} center>
          <div className="bg-black/80 px-2 py-1 rounded border border-blue-500/50">
            <p className="text-blue-300 text-xs whitespace-nowrap">{skill}</p>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// Central Name Display
function NameDisplay() {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={[0, 3, 0]}>
        <Html center>
          <div className="text-center">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              {name}
            </h1>
          </div>
        </Html>
      </group>
      <group position={[0, 2, 0]}>
        <Html center>
          <div className="text-center">
            <p className="text-xl text-blue-300 font-medium">{title}</p>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// Navigation Buttons Component
function NavigationButtons() {
  const router = useRouter();

  return (
    <div className="absolute top-4 left-4 z-50 flex gap-3">
      <button
        onClick={() => router.push("/terminal")}
        className="
          px-2 py-1 text-sm                 /* mobile size */
          md:px-4 md:py-2 md:text-base      /* desktop size */
          bg-cyan-500/20 hover:bg-cyan-500/40 
          text-cyan-300 rounded-lg border border-cyan-500/50 
          transition-all backdrop-blur-sm
        "
      >
        Terminal View
      </button>

      <button
        onClick={() => router.push("/graphical")}
        className="
          px-2 py-1 text-sm                 
          md:px-4 md:py-2 md:text-base      
          bg-blue-500/20 hover:bg-blue-500/40 
          text-blue-300 rounded-lg border border-blue-500/50 
          transition-all backdrop-blur-sm
        "
      >
        Graphical View
      </button>

      <button
        onClick={() => router.push("/")}
        className="
          px-2 py-1 text-sm                 
          md:px-4 md:py-2 md:text-base      
          bg-purple-500/20 hover:bg-purple-500/40 
          text-purple-300 rounded-lg border border-purple-500/50 
          transition-all backdrop-blur-sm
        "
      >
        Home
      </button>
    </div>

  );
}

// Info Panel Component
function InfoPanel() {
  const [activeTab, setActiveTab] = useState<"about" | "projects" | "skills">("about");

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[600px] max-w-[90vw]">
      <div className="bg-black/70 backdrop-blur-md rounded-lg border border-cyan-500/30 p-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2 rounded ${
              activeTab === "about"
                ? "bg-cyan-500/30 text-cyan-300"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-800/70"
            } transition-all`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded ${
              activeTab === "projects"
                ? "bg-cyan-500/30 text-cyan-300"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-800/70"
            } transition-all`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-2 rounded ${
              activeTab === "skills"
                ? "bg-cyan-500/30 text-cyan-300"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-800/70"
            } transition-all`}
          >
            Skills
          </button>
        </div>
        
        <div className="max-h-[200px] overflow-y-auto custom-scrollbar text-gray-300">
          {activeTab === "about" && (
            <div className="space-y-2">
              <p className="text-sm leading-relaxed">{bio.long}</p>
            </div>
          )}
          
          {activeTab === "projects" && (
            <div className="space-y-3">
              {projects.slice(0, 4).map((project, idx) => (
                <div key={idx} className="border-l-2 border-cyan-500/50 pl-3 py-1">
                  <h4 className="text-cyan-300 font-semibold">{project.name}</h4>
                  <p className="text-xs text-gray-400">{project.desc}</p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "skills" && (
            <div className="space-y-2">
              {Object.entries(skills).map(([category, items], idx) => (
                <div key={idx}>
                  <h4 className="text-cyan-400 text-sm font-semibold">{category}:</h4>
                  <p className="text-xs text-gray-400">{items.join(", ")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color={colors.primary} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={colors.accent} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />

      {/* Stars Background */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

      {/* Name Display */}
      <Suspense fallback={null}>
        <NameDisplay />
      </Suspense>

      {/* Projects Cards */}
      {projects.slice(0, 4).map((project, idx) => {
        const angle = (idx / 4) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Suspense key={project.id} fallback={null}>
            <ProjectCard
              project={project}
              position={[x, -1, z]}
              index={idx}
            />
          </Suspense>
        );
      })}

      {/* Skill Orbs */}
      {Object.values(skills).flat().slice(0, 8).map((skill, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Suspense key={skill} fallback={null}>
            <SkillOrb
              skill={skill as string}
              position={[x, 1, z]}
              index={idx}
            />
          </Suspense>
        );
      })}

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function Portfolio3D() {
  return (
    <div className="w-screen h-screen relative bg-black">
      <NavigationButtons />
      <Canvas>
        <Scene />
      </Canvas>
      <InfoPanel />
    </div>
  );
}

