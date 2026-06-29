import React, { useEffect, useRef } from 'react';
import { siteContent } from '../lib/siteContent';

export const AboutSection: React.FC = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-primary py-16 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Story */}
          <div data-reveal className="reveal-element order-2 lg:order-1">
            <div className="mb-6">
              <h2
                className="text-4xl md:text-5xl font-bold text-light mb-3"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {siteContent.about.headline}
              </h2>
              <p className="text-accent text-xl font-medium">
                {siteContent.about.subheadline}
              </p>
            </div>

            <div className="space-y-5 mb-10">
              {siteContent.about.story.map((paragraph, index) => (
                <p key={index} className="text-text-muted leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {siteContent.about.stats.map((stat, index) => (
                <div key={index}>
                  <div
                    className="text-3xl md:text-4xl font-bold text-accent mb-1"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div data-reveal className="reveal-element order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
              <img
                src={siteContent.about.image.url}
                alt={siteContent.about.image.alt}
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
