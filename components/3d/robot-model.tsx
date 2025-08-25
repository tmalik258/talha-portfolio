"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface RobotModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export function RobotModel({ 
  position = [0, -1, 0], 
  scale = 1, 
  rotation = [0, 0, 0] 
}: RobotModelProps) {
  const robotRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/model/robot_character.glb");

  // Animate the robot with a gentle floating motion
  useFrame((state) => {
    if (robotRef.current) {
      // Gentle floating animation
      robotRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Slow rotation
      robotRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={robotRef} position={position} scale={scale} rotation={rotation}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload("/model/robot_character.glb");