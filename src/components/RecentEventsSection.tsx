import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

export const RecentEventsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, index * 80);
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

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === siteContent.gallery.events.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? siteContent.gallery.events.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="bg-secondary py-16 md:py-28"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-12">
            <h2
              data-reveal
              className="reveal-element text-4xl md:text-5xl lg:text-6xl font-bold text-light mb-4"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {siteContent.gallery.headline}
            </h2>
            <p data-reveal className="reveal-element text-lg text-text-muted">
              {siteContent.gallery.subtext}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteContent.gallery.events.map((event, index) => (
              <div
                key={index}
                data-reveal
                className="reveal-element group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={event.image}
                  alt={event.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="inline-block bg-accent text-primary px-3 py-1 rounded-full text-sm font-medium mb-2 w-fit">
                    {event.type}
                  </span>
                  <p className="text-light text-sm font-medium">{event.date}</p>
                  <p className="text-accent text-xs mt-1">
                    ● {event.photoCount} photos uploaded live
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-white hover:text-accent transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 p-2 text-white hover:text-accent transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 p-2 text-white hover:text-accent transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="max-w-5xl max-h-[80vh] px-16">
            <img
              src={siteContent.gallery.events[currentImageIndex].image}
              alt={siteContent.gallery.events[currentImageIndex].alt}
              className="w-full h-full object-contain"
            />
            <div className="text-center mt-6 text-white">
              <span className="inline-block bg-accent text-primary px-4 py-1 rounded-full text-sm font-medium mb-2">
                {siteContent.gallery.events[currentImageIndex].type}
              </span>
              <p className="text-sm">
                {siteContent.gallery.events[currentImageIndex].date}
              </p>
              <p className="text-xs text-accent mt-1">
                {currentImageIndex + 1} / {siteContent.gallery.events.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
