'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Floating Bubble Component
export function FloatingBubble({ 
  size = 'md', 
  delay = 0, 
  duration = 8,
  className = '',
  style = {}
}: {
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm border border-primary/10 bubble-float bubble-pulse ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: 'easeOut'
      }}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        ...style
      }}
    />
  );
}

// Bubble Field Component
export function BubbleField({ count = 15 }: { count?: number }) {
  // Responsive bubble count optimization
  const [bubbleCount, setBubbleCount] = React.useState(count);
  
  React.useEffect(() => {
    const updateBubbleCount = () => {
      if (window.innerWidth < 480) {
        setBubbleCount(Math.floor(count * 0.3)); // 30% on very small screens
      } else if (window.innerWidth < 768) {
        setBubbleCount(Math.floor(count * 0.6)); // 60% on mobile
      } else {
        setBubbleCount(count); // Full count on desktop
      }
    };
    
    updateBubbleCount();
    window.addEventListener('resize', updateBubbleCount);
    
    return () => window.removeEventListener('resize', updateBubbleCount);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: bubbleCount }).map((_, i) => {
        const size = Math.random() > 0.7 ? 'lg' : Math.random() > 0.4 ? 'md' : 'sm';
        const delay = Math.random() * 5;
        const duration = 6 + Math.random() * 8;
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = (Math.floor(Math.random() * 3) + 3) * 10;
        
        return (
          <FloatingBubble
            key={i}
            size={size}
            delay={delay}
            duration={duration}
            className={`${Math.random() > 0.5 ? 'bubble-drift' : ''}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              opacity: opacity / 100
            }}
          />
        );
      })}
    </div>
  );
}

// Interactive Bubble Cursor Effect
export function BubbleCursor() {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bubbleRef.current) {
        bubbleRef.current.style.left = `${e.clientX}px`;
        bubbleRef.current.style.top = `${e.clientY}px`;
      }

      // Create trailing bubbles
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          setTimeout(() => {
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            trail.style.opacity = `${0.6 - index * 0.1}`;
          }, index * 50);
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Main cursor bubble */}
      <div
        ref={bubbleRef}
        className="fixed w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 backdrop-blur-sm border border-primary/20 pointer-events-none z-50 bubble-pulse"
        style={{
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Trail bubbles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="fixed w-3 h-3 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm pointer-events-none z-40"
          style={{
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen',
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </>
  );
}

// Section Bubble Wrapper
export function BubbleSection({ 
  children, 
  className = '',
  bubbleCount = 8,
  enableTextInversion = true 
}: {
  children: React.ReactNode;
  className?: string;
  bubbleCount?: number;
  enableTextInversion?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Background bubbles */}
      <BubbleField count={bubbleCount} />
      
      {/* Content with optional text inversion */}
      <div className={`relative z-10 ${enableTextInversion ? 'text-invert-soft' : ''}`}>
        {children}
      </div>
      
      {/* Bubble overlay for interaction management */}
      <div className="bubble-overlay" />
    </div>
  );
}