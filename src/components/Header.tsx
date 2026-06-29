import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className={`text-2xl font-bold transition-colors ${
                scrolled ? 'text-primary' : 'text-light'
              }`}
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {siteContent.brand.name}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    scrolled ? 'text-primary/70' : 'text-light/80'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, '#services')}
                className="bg-accent text-primary px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Book Now
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`md:hidden p-2 ${scrolled ? 'text-primary' : 'text-light'}`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-primary md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6">
              <span
                className="text-2xl font-bold text-light"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {siteContent.brand.name}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-light"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-3xl font-semibold text-light hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, '#services')}
                className="mt-8 bg-accent text-primary px-10 py-4 rounded-full text-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Book Now
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
