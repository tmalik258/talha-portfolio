"use client";

import { Suspense } from "react";
import Loader from "../loader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { RobotModel } from "./robot-model";

function HeroSceneContent() {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 5, 5]} intensity={0.5} />
      
      {/* Environment for better lighting */}
      <Environment preset="studio" />
      
      {/* Robot Model */}
      <RobotModel 
        position={[0, -1.35, 0]} 
        scale={1.5} 
        rotation={[0, Math.PI /-1.2, 0]} 
      />
      
      {/* Interactive controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export function HeroRobotScene() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{
        fov: 50,
        near: 0.1,
        far: 1000,
        position: [0, 0, 4],
      }}
      shadows
    >
      <Suspense fallback={<Loader />}>
        <HeroSceneContent />
      </Suspense>
    </Canvas>
  );
}