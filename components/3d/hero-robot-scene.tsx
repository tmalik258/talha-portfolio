"use client";

import { Suspense, useRef } from "react";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
});
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RobotModel } from "./robot-model";
import * as THREE from "three";

// Dynamic Lighting Component with Error Detection
function DynamicLighting() {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);
  const lightingErrorRef = useRef<string | null>(null);

  useFrame((state) => {
    try {
      const time = state.clock.elapsedTime;
      
      // Animate directional light - keep it front-facing
      if (directionalLightRef.current) {
        directionalLightRef.current.intensity = 2.2 + Math.sin(time * 0.5) * 0.3;
        directionalLightRef.current.position.x = Math.sin(time * 0.3) * 1;
        directionalLightRef.current.position.y = 2 + Math.cos(time * 0.4) * 0.5;
        directionalLightRef.current.position.z = 8; // Keep it in front
      }
      
      // Animate front key light with subtle movement
      if (pointLight1Ref.current) {
        pointLight1Ref.current.intensity = 1.8 + Math.sin(time * 0.8) * 0.2;
        pointLight1Ref.current.position.x = Math.sin(time * 0.6) * 0.5;
        pointLight1Ref.current.position.y = 1 + Math.cos(time * 0.7) * 0.3;
        pointLight1Ref.current.position.z = 6; // Keep it in front
      }
      
      // Animate secondary front light
      if (pointLight2Ref.current) {
        pointLight2Ref.current.intensity = 1.6 + Math.cos(time * 0.9) * 0.2;
        pointLight2Ref.current.position.x = Math.cos(time * 0.5) * 0.3;
        pointLight2Ref.current.position.y = Math.sin(time * 0.8) * 0.2;
        pointLight2Ref.current.position.z = 5; // Keep it in front
      }
      
      // Clear any previous errors if animation is running smoothly
      if (lightingErrorRef.current) {
        lightingErrorRef.current = null;
      }
    } catch (error) {
      console.error('Lighting animation error:', error);
      lightingErrorRef.current = `Lighting Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  });

  // Display error if any
  if (lightingErrorRef.current) {
    console.warn('Dynamic lighting error detected:', lightingErrorRef.current);
  }

  return (
    <>
      {/* Reduced ambient light for better contrast */}
      <ambientLight intensity={0.3} color="#f0f0ff" />
      
      {/* Main directional light from front */}
      <directionalLight 
        ref={directionalLightRef}
        position={[0, 2, 8]} 
        intensity={2.5}
        color="#ffffff"
        castShadow={false}
      />
      
      {/* Primary front key light */}
      <pointLight 
        ref={pointLight1Ref}
        position={[0, 1, 6]} 
        intensity={2.0}
        color="#ffffff"
        distance={60}
        decay={0.5}
      />
      
      {/* Secondary front light for even illumination */}
      <pointLight 
        ref={pointLight2Ref}
        position={[0, 0, 5]} 
        intensity={1.8}
        color="#ffffff"
        distance={50}
        decay={0.8}
      />
      
      {/* Side fill lights for dimension */}
      <pointLight 
        position={[-2, 1, 4]} 
        intensity={1.2}
        color="#ffffff"
        distance={40}
        decay={1}
      />
      
      <pointLight 
        position={[2, 1, 4]} 
        intensity={1.2}
        color="#ffffff"
        distance={40}
        decay={1}
      />
      
      {/* Purple accent lights from front angles */}
      <pointLight 
        position={[-1, 2, 3]} 
        intensity={0.6}
        color="#8b5cf6"
        distance={25}
        decay={1.5}
      />
      
      <pointLight 
        position={[1, -1, 3]} 
        intensity={0.6}
        color="#a855f7"
        distance={25}
        decay={1.5}
      />
    </>
  );
}

function HeroSceneContent() {
  return (
    <>
      <DynamicLighting />      
      <RobotModel />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
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
      <Suspense fallback={null}>
        <HeroSceneContent />
      </Suspense>
    </Canvas>
  );
}