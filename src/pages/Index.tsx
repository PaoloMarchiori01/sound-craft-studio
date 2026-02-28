import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import StudioSection from "@/components/StudioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background w-full max-w-[100vw] overflow-x-hidden">
      <Navigation />
      <main className="w-full max-w-[100vw] overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <StudioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
