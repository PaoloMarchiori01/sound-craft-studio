import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToServices = () => {
    document.getElementById("servizi")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-lg md:text-xl font-medium text-primary mb-4 tracking-widest uppercase">
            Sound Engineer
          </h2>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-gradient">Paolo</span>{" "}
          <span className="text-foreground">Marchiori</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Trasformo le tue idee sonore in realtà professionali
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToServices}
            className="glass-button px-8 py-4 rounded-2xl text-lg font-semibold relative z-10"
          >
            <span className="relative z-10">Scopri i Servizi</span>
          </button>
          <a
            href="#contatti"
            className="glass-button px-8 py-4 rounded-2xl text-lg font-semibold relative z-10"
          >
            <span className="relative z-10">Contattami</span>
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="cursor-pointer"
          onClick={scrollToServices}
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
