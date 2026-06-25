import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero-section";
import AboutSection from "@/components/ui/about-section";
import SkillsSection from "@/components/ui/skills-section";
import ProjectsSection from "@/components/ui/projects-section";
import PhotographySection from "@/components/ui/photography-section";
import InterestsSection from "@/components/ui/interests-section";
import ContactSection from "@/components/ui/contact-section";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <PhotographySection />
      <InterestsSection />
      <ContactSection />
    </main>
  );
}
