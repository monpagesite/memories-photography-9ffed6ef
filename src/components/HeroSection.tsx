import React, { useEffect, useRef } from 'react';
import { siteContent } from '../lib/siteContent';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-primary flex items-center pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Left Content - 60% */}
          <div className="md:col-span-3 space-y-8">
            <div data-reveal className="reveal-element">
              <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                {siteContent.hero.badge}
              </span>
            </div>

            <h1
              data-reveal
              className="reveal-element text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-light leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {siteContent.hero.headline}
            </h1>

            <p
              data-reveal
              className="reveal-element text-lg md:text-xl text-text-muted max-w-xl leading-relaxed"
            >
              {siteContent.hero.subtext}
            </p>

            <div data-reveal className="reveal-element flex flex-col sm:flex-row gap-4">
              <a
                href="#work"
                onClick={(e) => handleNavClick(e, '#work')}
                className="inline-flex items-center justify-center bg-accent text-primary px-8 py-4 rounded-full font-medium hover:bg-accent/90 transition-all duration-200"
              >
                {siteContent.hero.ctaPrimary}
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, '#services')}
                className="inline-flex items-center justify-center border-2 border-white/20 text-light px-8 py-4 rounded-full font-medium hover:border-white/40 transition-all duration-200"
              >
                {siteContent.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right Content - 40% */}
          <div data-reveal className="reveal-element md:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
              <img
                src={siteContent.hero.featuredImage.url}
                alt={siteContent.hero.featuredImage.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm text-light px-4 py-2 rounded-full text-sm font-medium">
                {siteContent.hero.featuredImage.badge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
