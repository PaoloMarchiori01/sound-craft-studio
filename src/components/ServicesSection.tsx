import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Music, Mic, Radio, Headphones, Podcast, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  media: {
    type: "audio" | "video";
    title: string;
    src: string;
  }[];
}
const services: Service[] = [{
  id: "mixing",
  title: "Mixing & Mastering",
  icon: <Music className="w-6 h-6" />,
  description: "Il mixing è l'arte di bilanciare tutti gli elementi di una traccia - voci, strumenti, effetti - per creare un suono coeso e professionale. Il mastering è il tocco finale che ottimizza il brano per la distribuzione, garantendo che suoni perfetto su qualsiasi sistema di riproduzione. Questo processo trasforma una buona registrazione in un prodotto pronto per le radio e le piattaforme di streaming.",
  media: [{
    type: "audio",
    title: "Before/After Mix - Pop",
    src: ""
  }, {
    type: "audio",
    title: "Mastering Example - Rock",
    src: ""
  }, {
    type: "audio",
    title: "Full Production - Electronic",
    src: ""
  }]
}, {
  id: "produzioni",
  title: "Produzioni",
  icon: <Headphones className="w-6 h-6" />,
  description: "Dalla prima idea alla traccia completa. Mi occupo di tutto il processo produttivo: composizione, arrangiamento, scelta dei suoni e delle sonorità. Che tu sia un artista emergente con una melodia in testa o un professionista che cerca un sound specifico, ti accompagno in ogni fase della creazione musicale.",
  media: [{
    type: "audio",
    title: "Produzione Originale - Hip Hop",
    src: ""
  }, {
    type: "audio",
    title: "Arrangiamento Orchestrale",
    src: ""
  }]
}, {
  id: "branding",
  title: "Sound Branding",
  icon: <Radio className="w-6 h-6" />,
  description: "L'identità sonora del tuo brand è fondamentale quanto il logo. Creo jingle, sound logo, musiche di attesa e colonne sonore che rendono il tuo marchio immediatamente riconoscibile. Dal suono di notifica della tua app alla musica del tuo spot pubblicitario.",
  media: [{
    type: "audio",
    title: "Jingle Aziendale",
    src: ""
  }, {
    type: "audio",
    title: "Sound Logo",
    src: ""
  }, {
    type: "video",
    title: "Spot TV",
    src: ""
  }]
}, {
  id: "registrazioni",
  title: "Registrazioni in Studio",
  icon: <Mic className="w-6 h-6" />,
  description: "Sessioni di registrazione professionali in uno studio attrezzato con le migliori tecnologie. Che tu debba registrare voce, strumenti acustici o una band intera, offro un ambiente confortevole e tecnica di prim'ordine per catturare la tua performance al meglio.",
  media: [{
    type: "audio",
    title: "Session Voce",
    src: ""
  }, {
    type: "audio",
    title: "Recording Chitarra Acustica",
    src: ""
  }]
}, {
  id: "podcast",
  title: "Podcast",
  icon: <Podcast className="w-6 h-6" />,
  description: "Produzione completa per podcast: dalla registrazione all'editing, dal mix alla post-produzione. Elimino rumori di fondo, bilancio le voci, aggiungo intro/outro e musiche di sottofondo. Il risultato è un podcast dal suono professionale che tiene incollati gli ascoltatori.",
  media: [{
    type: "audio",
    title: "Podcast Example - Before",
    src: ""
  }, {
    type: "audio",
    title: "Podcast Example - After",
    src: ""
  }]
}];
const MediaPlayer = ({
  media
}: {
  media: {
    type: string;
    title: string;
  }[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const next = () => setCurrentIndex(prev => (prev + 1) % media.length);
  const prev = () => setCurrentIndex(prev => (prev - 1 + media.length) % media.length);
  return;
};
const ServiceCard = ({
  service
}: {
  service: Service;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return <motion.div layout className="service-card" initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.5
  }}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-left">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/20 text-primary">
            {service.icon}
          </div>
          <h3 className="text-xl font-semibold">{service.title}</h3>
        </div>
        <motion.div animate={{
        rotate: isOpen ? 180 : 0
      }} transition={{
        duration: 0.3
      }}>
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="overflow-hidden">
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {service.description}
            </p>
            <MediaPlayer media={service.media} />
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
};
const ServicesSection = () => {
  return <section id="servizi" className="section-container">
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
          <span className="text-gradient">Servizi</span>
        </h2>
        <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
          I servizi offerti sono destinati ad artisti, creator, aziende e attività. 
          Il mio obiettivo è concretizzare in modo professionale le idee del cliente, 
          dalla trasformazione di una demo in una canzone degna delle migliori radio, 
          alla creazione di un'identità sonora per brand e organizzazioni.
        </p>
        <p className="mt-4 text-muted-foreground text-lg">
          Mi occupo anche dei tipici lavori che "vanno fatti ma nessuno vuol mai fare" 
          come l'editing e l'intonazione delle voci, la pulizia da rumori di sottofondo 
          e la ristrutturazione di registrazioni che hanno visto giorni migliori.
        </p>
        <p className="mt-6 text-xl font-medium text-gradient">
          Portami la tua idea e diamole vita assieme!
        </p>
      </motion.div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {services.map(service => <ServiceCard key={service.id} service={service} />)}
      </div>
    </section>;
};
export default ServicesSection;