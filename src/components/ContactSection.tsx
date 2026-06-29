import React, { useEffect, useRef } from 'react';
import { Mail, Phone, Instagram, Star } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

export const ContactSection: React.FC = () => {
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
      id="contact"
      ref={sectionRef}
      className="bg-background py-16 md:py-28"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Testimonial */}
        <div data-reveal className="reveal-element text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-primary mb-4 max-w-3xl mx-auto leading-relaxed">
            "{siteContent.testimonials[0].quote}"
          </blockquote>
          <cite className="not-italic text-text-muted">
            <div className="font-semibold text-primary">{siteContent.testimonials[0].author}</div>
            <div className="text-sm">{siteContent.testimonials[0].role}</div>
          </cite>
        </div>

        {/* Contact Info */}
        <div data-reveal className="reveal-element text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            {siteContent.contact.headline}
          </h2>
          <p className="text-lg text-text-muted mb-10">
            {siteContent.contact.subtext}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="flex items-center gap-3 text-primary hover:text-accent transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <span className="font-medium">{siteContent.contact.email}</span>
            </a>

            <a
              href={`tel:${siteContent.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-primary hover:text-accent transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <span className="font-medium">{siteContent.contact.phone}</span>
            </a>

            <a
              href={siteContent.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-primary hover:text-accent transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Instagram className="w-5 h-5 text-accent" />
              </div>
              <span className="font-medium">{siteContent.contact.instagram}</span>
            </a>
          </div>
        </div>

        {/* Instagram Preview */}
        <div data-reveal className="reveal-element">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Follow along on Instagram
            </h3>
            <p className="text-text-muted">
              Behind-the-scenes, recent work, and live event stories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteContent.contact.instagramPreview.map((image, index) => (
              <a
                key={index}
                href={siteContent.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Additional Testimonials */}
        <div data-reveal className="reveal-element mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteContent.testimonials.slice(1).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-primary mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <cite className="not-italic text-sm">
                <div className="font-semibold text-primary">{testimonial.author}</div>
                <div className="text-text-muted">{testimonial.role}</div>
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
