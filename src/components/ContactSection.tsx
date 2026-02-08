import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, Instagram, Facebook, Linkedin, Send, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/uyneng912vro753cdnkfhkvn985mh3zv";

const serviceOptions = [
  "Mixing & Mastering",
  "Produzioni Complete",
  "Sound Branding",
  "Registrazioni in Studio",
  "Podcast",
  "Altro",
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    cellulare: "",
    servizio: "",
    messaggio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to Make.com webhook
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          nome: formData.nome.trim(),
          cognome: formData.cognome.trim(),
          email: formData.email.trim(),
          cellulare: formData.cellulare.trim() || null,
          servizio: formData.servizio,
          messaggio: formData.messaggio.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Messaggio inviato con successo! Ti risponderò al più presto.");
      
      // Reset after animation
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ nome: "", cognome: "", email: "", cellulare: "", servizio: "", messaggio: "" });
      }, 3000);
    } catch (error) {
      console.error("Error sending form:", error);
      setIsSubmitting(false);
      toast.error("Errore nell'invio del messaggio. Riprova più tardi.");
    }
  };

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <TikTokIcon />, href: "#", label: "TikTok" },
  ];

  return (
    <section id="contatti" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-gradient">Contatti</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Hai un progetto in mente? Contattami e diamo vita alla tua idea!
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="glass-strong rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Contatti Rapidi</h3>
            
            <div className="space-y-4">
              <a
                href="mailto:paolomarchiori.audio@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">paolomarchiori.audio@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+39XXXXXXXXXX"
                className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cellulare</p>
                  <p className="font-medium">+39 XXX XXX XXXX</p>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-4">Seguimi sui social</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="glass-button p-3 rounded-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <span className="relative z-10">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Invia un Messaggio</h3>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label htmlFor="nome" className="block text-sm text-muted-foreground mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="input-glass w-full"
                  placeholder="Il tuo nome"
                />
              </div>
              <div className="relative">
                <label htmlFor="cognome" className="block text-sm text-muted-foreground mb-2">
                  Cognome *
                </label>
                <input
                  type="text"
                  id="cognome"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="input-glass w-full"
                  placeholder="Il tuo cognome"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="input-glass w-full"
                  placeholder="email@esempio.com"
                />
              </div>
              <div className="relative">
                <label htmlFor="cellulare" className="block text-sm text-muted-foreground mb-2">
                  Cellulare <span className="text-muted-foreground/50">(opzionale)</span>
                </label>
                <input
                  type="tel"
                  id="cellulare"
                  name="cellulare"
                  value={formData.cellulare}
                  onChange={handleChange}
                  maxLength={20}
                  className="input-glass w-full"
                  placeholder="+39 XXX XXX XXXX"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label htmlFor="servizio" className="block text-sm text-muted-foreground mb-2">
                Servizio *
              </label>
              <div className="relative">
                <select
                  id="servizio"
                  name="servizio"
                  value={formData.servizio}
                  onChange={handleChange}
                  required
                  className="input-glass w-full appearance-none cursor-pointer pr-10"
                >
                  <option value="" disabled>Seleziona un servizio</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option} className="bg-background text-foreground">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="mb-6 relative">
              <label htmlFor="messaggio" className="block text-sm text-muted-foreground mb-2">
                Messaggio *
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                required
                maxLength={2000}
                rows={5}
                className="input-glass w-full resize-none"
                placeholder="Raccontami del tuo progetto..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="w-full glass-button px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Inviato!
                  </>
                ) : isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Invia Messaggio
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
