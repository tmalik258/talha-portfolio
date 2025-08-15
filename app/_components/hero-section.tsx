"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Play } from "lucide-react";
import { SceneCanvas } from "@/components/3d/scene-canvas";

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* 3D Canvas with Bubble Container */}
      <div className="fixed inset-0 z-0 bubble-container">
        <SceneCanvas />
        <div className="bubble-overlay h-full w-full" />
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