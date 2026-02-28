import { Mail, Phone, Instagram, Linkedin } from "lucide-react";

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/paolomarchiori_audio/", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/paolo-marchiori-a99799202/", label: "LinkedIn" },
    { icon: <TikTokIcon />, href: "#", label: "TikTok" },
  ];

  return (
    <footer className="border-t border-border/50 w-full max-w-[100vw] overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full min-w-0 max-w-full">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-bold">
              <span className="text-gradient">Paolo Marchiori</span>
            </h3>
            <p className="text-muted-foreground mt-2">Producer & Sound Engineer</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="mailto:paolomarchiori.audio@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              paolomarchiori.audio@gmail.com
            </a>
            <a
              href="tel:+393515372933"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              +39 351 537 2933
            </a>
          </div>

          {/* Social */}
          <div className="flex justify-end gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Paolo Marchiori. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
