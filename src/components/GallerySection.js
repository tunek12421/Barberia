import React, { useState } from 'react';
import { galleryImages } from '../data/constants';

const GallerySection = () => {
  const [galleryFilter, setGalleryFilter] = useState('all');

  return (
    <section id="galería" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-24">
          <div className="flex items-center mb-6">
            <div className="w-12 h-[0.5px] bg-white/30"></div>
            <p className="text-xs tracking-[0.3em] text-white/50 mx-6">03</p>
            <div className="flex-1 h-[0.5px] bg-white/10"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-thin tracking-[0.1em]">PORTFOLIO</h2>
          <p className="text-lg text-white/60 mt-4 max-w-2xl">
            Una curación de nuestro trabajo más refinado
          </p>
        </div>
        
        <div className="flex flex-wrap gap-6 mb-16">
          {['all', 'corte', 'barba', 'vip', 'afeitado'].map((filter) => (
            <button
              key={filter}
              onClick={() => setGalleryFilter(filter)}
              className={`text-xs tracking-[0.2em] pb-2 border-b transition-all duration-500 ${
                galleryFilter === filter 
                  ? 'text-white border-white' 
                  : 'text-white/40 border-transparent hover:text-white/60'
              }`}
            >
              {filter === 'all' ? 'TODO' 
                : filter === 'corte' ? 'CORTES'
                : filter === 'barba' ? 'BARBAS'
                : filter === 'vip' ? 'VIP'
                : 'AFEITADOS'}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages
            .filter(img => galleryFilter === 'all' || img.category === galleryFilter)
            .map((item, idx) => (
              <div 
                key={idx} 
                className={`relative overflow-hidden group ${
                  item.featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                style={{
                  animation: 'fadeIn 0.8s ease-out forwards',
                  animationDelay: `${idx * 0.1}s`,
                  opacity: 0
                }}
              >
                <div className="relative h-full min-h-[300px] md:min-h-[400px]">
                  <img 
                    src={item.url} 
                    alt={item.description}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <h4 className="text-lg tracking-[0.2em] mb-2">{item.service}</h4>
                      <p className="text-sm text-white/60">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/20 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:border-white/40"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/20 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:border-white/40"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;