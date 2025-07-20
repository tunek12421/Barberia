import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 border border-white/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border border-white/40 rounded-full animate-ping animation-delay-200"></div>
          <div className="absolute inset-0 border border-white/60 rounded-full animate-ping animation-delay-400"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-thin tracking-[0.3em] text-white mb-2">TGC</div>
              <div className="w-20 h-[1px] bg-white mx-auto"></div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-white/60 tracking-[0.2em] text-sm animate-pulse">PREPARANDO SU EXPERIENCIA</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;