import React, { useEffect, useRef } from 'react';
import { Camera, Upload, Smartphone, LucideIcon } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

const iconMap: Record<string, LucideIcon> = {
  Camera,
  Upload,
  Smartphone,
};

export const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, index * 150);
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
      id="how-it-works"
      ref={sectionRef}
      className="bg-background py-16 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div data-reveal className="reveal-element mb-4">
            <span className="text-accent text-sm font-semibold uppercase tracking-wide">
              {siteContent.howItWorks.overline}
            </span>
          </div>
          <h2
            data-reveal
            className="reveal-element text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            {siteContent.howItWorks.headline}
          </h2>
          <p
            data-reveal
            className="reveal-element text-lg text-text-muted max-w-2xl mx-auto"
          >
            {siteContent.howItWorks.subtext}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connecting Lines (desktop only) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-primary/20" />

          {siteContent.howItWorks.steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <div
                key={index}
                data-reveal
                className="reveal-element relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Step Number */}
                <div className="absolute top-6 right-6 text-5xl font-bold text-primary/5">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-primary mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
