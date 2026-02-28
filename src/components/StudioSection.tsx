import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const STUDIO_IMAGES = [
  "https://res.cloudinary.com/dr2vcd5so/image/upload/v1772286114/Studio1_uoecx9.png",
  "https://res.cloudinary.com/dr2vcd5so/image/upload/v1772286114/Studio2_xeqzv9.png",
  "https://res.cloudinary.com/dr2vcd5so/image/upload/v1772286114/Studio3_lmd9um.png",
  "https://res.cloudinary.com/dr2vcd5so/image/upload/v1772286115/Studio4_ufag1x.png",
];

const StudioSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [isGearListExpanded, setIsGearListExpanded] = useState(false);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section
      id="lo-studio"
      className="section-container w-full max-w-[100vw] overflow-x-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Lo Studio</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Testo a sinistra */}
            <div className="order-2 lg:order-1 space-y-4 text-muted-foreground leading-relaxed">
            <p>I servizi di mixing, mastering e le registrazioni in studio vengono svolti negli spazi di <span className="text-primary font-medium">L'n'R Productions</span>.</p>

            <p>
              La L'n'R nasce nel 2004 come <span className="text-primary font-medium">studio di registrazione, label
              indipendente e publishing</span> sotto la guida di <span className="text-primary font-medium">Luca Rustici</span> per dare
              spazio alla musica e ai progetti che in altro modo non sarebbero
              stati mai realizzati.
            </p>
            <p>
              I primi due studi furono realizzati a Cernusco sul Naviglio negli
              spazi dell'Alari Park per poi spostarsi nella sede attuale in un
              contesto totalmente autonomo.
            </p>
            <p>
              La L'n'R continua a lavorare con <span className="text-primary font-medium">Major e indipendenti
              </span> allargando
              le collaborazioni con video produzioni e spot pubblicitari.
            </p>
            <p>
              Lo Studio è stato progettato dall'architetto <span className="text-primary font-medium">Dario Paini</span> e
              costruito da <span className="text-primary font-medium">Claudio Nordio</span> della DEA e conserva all'interno tutto
              il Know How e il Gear Vintage accumulato da Luca in tutti i suoi
              anni di carriera.{" "}
              <br></br>
              <a
                href="https://www.lnrproductions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2 py-0.5 rounded-md font-semibold text-primary bg-primary/15 hover:bg-primary/25 transition-colors underline underline-offset-2"
              >
                Vai al sito L'n'R Productions
              </a>
            </p>
          </div>

            {/* Gallery a destra */}
            <div className="order-1 lg:order-2 relative w-full max-w-sm mx-auto lg:ml-auto">
              <Carousel
                setApi={setApi}
                opts={{ loop: true, align: "start" }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {STUDIO_IMAGES.map((src, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                        <img
                          src={src}
                          alt={`Lo studio L'n'R - foto ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                            target.alt = "Placeholder";
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:-left-10 h-9 w-9 rounded-full glass-strong border-white/20 hover:bg-white/10" />
                <CarouselNext className="right-2 md:-right-10 h-9 w-9 rounded-full glass-strong border-white/20 hover:bg-white/10" />
              </Carousel>
            </div>
          </div>

          <AnimatePresence>
            {isGearListExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full overflow-hidden"
              >
                <div className="pt-8 mt-6 border-t border-white/10">
                  <h3 className="text-2xl font-bold text-center text-primary mb-8 text-[1.35rem]">
                    Gear List
                  </h3>
                  {/* Due colonne sfalsate: la destra inizia più in basso, titoli non allineati */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 text-muted-foreground text-sm">
                    {/* Colonna sinistra - dall'alto */}
                    <div className="flex flex-col gap-y-6">
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">Studio Monitor</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>Genelec 8350A</li><li>Yamaha NS-10M</li><li>JVC Hi-Fi</li><li>Sonos</li></ul>
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">Pre Amplifiers</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>Crane Song Flamingo</li><li>2 x Art Tube Dual MP</li><li>Warm Audio WA273</li></ul>
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">Compressors</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>Urei 1178</li><li>DBX 166A</li><li>DBX 166XL</li><li>Drawmer DL251</li><li>SSL Bus Compressor G-Series</li><li>Warm Audio WA76</li></ul>
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">Guitar Amplifiers</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>Multiamp DVMark</li><li>Mesa Boogie Triaxis</li><li>Mesa Boogie Power Amp 90/90</li></ul>
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">Guitar Speakers</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>Mesa Boogie with Celestion speaker</li><li>DVMark</li><li>Marshall 1060 Vintage</li></ul>
                      </div>
                    </div>
                    {/* Colonna destra - allineata con la sinistra (stessa riga per i titoli) */}
                    <div className="flex flex-col gap-y-6">
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">Transient Designer</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>SPL</li></ul>
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">FXs</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>PCM 70</li><li>FX 900</li><li>Eventide H3000s upgraded</li><li>Line 6 Filter Pro</li></ul>
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">Converters</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>Apogee 800 full</li><li>Motu MK3 Traveller</li></ul>
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">MICs</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>Shure SM57</li><li>Shure Beta58</li><li>Shure SM7</li><li>Shure SM7B</li><li>Rode NT1</li><li>Neumann 104</li><li>Marshall</li><li>Sontronics STC-1</li><li>Meazzi Vintage Ribbon</li><li>Sanken CU44x</li></ul>
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">Controllers</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>Euphonix McController</li><li>TC Electronic Clarity M</li></ul>
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold mb-2">Keyboards</p>
                        <ul className="list-disc pl-4 space-y-0.5"><li>Fatar 88 Keys</li><li>Yamaha AN1X</li><li>Roland 1080 Expander</li><li>Roland D550</li><li>Yamaha TX802</li></ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottone: sopra quando chiuso, sotto il paragrafo Gear List quando aperto */}
          <div className="flex justify-center w-full mt-8">
            <motion.button
              onClick={() => setIsGearListExpanded(!isGearListExpanded)}
              className="flex items-center gap-2 glass-button px-6 py-3 rounded-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 font-medium text-primary text-base">
                {isGearListExpanded ? "Mostra meno" : "Gear List"}
              </span>
              <motion.div
                animate={{ rotate: isGearListExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <ChevronDown className="w-5 h-5 text-primary" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioSection;
