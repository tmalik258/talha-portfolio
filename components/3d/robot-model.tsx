"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useLoading } from "@/lib/loading-context";
import * as THREE from "three";

interface RobotModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export function RobotModel({ 
  position = [0, -1, 0], 
  scale = 1.25, 
  rotation = [0, 0, 0] 
}: RobotModelProps) {
  const robotRef = useRef<THREE.Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const modelErrorRef = useRef<string | null>(null);
  const { removeLoadingItem, addLoadingItem } = useLoading();
  
  // Add loading item when component mounts
  useEffect(() => {
    addLoadingItem('robot-model');
    return () => {
      removeLoadingItem('robot-model');
    };
  }, [addLoadingItem, removeLoadingItem]);
  
  // Move useGLTF outside try-catch to follow React hooks rules
  const gltf = useGLTF("/model/robot.glb");
  const scene = gltf.scene;
  
  // Clone scene once and memoize it with improved material setup
  const clonedScene = useMemo(() => {
    if (scene) {
      const cloned = scene.clone();
      
      console.log('Processing robot model materials...');
      
      // Traverse and enhance materials for better lighting response
      cloned.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log('Processing mesh:', child.name, 'Material type:', child.material?.type);
          
          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            // Handle different material types
            if (child.material instanceof THREE.MeshStandardMaterial) {
              console.log('Updating MeshStandardMaterial');
              child.material.metalness = Math.min(child.material.metalness || 0.3, 0.8);
              child.material.roughness = Math.max(child.material.roughness || 0.4, 0.2);
              child.material.envMapIntensity = 1;
              child.material.needsUpdate = true;
            } else if (child.material instanceof THREE.MeshBasicMaterial) {
              console.log('Converting MeshBasicMaterial to MeshStandardMaterial');
              // Convert basic materials to standard for lighting
              const standardMaterial = new THREE.MeshStandardMaterial({
                color: child.material.color,
                map: child.material.map,
                transparent: child.material.transparent,
                opacity: child.material.opacity,
                metalness: 0.3,
                roughness: 0.4
              });
              child.material = standardMaterial;
            } else {
              console.log('Unknown material type:', child.material.type, 'Creating new standard material');
              // For any other material types, create a new standard material
              const newMaterial = new THREE.MeshStandardMaterial({
                color: child.material.color || 0x8b5cf6,
                metalness: 0.4,
                roughness: 0.3,
                transparent: child.material.transparent || false,
                opacity: child.material.opacity || 1
              });
              child.material = newMaterial;
            }
          } else {
            console.log('No material found, creating default');
            // Create a default material if none exists
            child.material = new THREE.MeshStandardMaterial({
              color: 0x8b5cf6,
              metalness: 0.4,
              roughness: 0.3
            });
          }
        }
      });
      
      return cloned;
    }
    return null;
  }, [scene]);
  
  useEffect(() => {
     try {
       if (scene) {
         setIsLoaded(true);
         modelErrorRef.current = null;
         // Remove from loading items when model is ready
         removeLoadingItem('robot-model');
       }
     } catch (error) {
       console.error('Robot model loading error:', error);
       modelErrorRef.current = `Model Error: ${error instanceof Error ? error.message : 'Failed to load robot model'}`;
       // Also remove from loading even on error to prevent infinite loading
       removeLoadingItem('robot-model');
     }
   }, [scene, removeLoadingItem]);

  // Enhanced animation with smooth transitions and error handling
  useFrame((state) => {
    try {
      if (robotRef.current && isLoaded) {
        const time = state.clock.elapsedTime;
        
        // Smooth floating animation with multiple wave patterns
        const floatY = Math.sin(time * 0.5) * 0.1 + Math.sin(time * 0.8) * 0.05;
        robotRef.current.position.y = position[1] + floatY;
        
        // Gentle rotation with smooth transitions
        const rotationY = Math.sin(time * 0.3) * 0.15 + Math.cos(time * 0.2) * 0.05;
        robotRef.current.rotation.y = rotation[1] + rotationY;
        
        // Subtle tilt animation
        robotRef.current.rotation.x = rotation[0] + Math.sin(time * 0.4) * 0.02;
        robotRef.current.rotation.z = rotation[2] + Math.cos(time * 0.6) * 0.01;
        
        // Scale breathing effect
        const scaleMultiplier = 1 + Math.sin(time * 0.7) * 0.02;
        robotRef.current.scale.setScalar(scale * scaleMultiplier);
        
        // Clear any previous errors if animation is running smoothly
        if (modelErrorRef.current) {
          modelErrorRef.current = null;
        }
      }
    } catch (error) {
      console.error('Robot animation error:', error);
      modelErrorRef.current = `Animation Error: ${error instanceof Error ? error.message : 'Unknown animation error'}`;
    }
  });

  // Log errors for debugging
  if (modelErrorRef.current) {
    console.warn('Robot model error detected:', modelErrorRef.current);
  }

  // Fallback if model fails to load
  if (modelErrorRef.current && !isLoaded) {
    return (
      <mesh ref={robotRef} position={position} scale={scale} rotation={rotation}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#8b5cf6" wireframe />
      </mesh>
    );
  }

  return (
    <group ref={robotRef} position={position} scale={scale} rotation={rotation}>
      {clonedScene && <primitive object={clonedScene} />}
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload("/model/robot.glb");