import { Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-bold">
              <span className="text-gradient">Paolo Marchiori</span>
            </h3>
            <p className="text-muted-foreground mt-2">Sound Engineer</p>
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
              href="tel:+39XXXXXXXXXX"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              +39 XXX XXX XXXX
            </a>
          </div>

          {/* Social */}
          <div className="flex justify-end gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
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
