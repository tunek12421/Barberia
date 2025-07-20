import React from 'react';

const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-thin tracking-[0.3em] mb-2">THE GENTLEMAN'S CLUB</div>
            <p className="text-xs tracking-[0.2em] text-white/40">EST. 1995 • EXCELLENCE IN EVERY DETAIL</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-xs tracking-[0.2em] text-white/40">
              © 2025 THE GENTLEMAN'S CLUB. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;