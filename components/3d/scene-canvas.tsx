"use client";

import { Suspense, useRef } from "react";
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useScroll } from "@react-three/drei";
import { AnimatedSphere } from "./animated-sphere";
import { FallingStars } from "./falling-stars";
import { FloatingParticles } from "./floating-particles";

function SceneContent() {
  const scroll = useScroll();
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useFrame(() => {
    if (cameraRef.current) {
      // Adjust camera position based on scroll. This is a simplified example.
      // You might want to map scroll.offset to a more complex camera movement.
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, 5 + scroll.offset * 10, 0.05); // Smoothly move camera further away on scroll
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedSphere />
      <FallingStars />
      <FloatingParticles />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
}

export function SceneCanvas() {
  return (
    <Canvas
      className="absolute inset-0 z-0"
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 0, 5],
      }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}