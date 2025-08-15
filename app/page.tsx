import Navigation from "@/components/navigation-component";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer-component";
import { BubbleCursor } from "@/components/bubble-effects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
