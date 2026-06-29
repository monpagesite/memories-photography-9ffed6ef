import React, { useEffect, useRef, useState } from 'react';
import { Camera, Upload, Wifi, Clock } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

export const LiveGalleryDemo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedPhotos, setAnimatedPhotos] = useState<number[]>([]);

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

  // Simulate photos appearing one by one
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPhotos((prev) => {
        if (prev.length < siteContent.liveGalleryDemo.photos.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 800); // Add a photo every 800ms

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-green-500';
      case 'recent':
        return 'bg-accent';
      default:
        return 'bg-white/40';
    }
  };

  const getStatusPulse = (status: string) => {
    return status === 'new' ? 'animate-pulse' : '';
  };

  return (
    <section
      id="live-demo"
      ref={sectionRef}
      className="bg-primary py-16 md:py-28 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header with live indicator */}
        <div className="mb-12 text-center">
          <div data-reveal className="reveal-element inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            {siteContent.liveGalleryDemo.badge}
          </div>
          
          <h2
            data-reveal
            className="reveal-element text-4xl md:text-5xl lg:text-6xl font-bold text-light mb-4"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            {siteContent.liveGalleryDemo.headline}
          </h2>
          <p data-reveal className="reveal-element text-lg text-text-muted max-w-2xl mx-auto">
            {siteContent.liveGalleryDemo.subtext}
          </p>

          {/* Live stats bar */}
          <div data-reveal className="reveal-element mt-8 inline-flex items-center gap-6 bg-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4">
            <div className="flex items-center gap-2 text-accent">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium text-light">Shooting Live</span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="flex items-center gap-2 text-accent">
              <Upload className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium text-light">Auto-Uploading</span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="flex items-center gap-2 text-accent">
              <Wifi className="w-5 h-5" />
              <span className="text-sm font-medium text-light">Connected</span>
            </div>
          </div>
        </div>

        {/* Live Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {siteContent.liveGalleryDemo.photos.map((photo, index) => {
            const isVisible = animatedPhotos.includes(index);
            
            return (
              <div
                key={index}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  transitionDelay: isVisible ? '0ms' : `${index * 50}ms`
                }}
              >
                {/* Image */}
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay with upload info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  {/* Status indicator */}
                  <div className={`absolute top-3 right-3 ${getStatusColor(photo.status)} ${getStatusPulse(photo.status)} w-2 h-2 rounded-full`}></div>
                  
                  {/* Upload time */}
                  <div className="flex items-center gap-2 text-white/90">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-medium">{photo.uploadTime}</span>
                  </div>
                </div>

                {/* New photo badge */}
                {photo.status === 'new' && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold animate-pulse">
                    NEW
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info note */}
        <div data-reveal className="reveal-element mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent px-4 py-3 rounded-xl text-sm">
            <Upload className="w-4 h-4" />
            <span>
              This simulates how photos appear in real-time during your event — guests see them within minutes of capture
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
