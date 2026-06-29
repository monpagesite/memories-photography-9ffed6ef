import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LiveGalleryDemo } from './components/LiveGalleryDemo';
import { RecentEventsSection } from './components/RecentEventsSection';
import { ServicesBookingSection } from './components/ServicesBookingSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <LiveGalleryDemo />
        <RecentEventsSection />
        <ServicesBookingSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
