"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { useLoading } from "@/lib/loading-context";

const Loader = () => {
  const { isLoading: globalIsLoading } = useLoading();
  const [text, setText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messages = useMemo(
    () => [
      "Initializing systems...",
      "Establishing secure connection...",
      "Compiling data streams...",
      "Authenticating user credentials...",
      "Accessing encrypted databases...",
      "Decrypting sensitive information...",
      "Optimizing neural networks...",
      "Loading AI modules...",
      "Calibrating sensors...",
      "Synchronizing data...",
      "Finalizing setup...",
      "Downloading critical data...",
      "Wiping all traces...",
      "Operation complete.",
    ],
    []
  );

  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let messageDisplayTimeout: NodeJS.Timeout;

    const typeMessage = () => {
      if (messageIndex < messages.length) {
        const currentMessage = messages[messageIndex];
        if (charIndex < currentMessage.length) {
          setText(currentMessage.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          messageDisplayTimeout = setTimeout(() => {
            charIndex = 0;
            messageIndex++;
            setCurrentMessageIndex(messageIndex);
            setText(""); // Clear text before starting next message
            if (messageIndex < messages.length) {
              // Add slight delay before starting next message for robotic feel
              setTimeout(() => {
                typingInterval = setInterval(
                  typeMessage,
                  50 // Fixed 50ms intervals for stability
                );
              }, 300);
            }
          }, 800);
        }
      } else {
        clearInterval(typingInterval);
        clearTimeout(messageDisplayTimeout);
        // Animation complete - loader will hide based on global loading state
      }
    };

    // Start first message with initial delay
    setTimeout(() => {
      typingInterval = setInterval(typeMessage, 50);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(messageDisplayTimeout);
    };
  }, [messages]);

  const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.95,
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -8,
    },
  };

  return (
    <AnimatePresence>
      {globalIsLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-[rgba(139,92,246)] font-mono overflow-hidden"
          variants={loaderVariants}
          initial="visible"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Matrix-like background effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[rgba(139,92,246)] to-transparent animate-pulse"></div>
            <div
              className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[rgba(139,92,246)] to-transparent animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[rgba(139,92,246)] to-transparent animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <motion.div
            className="text-4xl md:text-6xl font-bold mb-8 relative z-10"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Bot
              className="text-[rgba(139,92,246)] drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
              size={64}
            />
          </motion.div>

          <div className="text-center px-4 min-h-[4rem] flex items-center justify-center relative z-10 w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessageIndex}
                className="text-lg md:text-xl text-center relative"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <motion.span className="drop-shadow-[0_0_5px_rgba(139,92,246,0.3)]">
                  {text}
                </motion.span>
                <motion.span
                  className="inline-block ml-1 text-2xl text-[rgba(139,92,246)]"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                  }}
                >
                  █
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicator */}
          <motion.div className="mt-8 w-64 h-1 bg-gray-700 rounded-full overflow-hidden relative z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-[rgba(139,92,246)] to-[rgba(139,92,246)] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
              initial={{ width: "0%" }}
              animate={{
                width: `${
                  ((currentMessageIndex + 1) / messages.length) * 100
                }%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
          >
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[rgba(139,92,246)] to-transparent opacity-60 shadow-[0_0_20px_rgba(139,92,246,0.8)]"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
