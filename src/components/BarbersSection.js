import React from 'react';
import { Award } from 'lucide-react';
import { barbers } from '../data/constants';

const BarbersSection = () => {
  return (
    <section id="maestros" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-24">
          <div className="flex items-center mb-6">
            <div className="w-12 h-[0.5px] bg-white/30"></div>
            <p className="text-xs tracking-[0.3em] text-white/50 mx-6">02</p>
            <div className="flex-1 h-[0.5px] bg-white/10"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-thin tracking-[0.1em]">MAESTROS</h2>
          <p className="text-lg text-white/60 mt-4 max-w-2xl">
            Artesanos que han dedicado su vida a perfeccionar el arte del grooming masculino
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {barbers.map((barber, index) => (
            <div 
              key={barber.id} 
              className="group relative"
              style={{
                animation: 'fadeInUp 0.8s ease-out forwards',
                animationDelay: `${index * 0.2}s`,
                opacity: 0
              }}
            >
              <div className="relative">
                <div className="relative h-[600px] overflow-hidden mb-8">
                  <img 
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-full object-cover object-top grayscale transition-all duration-1000 group-hover:grayscale-0"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                    <p className="text-white/80 italic text-sm">"{barber.quote}"</p>
                  </div>
                  
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-white/20 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top"></div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-thin tracking-[0.2em] mb-1">{barber.name}</h3>
                    <p className="text-sm tracking-[0.2em] text-white/40 mb-2">{barber.title}</p>
                    <p className="text-white/60 text-sm">{barber.specialty}</p>
                    <p className="text-white/40 text-xs mt-2">{barber.experience}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 py-4 border-y border-white/10">
                    {barber.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs tracking-[0.1em] text-white/30">
                        {skill}{idx < barber.skills.length - 1 && ' •'}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-white/30" />
                      <span className="text-xs text-white/50">{barber.awards[0]}</span>
                    </div>
                    <p className="text-xs text-white/40 tracking-[0.1em]">
                      DISPONIBLE: {barber.availability}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1 pt-4">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 h-3 ${i < Math.floor(barber.rating) ? 'bg-white/60' : 'bg-white/10'} transition-all duration-300`}
                      />
                    ))}
                    <span className="text-xs text-white/40 ml-3">{barber.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarbersSection;