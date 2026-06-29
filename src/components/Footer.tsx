import React from 'react';
import { Instagram, Facebook, Twitter, LucideIcon } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

const iconMap: Record<string, LucideIcon> = {
  Instagram,
  Facebook,
  Twitter,
};

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary py-12 md:py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <h2
              className="text-3xl font-bold text-light mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {siteContent.brand.name}
            </h2>
            <p className="text-text-muted leading-relaxed max-w-sm">
              {siteContent.footer.tagline}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-4">
            <h3 className="text-light font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-3">
              {siteContent.footer.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-text-muted hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Column */}
          <div className="md:col-span-3">
            <h3 className="text-light font-semibold mb-4">Follow</h3>
            <div className="flex gap-3">
              {siteContent.footer.socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                    aria-label={social.platform}
                  >
                    <Icon className="w-5 h-5 text-light group-hover:text-accent transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            {siteContent.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#privacy"
              className="text-text-muted hover:text-accent transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-text-muted hover:text-accent transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
