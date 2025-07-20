import React from 'react';

const Navigation = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  currentTime, 
  setShowBookingModal 
}) => {
  return (
    <nav id="navbar" className="fixed top-0 w-full z-50 transition-all duration-700 navbar">
      <div className="absolute inset-0 bg-black/0 backdrop-blur-0 transition-all duration-700"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <div className="relative">
              <div className="text-2xl font-thin tracking-[0.3em]">THE</div>
              <div className="text-2xl font-thin tracking-[0.3em]">GENTLEMAN'S</div>
              <div className="text-2xl font-thin tracking-[0.3em]">CLUB</div>
              <div className="absolute -bottom-2 left-0 w-full h-[0.5px] bg-white/50"></div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-12">
            <div className="flex items-center space-x-10">
              {['INICIO', 'SERVICIOS', 'MAESTROS', 'GALERÍA', 'CONTACTO'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative group"
                >
                  <span className="text-xs tracking-[0.2em] text-white/70 hover:text-white transition-all duration-500">{item}</span>
                  <span className="absolute -bottom-2 left-0 w-0 h-[0.5px] bg-white transition-all duration-500 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <div className="text-xs tracking-[0.2em] text-white/50">
              {currentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
            </div>
            
            <button 
              onClick={() => setShowBookingModal(true)}
              className="relative overflow-hidden group px-8 py-3 border border-white/20 hover:border-white/40 transition-all duration-500"
            >
              <span className="relative z-10 text-xs tracking-[0.2em]">RESERVAR</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <span className="absolute inset-0 flex items-center justify-center text-black text-xs tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                RESERVAR
              </span>
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-8 h-8 flex items-center justify-center"
          >
            <div className={`absolute w-6 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></div>
            <div className={`absolute w-6 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`absolute w-6 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></div>
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 bg-black/98 backdrop-blur-xl transform transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          {['INICIO', 'SERVICIOS', 'MAESTROS', 'GALERÍA', 'CONTACTO'].map((item, index) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-2xl tracking-[0.3em] text-white/70 hover:text-white transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
              style={{
                animation: isMenuOpen ? `fadeInUp 0.5s ease-out forwards` : '',
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => {setShowBookingModal(true); setIsMenuOpen(false);}}
            className="mt-8 px-12 py-4 border border-white/20 hover:border-white/40 text-lg tracking-[0.3em] transition-all duration-300"
            style={{
              animation: isMenuOpen ? `fadeInUp 0.5s ease-out forwards` : '',
              animationDelay: '0.5s',
              opacity: 0
            }}
          >
            RESERVAR
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;