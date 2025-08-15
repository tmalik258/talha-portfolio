"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

// Falling Stars Component
export function FallingStars() {
  const starsRef = useRef<THREE.Points>(null);
  const starCount = 50;
  const circleTexture = useLoader(TextureLoader, '/circle.svg');
  
  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const opacities = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      // Random starting positions across the top
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = Math.random() * 10 + 5; // y (start high)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      
      // Falling velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.02; // slight x drift
      velocities[i * 3 + 1] = -(Math.random() * 0.05 + 0.02); // falling speed
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01; // slight z drift
      
      // Random sizes and opacities
      sizes[i] = Math.random() * 0.02 + 0.005;
      opacities[i] = Math.random() * 0.8 + 0.2;
    }
    
    return { positions, velocities, sizes, opacities };
  }, [starCount]);
  
  useFrame(() => {
    if (starsRef.current) {
      const positionAttribute = starsRef.current.geometry.attributes.position;
      
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        
        // Update positions
        positionAttribute.array[i3] += velocities[i3]; // x
        positionAttribute.array[i3 + 1] += velocities[i3 + 1]; // y
        positionAttribute.array[i3 + 2] += velocities[i3 + 2]; // z
        
        // Reset star when it falls below screen
        if (positionAttribute.array[i3 + 1] < -10) {
          positionAttribute.array[i3] = (Math.random() - 0.5) * 20;
          positionAttribute.array[i3 + 1] = Math.random() * 5 + 10;
          positionAttribute.array[i3 + 2] = (Math.random() - 0.5) * 10;
        }
      }
      positionAttribute.needsUpdate = true;
    }
  });
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={starCount}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015}
        transparent
        opacity={0.7}
        color="#ffffff"
        sizeAttenuation
        blending={2} // AdditiveBlending for glow effect
        alphaMap={circleTexture}
      />
    </points>
  );
}