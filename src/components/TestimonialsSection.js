import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../data/constants';

const TestimonialsSection = () => {
  // Simple state management
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  return (
    <section style={{ padding: '80px 20px', background: '#1a1a1a', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ height: '1px', width: '50px', background: '#d4af37' }}></div>
            <span style={{ margin: '0 20px', color: '#d4af37', fontWeight: '600' }}>04</span>
            <div style={{ height: '1px', width: '100px', background: '#d4af37' }}></div>
          </div>
          
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '20px',
            letterSpacing: '2px'
          }}>
            TESTIMONIOS
          </h2>
          
          <p style={{ fontSize: '1.2rem', opacity: '0.8', maxWidth: '600px', margin: '0 auto' }}>
            La experiencia de nuestros clientes habla por sí sola
          </p>
        </div>

        {/* Decorative Quote */}
        <div style={{ fontSize: '8rem', opacity: '0.1', margin: '40px 0' }}>"</div>

        {/* Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
          <button
            onClick={prevSlide}
            style={{
              background: 'rgba(212, 175, 55, 0.2)',
              border: '1px solid #d4af37',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d4af37',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#d4af37';
              e.target.style.color = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(212, 175, 55, 0.2)';
              e.target.style.color = '#d4af37';
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            style={{
              background: 'rgba(212, 175, 55, 0.2)',
              border: '1px solid #d4af37',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d4af37',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#d4af37';
              e.target.style.color = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(212, 175, 55, 0.2)';
              e.target.style.color = '#d4af37';
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Current Testimonial */}
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          padding: '60px',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <blockquote style={{ 
            fontSize: '1.4rem',
            lineHeight: '1.8',
            marginBottom: '40px',
            fontStyle: 'italic',
            opacity: '0.95'
          }}>
            {testimonials[currentIndex].text}
          </blockquote>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <img 
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #d4af37'
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '5px' }}>
                {testimonials[currentIndex].name}
              </h4>
              <p style={{ opacity: '0.7', marginBottom: '10px' }}>
                {testimonials[currentIndex].role}
              </p>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < testimonials[currentIndex].rating ? '#d4af37' : 'none'}
                    color="#d4af37"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex ? '#d4af37' : 'rgba(212, 175, 55, 0.3)',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


export default TestimonialsSection;