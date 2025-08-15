"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "talhamalik258@gmail.com",
      href: "mailto:talhamalik258@gmail.com",
      description: "Drop me a line anytime",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 XXX XXXXXXX",
      href: "tel:+92XXXXXXXXX",
      description: "Available for calls",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Pakistan",
      href: "#",
      description: "Remote work worldwide",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "< 24 hours",
      href: "#",
      description: "Quick turnaround",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/tmalik258/",
      color: "hover:text-gray-400",
      description: "Open source projects",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tmalik04",
      color: "hover:text-blue-400",
      description: "Professional network",
    },
    {
      icon: Globe,
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/~012afac575d2bf8c5e",
      color: "hover:text-green-400",
      description: "Freelance profile",
    },
  ];

  const budgetRanges = [
    "< $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
    "Let's discuss",
  ];

  const timelineOptions = [
    "ASAP",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "Flexible",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // In a real app, you would send the form data to your backend
      console.log("Form submitted:", formData);
      
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        budget: "",
        timeline: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let&apos;s discuss your project and create
            something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">
                Get in <span className="text-primary">Touch</span>
              </h3>
              
              <div className="grid gap-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="p-4 hover:bg-primary/5 transition-all duration-300 cursor-pointer group border-0 bg-card/50">
                        <CardContent className="p-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center group-hover:glow-effect transition-all duration-300">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{info.label}</h4>
                              <p className="text-primary font-medium">{info.value}</p>
                              <p className="text-muted-foreground text-sm">{info.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                Follow <span className="text-primary">Me</span>
              </h3>
              
              <div className="grid gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="p-4 hover:bg-primary/5 transition-all duration-300 group border-0 bg-card/50">
                        <CardContent className="p-0">
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-4 cursor-pointer"
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center group-hover:glow-effect transition-all duration-300">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{social.label}</h4>
                              <p className="text-muted-foreground text-sm">{social.description}</p>
                            </div>
                          </a>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border-primary/20">
                <CardContent className="p-0 text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-lg font-semibold">Available for New Projects</span>
                  </div>
                  <p className="text-muted-foreground">
                    Currently accepting new freelance opportunities and collaborations.
                    Let&apos;s build something amazing together!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold">
                  Start a <span className="text-primary">Conversation</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          errors.name ? "border-red-500" : "border-border hover:border-primary/50"
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          errors.email ? "border-red-500" : "border-border hover:border-primary/50"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject *</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.subject ? "border-red-500" : "border-border hover:border-primary/50"
                      }`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                        errors.message ? "border-red-500" : "border-border hover:border-primary/50"
                      }`}
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-green-500 bg-green-500/10 p-4 rounded-lg border border-green-500/20"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-4 rounded-lg border border-red-500/20"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>Failed to send message. Please try again or contact me directly.</span>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;