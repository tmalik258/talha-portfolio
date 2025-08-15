"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// 3D Animated Sphere Component
export function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollY = useRef(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const scrollFactor = scrollY.current * 0.001;
      const mouseInfluence = 0.1;
      
      // Smooth rotation with scroll and mouse influence
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + scrollFactor) * 0.3 + mousePosition.current.y * mouseInfluence;
      meshRef.current.rotation.y += 0.005 + mousePosition.current.x * mouseInfluence * 0.5;
      
      // Adjust Z position to bring sphere closer and make it more visible
      meshRef.current.position.z = window.innerWidth > 1024 ? -1 : 0;
      
      // Floating animation with scroll influence
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2 + Math.sin(scrollY.current * 0.001) * 0.1;
      
      // Scale animation with scroll
      const baseScale = 2.5;
      const scrollScale = Math.sin(scrollY.current * 0.002) * 0.3;
      meshRef.current.scale.setScalar(baseScale + scrollScale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={2.5} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#fff"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.3}
        metalness={0.85}
        opacity={0.8}
        transparent={true}
        clearcoat={0.5}
        clearcoatRoughness={0.7}
      />
    </Sphere>
  );
}