import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return <section id="chi-sono" className="section-container w-full max-w-[100vw] overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Chi Sono</span>
          </h2>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="glass-strong rounded-3xl p-8 md:p-12">
          {/* Bio text */}
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Nato nel 2001, ho cominciato molto presto ad approcciarmi alla musica, 
              iniziando a suonare la batteria all'età di 7 anni. All'età di 12 anni 
              ho iniziato ad appassionarmi alla produzione musicale, componendo i miei 
              primi arrangiamenti.
            </p>
            
            <p>
              All'età di 14 anni, grazie a un contratto con la label tedesca 
              'New Joker Staff', ho potuto esibirmi come DJ in diverse località di prestigio, 
              come il <span className="text-primary font-medium">Café del Mar di Ibiza</span> e 
              il <span className="text-primary font-medium">Blue Club di Cortina D'Ampezzo</span>.
            </p>

            <AnimatePresence>
              {isExpanded && <motion.div initial={{
              opacity: 0,
              height: 0
            }} animate={{
              opacity: 1,
              height: "auto"
            }} exit={{
              opacity: 0,
              height: 0
            }} transition={{
              duration: 0.4
            }} className="space-y-4">
                  <p>
                    All'età di 17 anni ho aperto il mio primo studio di registrazione a Padova, 
                    entrando in contatto con la nuova scena musicale Padovana e offrendo 
                    beatmaking, produzioni complete, registrazioni e missaggi.
                  </p>
                  
                  <p>
                    In seguito, dopo aver conseguito una laurea in Economia Aziendale, 
                    ho deciso di ampliare le mie competenze tecniche nel campo audio, 
                    ottenendo una <span className="text-primary font-medium">certificazione 
                    come fonico di studio presso l'istituto NAM Milano</span>.
                  </p>
                  
                  <p>
                    Successivamente, ho lavorato come assistente in diversi studi, stabilizzandomi 
                    presso <span className="text-primary font-medium">L'n'R Production</span>, 
                    studio ed etichetta discografica di Luca Rustici, dove ho avuto l'opportunità 
                    di entrare in contatto con artisti di fama nazionale e di ampliare le mie 
                    competenze lavorando al fianco dei grandi del settore.
                  </p>
                </motion.div>}
            </AnimatePresence>
          </div>

          {/* Expand button */}
          <motion.button onClick={() => setIsExpanded(!isExpanded)} className="mt-8 mx-auto flex items-center gap-2 glass-button px-6 py-3 rounded-xl" whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
            <span className="relative z-10 font-medium">
              {isExpanded ? "Mostra meno" : "Scopri di più"}
            </span>
            <motion.div animate={{
            rotate: isExpanded ? 180 : 0
          }} transition={{
            duration: 0.3
          }} className="relative z-10">
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>;
};
export default AboutSection;