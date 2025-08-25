"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Calendar,
  Code,
  Briefcase,
  Filter,
  Eye,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: "web" | "mobile" | "ai" | "fullstack" | "other";
  type: "github" | "upwork" | "personal";
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  stars?: number;
  forks?: number;
  date: string;
  featured: boolean;
  status: "completed" | "in-progress" | "maintained";
}

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), []);

  const titleVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2 }
  }), []);

  const filterVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.4 }
  }), []);

  const gridVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay: 0.6 }
  }), []);

  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }), []);

  // Memoize filter handler
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);
  const [selectedType, setSelectedType] = useState<string>("all");

  // Sample projects data - In a real app, this would come from APIs
  const projects: Project[] = [
    {
      id: "1",
      title: "AI-Powered E-Commerce Platform",
      description: "Full-stack e-commerce solution with AI-driven product recommendations and dynamic pricing.",
      longDescription: "A comprehensive e-commerce platform built with Next.js and Python, featuring machine learning algorithms for personalized product recommendations, dynamic pricing optimization, and intelligent inventory management.",
      technologies: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Redis", "Stripe", "AWS"],
      category: "fullstack",
      type: "upwork",
      image: "/api/placeholder/600/400",
      liveUrl: "https://demo-ecommerce.example.com",
      date: "2024-01-15",
      featured: true,
      status: "completed",
    },
    {
      id: "2",
      title: "Real-Time Chat Application",
      description: "Modern chat app with WebSocket integration, file sharing, and end-to-end encryption.",
      longDescription: "A secure, real-time messaging platform built with React and Node.js, featuring WebSocket connections, file sharing capabilities, message encryption, and responsive design for seamless communication.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "JWT", "Cloudinary"],
      category: "web",
      type: "github",
      image: "/api/placeholder/600/400",
      githubUrl: "https://github.com/tmalik258/chat-app",
      stars: 45,
      forks: 12,
      date: "2023-11-20",
      featured: true,
      status: "maintained",
    },
    {
      id: "3",
      title: "Smart Home IoT Dashboard",
      description: "IoT dashboard for monitoring and controlling smart home devices with predictive analytics.",
      longDescription: "An intelligent IoT dashboard that connects and manages smart home devices, featuring real-time monitoring, predictive maintenance alerts, energy optimization, and intuitive control interfaces.",
      technologies: ["React Native", "Python", "MQTT", "InfluxDB", "Grafana", "Docker"],
      category: "mobile",
      type: "upwork",
      image: "/api/placeholder/600/400",
      date: "2023-09-10",
      featured: false,
      status: "completed",
    },
    {
      id: "4",
      title: "Computer Vision Image Classifier",
      description: "Deep learning model for image classification with 95% accuracy on custom datasets.",
      longDescription: "A sophisticated computer vision system using convolutional neural networks for multi-class image classification, featuring data augmentation, transfer learning, and model optimization techniques.",
      technologies: ["Python", "PyTorch", "OpenCV", "FastAPI", "Docker", "MLflow"],
      category: "ai",
      type: "github",
      image: "/api/placeholder/600/400",
      githubUrl: "https://github.com/tmalik258/image-classifier",
      stars: 78,
      forks: 23,
      date: "2023-07-05",
      featured: true,
      status: "maintained",
    },
    {
      id: "5",
      title: "Task Management SaaS",
      description: "Multi-tenant task management platform with team collaboration and analytics.",
      longDescription: "A comprehensive SaaS solution for project and task management, featuring team collaboration tools, advanced analytics, customizable workflows, and multi-tenant architecture.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Vercel", "Tailwind CSS"],
      category: "web",
      type: "personal",
      image: "/api/placeholder/600/400",
      liveUrl: "https://taskmanager.example.com",
      githubUrl: "https://github.com/tmalik258/task-manager",
      stars: 34,
      forks: 8,
      date: "2023-05-15",
      featured: false,
      status: "in-progress",
    },
    {
      id: "6",
      title: "Cryptocurrency Trading Bot",
      description: "Automated trading bot with machine learning algorithms for market prediction.",
      longDescription: "An intelligent cryptocurrency trading bot that uses machine learning algorithms to analyze market trends, execute trades automatically, and optimize portfolio performance with risk management.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Binance API", "Redis", "Docker"],
      category: "ai",
      type: "github",
      image: "/api/placeholder/600/400",
      githubUrl: "https://github.com/tmalik258/crypto-bot",
      stars: 156,
      forks: 42,
      date: "2023-03-20",
      featured: true,
      status: "maintained",
    },
  ];

  const categories = [
    { id: "all", label: "All Projects", icon: Code },
    { id: "web", label: "Web Apps", icon: ExternalLink },
    { id: "mobile", label: "Mobile", icon: Briefcase },
    { id: "ai", label: "AI/ML", icon: Star },
    { id: "fullstack", label: "Full Stack", icon: GitFork },
  ];

  const types = [
    { id: "all", label: "All Types" },
    { id: "github", label: "Open Source" },
    { id: "upwork", label: "Client Work" },
    { id: "personal", label: "Personal" },
  ];

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = selectedCategory === "all" || project.category === selectedCategory;
    const typeMatch = selectedType === "all" || project.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const featuredProjects = projects.filter((project) => project.featured);

  // Memoize utility function
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "maintained":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  }, []);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...titleVariants}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="neon-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-6 glow-effect" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of innovative solutions, from AI-powered applications to
            full-stack web platforms, demonstrating technical expertise and creative problem-solving.
          </p>
        </motion.div>

        {/* Featured Projects Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Star className="w-6 h-6 text-primary mr-3" />
            Highlighted Work
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                      <Code className="w-16 h-16 text-primary/50" />
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Badge className={`${getStatusColor(project.status)} border`}>
                        {project.status.replace("-", " ")}
                      </Badge>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        {project.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-xl">{project.title}</span>
                      {project.type === "github" && (
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="w-4 h-4" />
                            <span>{project.forks}</span>
                          </div>
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(project.date).toLocaleDateString()}
                      </div>
                      
                      <div className="flex space-x-2">
                        {project.liveUrl && (
                          <Button size="sm" variant="outline" asChild className="cursor-pointer">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button size="sm" variant="outline" asChild className="cursor-pointer">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <h3 className="text-2xl font-bold flex items-center">
              <Filter className="w-6 h-6 text-primary mr-3" />
              All Projects
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category.id)}
                      className="cursor-pointer"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
              
              {/* Type Filter */}
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedType(type.id)}
                    className="cursor-pointer"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
          key={`${selectedCategory}-${selectedType}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          exit="hidden"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
               <Card className="overflow-hidden border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 h-full group">
                  <div className="relative overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center">
                      <Code className="w-12 h-12 text-primary/40" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                        {project.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(project.date).toLocaleDateString()}
                      </div>
                      
                      <div className="flex space-x-1">
                        {project.liveUrl && (
                          <Button size="sm" variant="ghost" asChild className="h-8 w-8 p-0 cursor-pointer">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button size="sm" variant="ghost" asChild className="h-8 w-8 p-0 cursor-pointer">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-600/5 backdrop-blur-sm">
            <CardContent className="p-0 space-y-6">
              <h3 className="text-2xl font-bold">
                Interested in <span className="text-primary font-semibold">Collaborating</span>?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I&apos;m always excited to work on innovative projects and bring creative ideas to life.
                Let&apos;s discuss how we can build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="cursor-pointer" asChild>
                  <a href="#contact">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Start a Project
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="cursor-pointer border-2 border-primary/20 hover:border-primary/40" asChild>
                  <a href="https://github.com/tmalik258/" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View All on GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(ProjectsSection);