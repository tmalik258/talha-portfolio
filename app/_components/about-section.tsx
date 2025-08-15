"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Database,
  Brain,
  Smartphone,
  Globe,
  Zap,
  Award,
  Users,
  Clock,
  Target,
  Terminal,
} from "lucide-react";

const AboutSection = () => {
  const skills = [
    {
      category: "Frontend Development",
      icon: Globe,
      technologies: [
        "React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
        "Three.js", "HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Backend Development",
      icon: Database,
      technologies: [
        "Node.js", "Python", "Express.js", "FastAPI", "PostgreSQL",
        "MongoDB", "Redis", "REST APIs", "GraphQL", "Microservices"
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      category: "AI & Machine Learning",
      icon: Brain,
      technologies: [
        "TensorFlow", "PyTorch", "OpenAI API", "Langchain", "Hugging Face",
        "Computer Vision", "NLP", "Deep Learning", "MLOps", "Data Science"
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      category: "Mobile & Cloud",
      icon: Smartphone,
      technologies: [
        "React Native", "Flutter", "AWS", "Google Cloud", "Docker",
        "Kubernetes", "CI/CD", "Firebase", "Vercel", "Netlify"
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "Top Rated Freelancer",
      description: "Maintained 100% job success score on Upwork with 50+ completed projects",
      metric: "100%",
    },
    {
      icon: Users,
      title: "Client Satisfaction",
      description: "Delivered exceptional results for clients across various industries",
      metric: "50+",
    },
    {
      icon: Clock,
      title: "Years of Experience",
      description: "Continuous learning and adaptation to emerging technologies",
      metric: "3+",
    },
    {
      icon: Target,
      title: "Project Success Rate",
      description: "Consistently delivered projects on time and within budget",
      metric: "98%",
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-primary">ABOUT_ME.exe</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 text-primary hover-through">
            About Me
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-body leading-relaxed"
          >
            Passionate <span className="text-primary font-semibold">full-stack developer</span> and AI specialist with a mission to create
            <span className="text-accent font-semibold"> innovative digital solutions</span> that push the boundaries of technology.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="p-8 border-primary/20 hover:border-primary/40 transition-all duration-300 bg-gradient-to-br from-primary/5 to-purple-600/5 backdrop-blur-sm hover-through">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Code2 className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">My Journey</h3>
                </div>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 3 years of experience in software development, I&apos;ve evolved
                    from a curious programmer to a versatile full-stack developer and AI specialist.
                    My journey began with a fascination for creating digital solutions that
                    solve real-world problems.
                  </p>
                  
                  <p>
                    I specialize in modern web technologies, with expertise spanning from
                    responsive frontend interfaces to robust backend architectures. My recent
                    focus on AI and machine learning has opened new dimensions in creating
                    intelligent, adaptive applications.
                  </p>
                  
                  <p>
                    As a top-rated freelancer on Upwork, I&apos;ve had the privilege of working
                    with diverse clients, delivering solutions that not only meet requirements
                    but exceed expectations. Every project is an opportunity to learn,
                    innovate, and push technological boundaries.
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="mt-6 cursor-pointer border-2 border-primary/20 hover:border-primary/40 hover:scale-105 transition-transform"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/tmalik04"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Zap className="w-6 h-6 text-primary mr-3" />
              Key Achievements
            </h3>
            
            <div className="grid gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.3, rotateX: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                  >
                    <Card className="p-8 bg-card/20 backdrop-blur-xl border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:shadow-lg cursor-pointer group hover-through">
                      <CardContent className="p-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-all duration-500"></div>
                        
                        <div className="flex items-start space-x-6 relative z-10">
                          <div className="flex-shrink-0">
                            <motion.div
                              transition={{ duration: 0.6 }}
                              className="w-16 h-16 bg-gradient-to-br from-primary via-purple-600 to-accent rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg"
                            >
                              <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                            </motion.div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-xl group-hover:text-primary transition-all duration-300">{achievement.title}</h4>
                              <motion.span
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: index * 0.15 + 0.5, duration: 0.5, type: "spring" }}
                                viewport={{ once: true }}
                                className="text-3xl font-heading font-bold text-primary transition-all duration-300"
                              >
                                {achievement.metric}
                              </motion.span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-all duration-300">
                              {achievement.description}
                            </p>
                            
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              transition={{ delay: index * 0.15 + 0.8, duration: 0.8 }}
                              viewport={{ once: true }}
                              className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Terminal className="w-5 h-5 text-accent" />
              <span className="font-mono text-sm text-accent">SKILLS.json</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary">
              Technical Expertise
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A comprehensive arsenal of cutting-edge technologies and frameworks
              for building next-generation applications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, y: -10, rotateX: 5 }}
                  className="group"
                >
                  <Card className="p-8 h-full bg-card/30 backdrop-blur-xl border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-lg cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-4 mb-8">
                        <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg`}>
                          <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-heading font-bold group-hover:text-primary transition-all duration-300">{skill.category}</h4>
                          <p className="font-mono text-sm text-muted-foreground">{skill.technologies.length} technologies</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {skill.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        </div>
    </section>
  );
};

export default AboutSection;