import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const HeroSection = ({ scrollY, setShowBookingModal, heroRef }) => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center" ref={heroRef}>
      <div className="absolute inset-0">
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&h=1080&fit=crop" 
            alt="The Gentleman's Club"
            className="w-full h-full object-cover scale-110"
            style={{
              transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black"></div>
          
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="w-px h-20 bg-white/30 mx-auto mb-12 animate-expand-vertical"></div>
        
        <h1 className="mb-8">
          <div className="overflow-hidden">
            <div className="text-7xl md:text-9xl font-thin tracking-[0.2em] leading-none animate-slide-up">
              DONDE EL
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="text-7xl md:text-9xl font-thin tracking-[0.2em] leading-none mt-4 animate-slide-up animation-delay-200">
              ESTILO
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="text-3xl md:text-5xl font-thin tracking-[0.3em] text-white/70 mt-6 animate-slide-up animation-delay-400">
              TRASCIENDE EL TIEMPO
            </div>
          </div>
        </h1>
        
        <div className="flex items-center justify-center space-x-6 mb-16 animate-fade-in animation-delay-600">
          <div className="w-20 h-[0.5px] bg-white/30"></div>
          <p className="text-sm tracking-[0.3em] text-white/50">EST. 1995</p>
          <div className="w-20 h-[0.5px] bg-white/30"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animation-delay-800">
          <button 
            onClick={() => setShowBookingModal(true)}
            className="group relative overflow-hidden px-12 py-5 border border-white/30 hover:border-white transition-all duration-700"
          >
            <span className="relative z-10 text-sm tracking-[0.3em] flex items-center">
              RESERVAR EXPERIENCIA
              <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            <span className="absolute inset-0 flex items-center justify-center text-black text-sm tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              RESERVAR EXPERIENCIA
              <ArrowRight className="ml-3 w-4 h-4" />
            </span>
          </button>
          
          <a 
            href="#servicios"
            className="text-sm tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-500"
          >
            DESCUBRIR MÁS
          </a>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-6 h-6 text-white/30 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;