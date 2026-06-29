import React, { useEffect, useRef, useState } from 'react';
import { Heart, Briefcase, PartyPopper, Camera, LucideIcon } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Briefcase,
  PartyPopper,
  Camera,
};

export const ServicesBookingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend API
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We\'ll respond within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      message: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-background py-16 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Services */}
          <div data-reveal className="reveal-element">
            <h2
              className="text-4xl md:text-5xl font-bold text-primary mb-8"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {siteContent.services.headline}
            </h2>

            <div className="space-y-8">
              {siteContent.services.list.map((service, index) => {
                const Icon = iconMap[service.icon];
                return (
                  <div
                    key={index}
                    className="group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-200">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-primary mb-2">
                          {service.title}
                        </h3>
                        <p className="text-text-muted mb-3 leading-relaxed">
                          {service.description}
                        </p>
                        <span className="text-accent font-medium text-sm">
                          {service.pricing}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div data-reveal className="reveal-element">
            <div className="bg-surface rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-6">
                {siteContent.booking.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    {siteContent.booking.fields.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-primary/20 rounded-xl px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    {siteContent.booking.fields.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-primary/20 rounded-xl px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    {siteContent.booking.fields.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-primary/20 rounded-xl px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="eventType"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      {siteContent.booking.fields.eventType}
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full border border-primary/20 rounded-xl px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      <option value="">Select type</option>
                      {siteContent.booking.eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="eventDate"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      {siteContent.booking.fields.eventDate}
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      className="w-full border border-primary/20 rounded-xl px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    {siteContent.booking.fields.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-primary/20 rounded-xl px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your vision, venue, expected guest count, and any specific requests..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-primary px-8 py-4 rounded-full font-medium hover:bg-accent/90 transition-all duration-200 hover:scale-[1.02]"
                >
                  {siteContent.booking.submitButton}
                </button>

                <p className="text-sm text-text-muted text-center">
                  {siteContent.booking.note}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
