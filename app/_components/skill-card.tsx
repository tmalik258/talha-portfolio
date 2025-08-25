'use client';

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SkillCardProps {
  skill: {
    category: string;
    icon: React.ElementType;
    technologies: string[];
    color: string;
  };
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const Icon = skill.icon;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ y: y }}
      whileHover={{ scale: 1.05, rotateX: 5 }}
      className="group relative"
    >
      <Card className="h-full flex flex-col justify-between p-6 bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ease-in-out hover:border-accent hover:shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold text-primary">
            {skill.category}
          </CardTitle>
          {React.createElement(Icon, { className: cn("w-10 h-10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6", skill.category.toLowerCase().replace(/\s/g, '-')) })}
        </CardHeader>
        <CardContent>
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
}