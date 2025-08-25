"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const messages = useMemo(
    () => [
      "Initializing systems...",
      "Establishing secure connection...",
      "Compiling data streams...",
      "Authenticating user credentials...",
      "Accessing encrypted databases...",
      "Decrypting sensitive information...",
      "Bypassing firewall protocols...",
      "Injecting malicious code...",
      "Executing remote commands...",
      "Gaining root access...",
      "Exploiting vulnerabilities...",
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
          setText((prev) => prev + currentMessage.charAt(charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          messageDisplayTimeout = setTimeout(() => {
            setText("");
            charIndex = 0;
            messageIndex++;
            typingInterval = setInterval(typeMessage, 50); // Start typing next message
          }, 1000); // Wait 1 second before clearing and typing next message
        }
      } else {
        clearInterval(typingInterval);
        clearTimeout(messageDisplayTimeout);
        setIsLoading(false);
      }
    };

    typingInterval = setInterval(typeMessage, 50); // Initial typing speed

    return () => {
      clearInterval(typingInterval);
      clearTimeout(messageDisplayTimeout);
    };
  }, [messages]);

  const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-primary font-mono"
          variants={loaderVariants}
          initial="visible"
          exit="exit"
        >
          <motion.div
            className="text-4xl md:text-6xl font-bold mb-8"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Bot className="text-purple-400 text-2xl md:text-4xl" size={64} />
          </motion.div>
          <motion.p
            className="text-lg md:text-xl text-center px-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {text}
            <motion.span
              className="inline-block ml-1 text-2xl"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              |
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
