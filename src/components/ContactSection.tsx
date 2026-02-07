import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, Instagram, Facebook, Linkedin, Send, Check } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    cellulare: "",
    messaggio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Messaggio inviato con successo! Ti risponderò al più presto.");
    
    // Reset after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ nome: "", cognome: "", email: "", cellulare: "", messaggio: "" });
    }, 3000);
  };

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
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
              <div>
                <label htmlFor="nome" className="block text-sm text-muted-foreground mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="input-glass"
                  placeholder="Il tuo nome"
                />
              </div>
              <div>
                <label htmlFor="cognome" className="block text-sm text-muted-foreground mb-2">
                  Cognome
                </label>
                <input
                  type="text"
                  id="cognome"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  required
                  className="input-glass"
                  placeholder="Il tuo cognome"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-glass"
                  placeholder="email@esempio.com"
                />
              </div>
              <div>
                <label htmlFor="cellulare" className="block text-sm text-muted-foreground mb-2">
                  Cellulare
                </label>
                <input
                  type="tel"
                  id="cellulare"
                  name="cellulare"
                  value={formData.cellulare}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="+39 XXX XXX XXXX"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="messaggio" className="block text-sm text-muted-foreground mb-2">
                Messaggio
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                required
                rows={5}
                className="input-glass resize-none"
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
