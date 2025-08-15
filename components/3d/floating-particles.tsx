"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

// Enhanced Floating Particles Component
export function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 150; // Optimized count for performance
  const circleTexture = useLoader(TextureLoader, '/circle.svg');
  
  const { positions, sizes, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    const colorPalette = [
      [0.54, 0.36, 0.97], // #8b5cf6
      [0.66, 0.33, 0.97], // #a855f7
      [0.75, 0.52, 0.98], // #c084fc
      [0.91, 0.53, 0.98], // #e879f9
      [0.87, 0.82, 0.99], // #ddd6fe
    ];
    
    for (let i = 0; i < particleCount; i++) {
      // Positions with depth layering
      const radius = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Varied sizes for visual hierarchy
      sizes[i] = Math.random() * 0.03 + 0.01;
      
      // Color variation
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      colors[i * 3] = colorPalette[colorIndex][0];
      colors[i * 3 + 1] = colorPalette[colorIndex][1];
      colors[i * 3 + 2] = colorPalette[colorIndex][2];

      // Initial velocities for organic movement
      velocities[i * 3] = (Math.random() - 0.5) * 0.001;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    
    return { positions, sizes, colors, velocities };
  }, [particleCount]);
  
  useFrame((state) => {
    if (particlesRef.current) {
      const positionAttribute = particlesRef.current.geometry.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Apply subtle movement based on time and initial velocity
        positionAttribute.array[i3] += velocities[i3] + Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.0001;
        positionAttribute.array[i3 + 1] += velocities[i3 + 1] + Math.cos(state.clock.elapsedTime * 0.1 + i) * 0.0001;
        positionAttribute.array[i3 + 2] += velocities[i3 + 2] + Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.0001;
        
        // Boundary wrapping for seamless animation
        if (positionAttribute.array[i3] > 10) positionAttribute.array[i3] = -10;
        if (positionAttribute.array[i3] < -10) positionAttribute.array[i3] = 10;
        if (positionAttribute.array[i3 + 1] > 10) positionAttribute.array[i3 + 1] = -10;
        if (positionAttribute.array[i3 + 1] < -10) positionAttribute.array[i3 + 1] = 10;
        if (positionAttribute.array[i3 + 2] > 10) positionAttribute.array[i3 + 2] = -10;
        if (positionAttribute.array[i3 + 2] < -10) positionAttribute.array[i3 + 2] = 10;
      }
      positionAttribute.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        transparent
        opacity={0.6}
        vertexColors
        sizeAttenuation
        blending={2} // AdditiveBlending for glow effect
        alphaMap={circleTexture}
      />
    </points>
  );
}