import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/constants';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(testimonialInterval);
  }, []);

  return (
    <section className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="relative">
          <div className="absolute -top-20 -left-10 text-[200px] text-white/5 font-serif leading-none select-none">"</div>
          
          <div className="relative h-[400px] flex items-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === activeTestimonial 
                    ? 'opacity-100 transform translate-x-0' 
                    : index < activeTestimonial 
                    ? 'opacity-0 transform -translate-x-full' 
                    : 'opacity-0 transform translate-x-full'
                }`}
              >
                <div className="flex flex-col justify-center h-full">
                  <p className="text-2xl md:text-3xl font-thin leading-relaxed text-white/80 mb-12">
                    {testimonial.text}
                  </p>
                  
                  <div className="flex items-center space-x-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover grayscale"
                    />
                    <div>
                      <p className="text-lg tracking-[0.1em]">{testimonial.name}</p>
                      <p className="text-sm text-white/50">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`transition-all duration-500 ${
                  index === activeTestimonial 
                    ? 'w-12 h-[1px] bg-white' 
                    : 'w-4 h-[1px] bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;