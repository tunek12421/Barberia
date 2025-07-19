import React, { useState, useEffect, useRef } from 'react';
import { Clock, Phone, Mail, MapPin, Star, Check, Menu, X, Award, Shield, Sparkles, Crown } from 'lucide-react';

const BarberiaUltraPremium = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const services = [
    { 
      id: 1, 
      name: 'Corte Clásico', 
      price: '$45', 
      duration: '30 min', 
      description: 'Corte tradicional con acabado perfecto',
      icon: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=100&h=100&fit=crop&q=80',
      features: ['Consulta personalizada', 'Lavado premium', 'Styling final']
    },
    { 
      id: 2, 
      name: 'Corte & Barba', 
      price: '$65', 
      duration: '45 min', 
      description: 'Servicio completo de corte y arreglo de barba',
      icon: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=100&h=100&fit=crop&q=80',
      features: ['Corte de precisión', 'Diseño de barba', 'Aceites esenciales']
    },
    { 
      id: 3, 
      name: 'Experiencia VIP', 
      price: '$120', 
      duration: '90 min', 
      description: 'Corte, barba, facial y masaje',
      icon: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop&q=80',
      features: ['Servicio completo', 'Tratamiento facial', 'Masaje relajante', 'Bebida premium']
    },
    { 
      id: 4, 
      name: 'Afeitado Clásico', 
      price: '$40', 
      duration: '30 min', 
      description: 'Afeitado tradicional con navaja',
      icon: 'https://images.unsplash.com/photo-1553521041-d168abd31de3?w=100&h=100&fit=crop&q=80',
      features: ['Toalla caliente', 'Navaja tradicional', 'After-shave premium']
    }
  ];

  const barbers = [
    { 
      id: 1, 
      name: 'Alessandro Romano', 
      specialty: 'Master Barber', 
      experience: '15 años', 
      rating: 5,
      awards: ['Best Barber 2023', 'Master Craftsman'],
      skills: ['Fade Expert', 'Beard Sculptor', 'Classic Cuts']
    },
    { 
      id: 2, 
      name: 'Marcus Sterling', 
      specialty: 'Especialista en Barba', 
      experience: '10 años', 
      rating: 5,
      awards: ['Beard Champion 2022'],
      skills: ['Beard Design', 'Hot Towel Expert', 'Precision Trimming']
    },
    { 
      id: 3, 
      name: 'Viktor Noir', 
      specialty: 'Estilista Senior', 
      experience: '12 años', 
      rating: 4.9,
      awards: ['Innovation Award 2023'],
      skills: ['Modern Styles', 'Color Expert', 'Texture Specialist']
    }
  ];

  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "CEO Tech Startup",
      text: "La mejor experiencia de barbería que he tenido. El ambiente, el servicio y la atención al detalle son incomparables.",
      rating: 5
    },
    {
      name: "Roberto García",
      role: "Abogado Senior",
      text: "Llevo 5 años siendo cliente. No es solo un corte de pelo, es una experiencia de lujo completa.",
      rating: 5
    },
    {
      name: "Miguel Ángel Torres",
      role: "Director Creativo",
      text: "El nivel de profesionalismo y la calidad del servicio superan cualquier expectativa. Altamente recomendado.",
      rating: 5
    }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  const galleryImages = [
    { 
      url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&h=400&fit=crop',
      category: 'corte',
      service: 'Corte Clásico',
      description: 'Estilo ejecutivo moderno',
      featured: true
    },
    { 
      url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600&h=400&fit=crop',
      category: 'corte',
      service: 'Corte Clásico',
      description: 'Corte fade profesional'
    },
    { 
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&h=400&fit=crop',
      category: 'barba',
      service: 'Corte & Barba',
      description: 'Servicio completo premium',
      featured: true
    },
    { 
      url: 'https://images.unsplash.com/photo-1582771498000-8ad44e6c84db?q=80&w=600&h=400&fit=crop',
      category: 'vip',
      service: 'Experiencia VIP',
      description: 'Tratamiento completo de lujo',
      featured: true
    },
    { 
      url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&h=400&fit=crop',
      category: 'afeitado',
      service: 'Afeitado Clásico',
      description: 'Afeitado con navaja tradicional'
    },
    { 
      url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=600&h=400&fit=crop',
      category: 'corte',
      service: 'Corte Clásico',
      description: 'Estilo vintage renovado'
    },
    { 
      url: 'https://images.unsplash.com/photo-1516914589923-f105f1535f88?q=80&w=600&h=400&fit=crop',
      category: 'barba',
      service: 'Corte & Barba',
      description: 'Perfilado de barba artístico'
    },
    { 
      url: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?q=80&w=600&h=400&fit=crop',
      category: 'vip',
      service: 'Experiencia VIP',
      description: 'Masaje y cuidado facial'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);

    // Handle scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('backdrop-blur-xl', 'bg-black/80', 'border-b', 'border-white/10');
      } else {
        navbar.classList.remove('backdrop-blur-xl', 'bg-black/80', 'border-b', 'border-white/10');
      }
    };

    // Handle mouse move for parallax
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(testimonialInterval);
    };
  }, []);

  const handleBooking = () => {
    if (bookingStep === 3 && formData.name && formData.email && formData.phone) {
      alert(`¡Reserva confirmada para ${formData.name}! Le enviaremos un email de confirmación a ${formData.email}`);
      setShowBookingModal(false);
      resetBooking();
    }
  };

  const resetBooking = () => {
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedBarber('');
    setBookingStep(1);
    setFormData({ name: '', email: '', phone: '' });
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-gray-600/30 rounded-full animate-spin"></div>
            <div className="w-32 h-32 border-4 border-white rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold mt-8 text-white animate-pulse">THE GENTLEMAN'S CLUB</h2>
          <p className="text-gray-400 mt-2">Preparando tu experiencia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-300/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav id="navbar" className="fixed top-0 w-full z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1578953403055-090f93bbee58?w=50&h=50&fit=crop&q=80" 
                  alt="Logo" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                THE GENTLEMAN'S CLUB
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Inicio', 'Servicios', 'Barberos', 'Galería', 'Contacto'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative group"
                >
                  <span className="hover:text-white transition-colors text-gray-300">{item}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <button 
                onClick={() => setShowBookingModal(true)}
                className="relative bg-gradient-to-r from-white to-gray-200 text-black px-8 py-3 font-bold overflow-hidden group"
              >
                <span className="relative z-10">Reservar Cita</span>
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Reservar Cita
                </span>
              </button>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 transform transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="px-4 py-6 space-y-4">
            {['Inicio', 'Servicios', 'Barberos', 'Galería', 'Contacto'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="block py-2 text-lg hover:text-white transition-colors text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => {setShowBookingModal(true); setIsMenuOpen(false);}}
              className="w-full bg-gradient-to-r from-white to-gray-200 text-black py-3 font-bold"
            >
              Reservar Cita
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center" ref={heroRef}>
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&h=1080&fit=crop" 
              alt="Barbería Premium"
              className="w-full h-full object-cover"
              style={{
                transform: `translateY(${scrollY * 0.5}px)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
            
            {/* Animated overlay pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 35px,
                  rgba(255, 255, 255, 0.1) 35px,
                  rgba(255, 255, 255, 0.1) 70px
                )`,
                animation: 'slide 20s linear infinite'
              }}></div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-6 animate-fade-in-down">
            <img 
              src="https://images.unsplash.com/photo-1562259920-47afc3030ba2?w=100&h=100&fit=crop&q=80" 
              alt="Premium Badge" 
              className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-white/20"
            />
          </div>
          
          <h2 className="text-6xl md:text-8xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              DONDE EL ESTILO
            </span>
            <span className="block bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
              SE ENCUENTRA CON LA TRADICIÓN
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 animate-fade-in-up max-w-2xl mx-auto">
            Experiencia de barbería de lujo que trasciende el tiempo. 
            <span className="text-white font-semibold"> Desde 1995</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
            <button 
              onClick={() => setShowBookingModal(true)}
              className="group relative px-12 py-5 bg-gradient-to-r from-white to-gray-200 text-black font-bold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Reservar Ahora
                <img 
                  src="https://images.unsplash.com/photo-1562259920-47afc3030ba2?w=20&h=20&fit=crop&q=80" 
                  alt="Arrow" 
                  className="ml-2 w-5 h-5 rounded-full group-hover:rotate-12 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
            
            <a 
              href="#servicios"
              className="group px-12 py-5 border-2 border-white/30 text-white font-bold text-lg relative overflow-hidden transition-all duration-300 hover:border-white"
            >
              <span className="relative z-10">Ver Servicios</span>
              <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full relative">
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Servicios Premium
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Cada servicio es una experiencia diseñada para superar expectativas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="group relative bg-gradient-to-b from-zinc-900/50 to-black border border-white/10 p-8 overflow-hidden transition-all duration-500 hover:border-white/30 hover:transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Service Icon */}
                <div className="w-20 h-20 mb-6 overflow-hidden rounded-full transform group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={service.icon} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors text-gray-200">
                  {service.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-white">{service.price}</span>
                  <span className="text-gray-500">/ {service.duration}</span>
                </div>
                
                <p className="text-gray-400 mb-6">{service.description}</p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <Check className="w-4 h-4 text-white mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white to-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Section */}
      <section id="barberos" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/30 to-black"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-gray-300/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Maestros del Arte
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Artesanos dedicados a perfeccionar cada detalle
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {barbers.map((barber, index) => (
              <div 
                key={barber.id} 
                className="group relative"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="relative overflow-hidden mb-8">
                  {/* Image container with effects */}
                  <div className="relative h-[500px] overflow-hidden">
                    <img 
                      src={barber.id === 1 
                        ? 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=600&h=600&fit=crop' 
                        : barber.id === 2 
                        ? 'https://images.unsplash.com/photo-1542327897-d73f4005b533?q=80&w=600&h=600&fit=crop' 
                        : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&h=600&fit=crop'}
                      alt={barber.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    
                    {/* Skills overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex flex-wrap gap-2">
                        {barber.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm border border-white/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Frame decoration */}
                  <div className="absolute inset-0 border-2 border-white/10 transform scale-95 group-hover:scale-100 transition-transform duration-500"></div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-white transition-colors text-gray-200">
                    {barber.name}
                  </h3>
                  <p className="text-gray-300 text-lg mb-3">{barber.specialty}</p>
                  <p className="text-gray-500 mb-4">{barber.experience} de experiencia</p>
                  
                  {/* Awards */}
                  <div className="flex justify-center gap-3 mb-4">
                    {barber.awards.map((award, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-gray-300" />
                        <span className="text-xs text-gray-400">{award}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-center items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={`${i < Math.floor(barber.rating) ? 'fill-white text-white' : 'text-gray-600'} transition-all duration-300 group-hover:scale-110`}
                        style={{
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                    <span className="ml-2 text-gray-400 font-semibold">{barber.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black via-zinc-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Testimonios
              </span>
            </h2>
          </div>
          
          <div className="relative h-64">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activeTestimonial 
                    ? 'opacity-100 transform translate-x-0' 
                    : index < activeTestimonial 
                    ? 'opacity-0 transform -translate-x-full' 
                    : 'opacity-0 transform translate-x-full'
                }`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 italic mb-6">
                    "{testimonial.text}"
                  </p>
                  <p className="text-white font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'w-8 bg-white' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Una muestra de nuestra dedicación a la excelencia
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['all', 'corte', 'barba', 'vip', 'afeitado'].map((filter) => (
              <button
                key={filter}
                onClick={() => setGalleryFilter(filter)}
                className={`px-8 py-3 border-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
                  galleryFilter === filter 
                    ? 'bg-gradient-to-r from-white to-gray-200 text-black border-transparent' 
                    : 'border-gray-600 hover:border-white text-gray-300 hover:text-white'
                }`}
              >
                {filter === 'all' ? 'Todos' 
                  : filter === 'corte' ? 'Corte Clásico'
                  : filter === 'barba' ? 'Corte & Barba'
                  : filter === 'vip' ? 'Experiencia VIP'
                  : 'Afeitado Clásico'}
              </button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages
              .filter(img => galleryFilter === 'all' || img.category === galleryFilter)
              .map((item, idx) => (
                <div 
                  key={idx} 
                  className={`relative overflow-hidden group ${
                    item.featured ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  style={{
                    animation: 'fadeIn 0.6s ease-out forwards',
                    animationDelay: `${idx * 0.1}s`,
                    opacity: 0
                  }}
                >
                  <div className="relative h-full">
                    <img 
                      src={item.url} 
                      alt={item.description}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-all duration-500"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="text-white font-bold text-lg mb-1">{item.service}</h4>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/20 transform rotate-45 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-zinc-900"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-12">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Visítanos
                </span>
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    title: 'Dirección',
                    content: ['Av. Principal 1234, Zona Premium', 'Ciudad, CP 12345'],
                    image: 'https://images.unsplash.com/photo-1528905895600-30137e04d936?w=50&h=50&fit=crop&q=80'
                  },
                  {
                    icon: Clock,
                    title: 'Horario',
                    content: ['Lunes - Viernes: 9:00 - 20:00', 'Sábado: 9:00 - 19:00', 'Domingo: Cerrado'],
                    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=50&h=50&fit=crop&q=80'
                  },
                  {
                    icon: Phone,
                    title: 'Teléfono',
                    content: ['+1 (555) 123-4567'],
                    image: 'https://images.unsplash.com/photo-1596742578443-7682ef5251cd?w=50&h=50&fit=crop&q=80'
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    content: ['info@gentlemansclub.com'],
                    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=50&h=50&fit=crop&q=80'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start group"
                    style={{
                      animation: 'fadeInLeft 0.6s ease-out forwards',
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0
                    }}
                  >
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 mr-6 transform group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-6 h-6 object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-white">{item.title}</h3>
                      {item.content.map((line, idx) => (
                        <p key={idx} className="text-gray-400">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="mt-12">
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="group relative px-10 py-4 bg-gradient-to-r from-white to-gray-200 text-black font-bold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">Agenda tu Experiencia</span>
                  <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Agenda tu Experiencia
                  </span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?q=80&w=800&h=600&fit=crop" 
                  alt="Interior barbería"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Floating badge */}
                <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-sm border border-white/20 px-6 py-4">
                  <img 
                    src="https://images.unsplash.com/photo-1562259920-47afc3030ba2?w=50&h=50&fit=crop&q=80" 
                    alt="Premium Badge" 
                    className="w-8 h-8 mx-auto mb-2 rounded-full object-cover"
                  />
                  <p className="text-white font-bold">Premium</p>
                  <p className="text-gray-400 text-sm">Since 1995</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-zinc-900 to-black border border-white/10 w-full max-w-2xl p-8 relative transform animate-modal-enter">
            <button 
              onClick={() => {setShowBookingModal(false); resetBooking();}}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>
            
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Reservar Experiencia
            </h2>
            
            {/* Progress Bar */}
            <div className="flex mb-10">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex-1 mx-1">
                  <div className={`h-1 transition-all duration-500 ${bookingStep >= step ? 'bg-gradient-to-r from-white to-gray-300' : 'bg-gray-700'}`}></div>
                  <div className={`mt-2 text-center text-sm transition-colors duration-300 ${bookingStep >= step ? 'text-white' : 'text-gray-600'}`}>
                    {step === 1 ? 'Servicio' : step === 2 ? 'Fecha' : 'Confirmar'}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Step 1: Select Service & Barber */}
            {bookingStep === 1 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl mb-6 text-white">Selecciona tu experiencia</h3>
                
                <div className="mb-8">
                  <label className="block text-gray-400 mb-3 text-sm uppercase tracking-wider">Servicio</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map(service => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 border-2 text-left transition-all duration-300 ${
                          selectedService === service.id 
                            ? 'border-white bg-white/10' 
                            : 'border-gray-700 hover:border-white/50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg">{service.name}</h4>
                          <span className="text-white font-bold">{service.price}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{service.duration} - {service.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-400 mb-3 text-sm uppercase tracking-wider">Barbero</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {barbers.map(barber => (
                      <button
                        key={barber.id}
                        onClick={() => setSelectedBarber(barber.id)}
                        className={`p-4 border-2 text-center transition-all duration-300 ${
                          selectedBarber === barber.id 
                            ? 'border-white bg-white/10' 
                            : 'border-gray-700 hover:border-white/50'
                        }`}
                      >
                        <h4 className="font-bold">{barber.name}</h4>
                        <p className="text-gray-300 text-sm">{barber.specialty}</p>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={`${i < Math.floor(barber.rating) ? 'fill-white text-white' : 'text-gray-600'}`} />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => setBookingStep(2)}
                  disabled={!selectedService || !selectedBarber}
                  className="w-full bg-gradient-to-r from-white to-gray-200 text-black py-4 font-bold text-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Continuar
                </button>
              </div>
            )}
            
            {/* Step 2: Select Date & Time */}
            {bookingStep === 2 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl mb-6 text-white">Selecciona fecha y hora</h3>
                
                <div className="mb-8">
                  <label className="block text-gray-400 mb-3 text-sm uppercase tracking-wider">Fecha</label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-black/50 border-2 border-gray-700 p-4 focus:border-white outline-none transition-colors duration-300 text-white"
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-400 mb-4 text-sm uppercase tracking-wider">Hora disponible</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
                          selectedTime === time 
                            ? 'bg-gradient-to-r from-white to-gray-200 text-black border-transparent' 
                            : 'border-gray-700 hover:border-white/50 text-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setBookingStep(1)}
                    className="flex-1 border-2 border-gray-700 py-4 hover:border-white/50 transition-colors duration-300"
                  >
                    Anterior
                  </button>
                  <button 
                    onClick={() => setBookingStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-gradient-to-r from-white to-gray-200 text-black py-4 font-bold text-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Contact Information */}
            {bookingStep === 3 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl mb-6 text-white">Información de contacto</h3>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm uppercase tracking-wider">Nombre completo</label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/50 border-2 border-gray-700 p-4 focus:border-white outline-none transition-colors duration-300 text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm uppercase tracking-wider">Email</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/50 border-2 border-gray-700 p-4 focus:border-white outline-none transition-colors duration-300 text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm uppercase tracking-wider">Teléfono</label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black/50 border-2 border-gray-700 p-4 focus:border-white outline-none transition-colors duration-300 text-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                {/* Booking Summary */}
                <div className="bg-gradient-to-br from-gray-900/50 to-black border border-white/20 p-6 mb-8">
                  <h4 className="font-bold text-white mb-4 text-lg">Resumen de tu experiencia</h4>
                  <div className="space-y-2 text-gray-300">
                    <p>
                      <span className="text-gray-500">Servicio:</span> {services.find(s => s.id === selectedService)?.name}
                    </p>
                    <p>
                      <span className="text-gray-500">Barbero:</span> {barbers.find(b => b.id === selectedBarber)?.name}
                    </p>
                    <p>
                      <span className="text-gray-500">Fecha:</span> {new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p>
                      <span className="text-gray-500">Hora:</span> {selectedTime}
                    </p>
                    <p className="text-white font-bold text-xl pt-2">
                      Total: {services.find(s => s.id === selectedService)?.price}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setBookingStep(2)}
                    className="flex-1 border-2 border-gray-700 py-4 hover:border-white/50 transition-colors duration-300"
                  >
                    Anterior
                  </button>
                  <button 
                    onClick={handleBooking}
                    disabled={!formData.name || !formData.email || !formData.phone}
                    className="flex-1 bg-gradient-to-r from-white to-gray-200 text-black py-4 font-bold text-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center group"
                  >
                    <Check size={24} className="mr-2 group-hover:scale-110 transition-transform" />
                    Confirmar Experiencia
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-b from-zinc-900 to-black py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1578953403055-090f93bbee58?w=50&h=50&fit=crop&q=80" 
                  alt="Logo" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                THE GENTLEMAN'S CLUB
              </h3>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">© 2025 The Gentleman's Club. Todos los derechos reservados.</p>
              <p className="text-gray-600 text-sm">Excelencia en cada detalle desde 1995</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scroll {
          0% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(20px) translateX(-50%);
          }
          100% {
            transform: translateY(0) translateX(-50%);
          }
        }
        
        @keyframes slide {
          from {
            transform: translateX(0) translateY(0);
          }
          to {
            transform: translateX(50px) translateY(-50px);
          }
        }
        
        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default BarberiaUltraPremium;