"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Mail, Github, Linkedin, ExternalLink, Zap, Code2 } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: Code2 },
    { href: "#projects", label: "Projects", icon: Zap },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  const socialLinks = [
    { href: "https://github.com/tmalik258/", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/tmalik04", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-white/8 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-primary/5"
            : "bg-transparent"
        }`}
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:subtle-shift">
                  <span className="font-heading font-bold text-sm text-primary-foreground">TM</span>
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-foreground group-hover:refined-text transition-all duration-300 hidden sm:block">Talha Malik</span>
                <span className="font-mono text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block">Full Stack Developer</span>
              </div>
            </motion.div>

            {/* Enhanced Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      className="relative flex items-center space-x-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-primary transition-all duration-300 group border border-transparent hover:border-primary/20 backdrop-blur-sm hover:bg-primary/5 cursor-pointer"
                    >
                      <Icon className="w-4 h-4 transition-all duration-300" />
                      <span className="font-body font-medium">{item.label}</span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Enhanced Social Links */}
              <div className="hidden sm:flex items-center space-x-2">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.1, rotate: 5, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative p-3 rounded-xl bg-secondary/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group border border-transparent hover:border-primary/20 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/25"
                      aria-label={link.label}
                    >
                      <Icon className="w-4 h-4 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(var(--primary),0.8)]" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Enhanced Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative p-3 rounded-xl bg-secondary/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 cyber-border glass-effect group"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X className="w-5 h-5 group-hover:glow-effect" /> : <Menu className="w-5 h-5 group-hover:glow-effect" />}
                </motion.div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%", scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeOut" } }}
            transition={{ type: "spring", damping: 25, stiffness: 200, duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background/98 backdrop-blur-xl border-l border-primary/20 shadow-2xl shadow-primary/10 md:hidden neural-network overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Enhanced Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center space-x-3"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-effect cyber-glitch">
                      <span className="text-primary-foreground font-bold text-sm">TM</span>
                    </div>
                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-heading font-bold neon-text">Talha Malik</span>
                    <span className="text-xs font-mono text-muted-foreground">Full Stack Developer</span>
                  </div>
                </motion.div>
                <motion.button
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="relative p-3 rounded-xl bg-secondary/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 cyber-border glass-effect group"
                >
                  <X className="w-5 h-5 group-hover:glow-effect" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </motion.button>
              </div>

              {/* Enhanced Mobile Navigation */}
              <div className="flex-1 px-6 py-8 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50, rotateY: 90 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="relative flex items-center space-x-4 p-4 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer group cyber-border glass-effect"
                      >
                        <Icon className="w-6 h-6 text-primary group-hover:glow-effect transition-all duration-300" />
                        <span className="text-lg font-body font-medium group-hover:neon-text">{item.label}</span>
                        <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Enhanced Mobile Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="p-6 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5"
              >
                <div className="flex items-center justify-center space-x-6">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.2, rotate: 15, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative p-4 rounded-xl bg-secondary/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 glow-effect group cyber-border glass-effect"
                        aria-label={link.label}
                      >
                        <Icon className="w-6 h-6 group-hover:neon-text transition-all duration-300" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      </motion.a>
                    );
                  })}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="text-center text-sm text-muted-foreground mt-4 font-mono"
                >
                  Connect with me
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;