import Navigation from "@/components/navbar";
import HeroSection from "@/app/_components/hero-section";
import AboutSection from "@/app/_components/about-section";
import ProjectsSection from "@/app/_components/projects-section";
import ContactSection from "@/app/_components/contact-section";
import Footer from "@/components/footer";
import { BubbleCursor } from "@/components/bubble-effects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground matrix-bg">
      <BubbleCursor />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
