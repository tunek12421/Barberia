import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';

const ContactSection = ({ setShowBookingModal }) => {
  return (
    <section id="contacto" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-24">
          <div className="flex items-center mb-6">
            <div className="w-12 h-[0.5px] bg-white/30"></div>
            <p className="text-xs tracking-[0.3em] text-white/50 mx-6">04</p>
            <div className="flex-1 h-[0.5px] bg-white/10"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-thin tracking-[0.1em]">CONTACTO</h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-sm tracking-[0.3em] text-white/40 mb-8">UBICACIÓN</h3>
              <p className="text-2xl font-thin leading-relaxed">
                Av. Principal 1234<br />
                Zona Premium, Torre Ejecutiva<br />
                Ciudad, CP 12345
              </p>
            </div>
            
            <div>
              <h3 className="text-sm tracking-[0.3em] text-white/40 mb-8">HORARIO</h3>
              <div className="space-y-2 text-lg font-thin">
                <p>Lunes — Viernes: 09:00 — 20:00</p>
                <p>Sábado: 09:00 — 19:00</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm tracking-[0.3em] text-white/40 mb-8">CONTACTO DIRECTO</h3>
              <div className="space-y-4 text-lg font-thin">
                <p>+1 (555) 123-4567</p>
                <p>reservas@gentlemansclub.com</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowBookingModal(true)}
              className="group relative overflow-hidden px-12 py-5 border border-white/30 hover:border-white transition-all duration-700 inline-flex items-center"
            >
              <span className="relative z-10 text-sm tracking-[0.3em]">
                AGENDAR EXPERIENCIA
              </span>
              <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              <span className="absolute inset-0 flex items-center justify-center text-black text-sm tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                AGENDAR EXPERIENCIA
                <ArrowRight className="ml-3 w-4 h-4" />
              </span>
            </button>
          </div>
          
          <div className="relative h-[600px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?q=80&w=800&h=600&fit=crop" 
              alt="The Gentleman's Club Interior"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm border border-white/10 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs tracking-[0.2em] text-white/40 mb-2">EXPERIENCIA PREMIUM</p>
                  <p className="text-lg">Desde 1995</p>
                </div>
                <Shield className="w-8 h-8 text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;