import React from 'react';
import { services } from '../data/constants';

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-24">
          <div className="flex items-center mb-6">
            <div className="w-12 h-[0.5px] bg-white/30"></div>
            <p className="text-xs tracking-[0.3em] text-white/50 mx-6">01</p>
            <div className="flex-1 h-[0.5px] bg-white/10"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-thin tracking-[0.1em]">SERVICIOS</h2>
          <p className="text-lg text-white/60 mt-4 max-w-2xl">
            Cada servicio es una sinfonía de precisión, dedicación y arte masculino
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="group relative"
              style={{
                animation: 'fadeInUp 0.8s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {service.popular && (
                <div className="absolute -top-4 -right-4 z-10">
                  <div className="bg-white text-black text-xs tracking-[0.2em] px-4 py-2">
                    POPULAR
                  </div>
                </div>
              )}
              
              <div className="relative h-full border border-white/10 p-8 transition-all duration-700 hover:border-white/30 bg-black/50 backdrop-blur-sm">
                <div className="relative h-48 mb-8 overflow-hidden">
                  <img 
                    src={service.icon} 
                    alt={service.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                </div>
                
                <h3 className="text-lg tracking-[0.2em] mb-2">{service.name}</h3>
                <p className="text-white/60 text-sm mb-6">{service.description}</p>
                
                <div className="flex items-baseline justify-between mb-6 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-3xl font-thin">${service.price}</span>
                    <span className="text-white/40 text-xs ml-2">USD</span>
                  </div>
                  <span className="text-xs tracking-[0.2em] text-white/50">{service.duration}</span>
                </div>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-white/50">
                      <div className="w-1 h-1 bg-white/50 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;