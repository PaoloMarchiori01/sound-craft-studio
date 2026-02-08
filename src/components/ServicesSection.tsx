import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Music, Mic, Radio, Headphones, Podcast, ChevronLeft, ChevronRight, Play, Pause, MoreHorizontal } from "lucide-react";

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  showPlayer: boolean;
  media: { type: "audio" | "video"; title: string; src: string; poster?: string }[];
}

const services: Service[] = [
  {
    id: "mixing",
    title: "Mixing & Mastering",
    icon: <Music className="w-6 h-6" />,
    description: "Il mixing è l'arte di bilanciare tutti gli elementi di una traccia - voci, strumenti, effetti - per creare un suono coeso e professionale. Il mastering è il tocco finale che ottimizza il brano per la distribuzione, garantendo che suoni perfetto su qualsiasi sistema di riproduzione. Questo processo trasforma una buona registrazione in un prodotto pronto per le radio e le piattaforme di streaming.",
    showPlayer: true,
    media: [
      { type: "audio", title: "Tall Heights - Spirit Cold", src: "https://res.cloudinary.com/dr2vcd5so/video/upload/v1770566267/Tall_Heights_-_Spirit_Cold_liknxl.mp3" },
      // Per un tuo MP3: metti il file in public/audio/ e usa src: "/audio/nome-file.mp3"
      { type: "audio", title: "Mastering Example - Rock", src: "" },
      { type: "audio", title: "Full Production - Electronic", src: "" },
    ],
  },
  {
    id: "produzioni",
    title: "Produzioni Complete",
    icon: <Headphones className="w-6 h-6" />,
    description: "Dalla prima idea alla traccia completa. Mi occupo di tutto il processo produttivo: composizione, arrangiamento, scelta dei suoni, organizzazione dei musicisti e delle sessioni in studio. Che tu sia un artista emergente con una melodia in testa o un professionista che cerca un sound specifico, ti accompagno in ogni fase della creazione musicale.",
    showPlayer: true,
    media: [
      { type: "audio", title: "Produzione Originale - Hip Hop", src: "" },
      { type: "audio", title: "Arrangiamento Orchestrale", src: "" },
    ],
  },
  {
    id: "branding",
    title: "Sound Branding",
    icon: <Radio className="w-6 h-6" />,
    description: "L'identità sonora del tuo brand è fondamentale quanto quella visiva. Creo jingle, sonorizzazioni per pubblicità e loghi sonori per rendere il tuo marchio riconoscibile.",
    showPlayer: true,
    media: [
      // Video: src = file .mp4 in public/video/. Anteprima: poster = immagine in public/video/ (es. poster: "/video/anteprima-balenciaga.jpg")
      { type: "video", title: "Bang & Olufsen X Balenciaga_Audio Re-Design_(Portfolio Purposes)", src: "https://res.cloudinary.com/dr2vcd5so/video/upload/v1770566564/Balenciaga_n5x42v.mp4", poster: "https://res.cloudinary.com/dr2vcd5so/image/upload/v1770566569/anteprima-balenciaga_sxanfo.png" },
      { type: "video", title: "Sound Logo", src: "", poster: "" },
      { type: "video", title: "Spot TV", src: "", poster: "" },
    ],
  },
  {
    id: "registrazioni",
    title: "Registrazioni in Studio",
    icon: <Mic className="w-6 h-6" />,
    description: "Grazie alla partnership con L’n’R Production, offro registrazioni vocali di altissima qualità, in uno studio di alto livello acustico, progettato secondo la tecnologia L.E.D.E. ed equipaggiato con le migliori macchine da studio. Vieni a registrare nello stesso vocal booth che hanno utilizzato i nomi più iconici della musica italiana!",
    showPlayer: false,
    media: [],
  },
  {
    id: "podcast",
    title: "Podcast",
    icon: <Podcast className="w-6 h-6" />,
    description: "Produzione completa per podcast: dalla registrazione - in studio o a domicilio - all'editing, fino a mix e mastering finale. Elimino rumori di fondo, bilancio le voci, aggiungo intro/outro e musiche di sottofondo. Il risultato è un podcast dal suono professionale che tiene incollati gli ascoltatori.",
    showPlayer: false,
    media: [],
  },
  {
    id: "altro",
    title: "Altro",
    icon: <MoreHorizontal className="w-6 h-6" />,
    description: "• Ristrutturazione Audio: Recupero e miglioramento di registrazioni danneggiate, vecchie o di bassa qualità.\n\n• Editing Audio: Pulizia da rumori di fondo, quantizzazione e intonazione delle voci.\n\n• Audiolibri: Produzione completa per audiolibri, dalla registrazione alla post-produzione, con qualità broadcast.\n\n• Fonico Live: Servizio di fonica per eventi dal vivo, concerti e manifestazioni, garantendo un suono perfetto per ogni occasione.",
    showPlayer: false,
    media: [],
  },
];

const MediaPlayer = ({ media }: { media: { type: string; title: string; src: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentMedia = media[currentIndex];
  const hasAudioSrc = currentMedia.src && currentMedia.src.length > 0;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setIsPlaying(false);
    setProgress(0);
  };
  
  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = () => {
    if (!audioRef.current || !hasAudioSrc) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || !hasAudioSrc) return;
    const dur = audioRef.current.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    audioRef.current.currentTime = percent * dur;
    setProgress(percent * 100);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
  }, [currentIndex]);

  return (
    <div className="audio-player-glass mt-4">
      {hasAudioSrc && (
        <audio
          ref={audioRef}
          src={currentMedia.src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {media.length}
        </span>
        <span className="text-sm font-medium text-foreground">
          {media[currentIndex].title}
        </span>
      </div>
      
      {/* Waveform visualization */}
      <div className="flex items-center justify-center gap-1 h-16 mb-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-primary rounded-full"
            animate={{
              height: isPlaying ? `${Math.random() * 100}%` : "20%",
            }}
            transition={{
              duration: 0.15,
              repeat: isPlaying ? Infinity : 0,
              repeatType: "reverse",
            }}
            style={{ minHeight: "8px", maxHeight: "100%" }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={prev}
          className="p-2 rounded-full transition-all duration-300 hover:bg-primary/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={togglePlay}
          className={`glass-button p-4 rounded-full ${!hasAudioSrc ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!hasAudioSrc}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </button>
        
        <button
          onClick={next}
          className="p-2 rounded-full transition-all duration-300 hover:bg-primary/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar (cliccabile per cercare) */}
      <div
        ref={progressBarRef}
        role="slider"
        aria-label="Posizione nella traccia"
        tabIndex={0}
        onClick={handleProgressClick}
        className="mt-4 h-2 bg-muted rounded-full overflow-hidden cursor-pointer"
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const VideoPlayer = ({ media }: { media: { type: string; title: string; src: string; poster?: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentMedia = media[currentIndex];
  const hasVideoSrc = currentMedia.src && currentMedia.src.length > 0;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = () => {
    if (!videoRef.current || !hasVideoSrc) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress(total > 0 ? (current / total) * 100 : 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current || !hasVideoSrc) return;
    const dur = videoRef.current.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    videoRef.current.currentTime = percent * dur;
    setProgress(percent * 100);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
  }, [currentIndex]);

  return (
    <div className="audio-player-glass mt-4">
      {hasVideoSrc && (
        <video
          ref={videoRef}
          src={currentMedia.src}
          poster={currentMedia.poster || undefined}
          className="w-full aspect-video rounded-xl object-cover mb-4 bg-muted"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onClick={togglePlay}
          playsInline
        />
      )}

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {media.length}
        </span>
        <span className="text-sm font-medium text-foreground">
          {media[currentIndex].title}
        </span>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={prev}
          className="p-2 rounded-full transition-all duration-300 hover:bg-primary/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={togglePlay}
          className={`glass-button p-4 rounded-full ${!hasVideoSrc ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!hasVideoSrc}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full transition-all duration-300 hover:bg-primary/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar (cliccabile per cercare) */}
      <div
        ref={progressBarRef}
        role="slider"
        aria-label="Posizione nel video"
        tabIndex={0}
        onClick={handleProgressClick}
        className="mt-4 h-2 bg-muted rounded-full overflow-hidden cursor-pointer"
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const ServiceCard = ({ service }: { service: Service }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/20 text-primary">
            {service.icon}
          </div>
          <h3 className="text-xl font-semibold">{service.title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">
              {service.description}
            </p>
            {service.showPlayer && service.media.length > 0 && (
              service.id === "branding" ? (
                <VideoPlayer media={service.media} />
              ) : (
                <MediaPlayer media={service.media} />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="servizi" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
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
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
