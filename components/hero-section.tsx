"use client";

import { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Play } from "lucide-react";
import * as THREE from "three";
import { TextureLoader } from "three";

// 3D Animated Sphere Component
function AnimatedSphere() {
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
        color="#ffffff"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.75}
        opacity={0.8}
        transparent={true}
        clearcoat={0.5}
        clearcoatRoughness={0.2}
      />
    </Sphere>
  );
}

// Falling Stars Component
function FallingStars() {
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

// Enhanced Floating Particles Component
function FloatingParticles() {
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
      
      // Individual velocities for organic movement
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return { positions, sizes, colors, velocities };
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      
      // Gentle rotation
      particlesRef.current.rotation.y = time * 0.02;
      particlesRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
      
      // Update positions for organic movement
      const positionAttribute = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Add subtle floating motion
        positionAttribute.array[i3] += velocities[i3] + Math.sin(time + i) * 0.001;
        positionAttribute.array[i3 + 1] += velocities[i3 + 1] + Math.cos(time + i) * 0.001;
        positionAttribute.array[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.5 + i) * 0.0005;
        
        // Boundary wrapping for seamless animation
        if (Math.abs(positionAttribute.array[i3]) > 10) velocities[i3] *= -1;
        if (Math.abs(positionAttribute.array[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
        if (Math.abs(positionAttribute.array[i3 + 2]) > 10) velocities[i3 + 2] *= -1;
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

// 3D Scene Component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#f8fafc" />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#8b5cf6" castShadow />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#c084fc" />
      <pointLight position={[0, -10, 5]} intensity={0.3} color="#e879f9" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={0.5} 
        color="#ddd6fe"
        castShadow
      />
      <AnimatedSphere />
      <FloatingParticles />
      <FallingStars />
    </>
  );
}

const HeroSection = () => {
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden matrix-bg">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* 3D Canvas with Bubble Container */}
      <div className="fixed inset-0 z-0 bubble-container">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Suspense>
        </Canvas>
        {/* <div className="bubble-overlay h-full w-full" /> */}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2"
            >
              <p className="text-primary font-medium text-lg tracking-wide">
                Hello, I&apos;m
              </p>
              <h1 className="text-5xl md:text-7xl font-bold refined-text text-invert-soft">
                Talha Malik
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-purple-600 mx-auto lg:mx-0" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground text-invert">
                Full Stack Developer &{" "}
                <span className="text-primary">AI Specialist</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed text-invert">
                Crafting innovative digital experiences with cutting-edge technology.
                Specializing in modern web development, AI integration, and scalable solutions.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="group cursor-pointer hover:scale-105 transition-transform hover-through"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group cursor-pointer border-2 border-primary/20 hover:border-primary/40 hover:scale-105 transition-all hover-through"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50"
            >
              {[
                { number: "50+", label: "Projects Completed" },
                { number: "3+", label: "Years Experience" },
                { number: "100%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Visualization Space */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-96 lg:h-[500px] hidden lg:block"
          >
            {/* This space is reserved for the 3D canvas background */}
            <div className="absolute inset-0 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-600/5 backdrop-blur-sm" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 cursor-pointer group hover:bg-transparent hover-through"
        >
          <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors text-invert">
            Scroll Down
          </span>
          <ArrowDown className="w-5 h-5 animate-bounce text-primary bubble-float" />
        </Button>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }} />
    </section>
  );
};

export default HeroSection;