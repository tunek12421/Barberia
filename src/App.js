import React, { useState, useEffect, useRef } from 'react';
import { Clock, Phone, Mail, MapPin, Star, Check, Menu, X, Award, Shield, Sparkles, Crown, ChevronDown, ArrowRight } from 'lucide-react';

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const heroRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const services = [
    { 
      id: 1, 
      name: 'CORTE CLÁSICO', 
      price: '45', 
      duration: '30 MIN', 
      description: 'Precisión artesanal en cada detalle',
      icon: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop&q=80',
      features: ['Consulta personalizada', 'Lavado con productos premium', 'Masaje capilar', 'Styling profesional'],
      popular: false
    },
    { 
      id: 2, 
      name: 'CORTE & BARBA', 
      price: '65', 
      duration: '45 MIN', 
      description: 'La experiencia completa del caballero moderno',
      icon: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop&q=80',
      features: ['Corte de precisión', 'Diseño de barba personalizado', 'Aceites esenciales importados', 'Hot towel treatment'],
      popular: true
    },
    { 
      id: 3, 
      name: 'EXPERIENCIA VIP', 
      price: '120', 
      duration: '90 MIN', 
      description: 'Lujo absoluto para el hombre exigente',
      icon: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop&q=80',
      features: ['Servicio completo premium', 'Tratamiento facial exclusivo', 'Masaje relajante', 'Champagne o whisky premium', 'Aromaterapia personalizada'],
      popular: false
    },
    { 
      id: 4, 
      name: 'AFEITADO REAL', 
      price: '40', 
      duration: '30 MIN', 
      description: 'La tradición del afeitado perfecto',
      icon: 'https://images.unsplash.com/photo-1553521041-d168abd31de3?w=400&h=400&fit=crop&q=80',
      features: ['Preparación con vapor', 'Navaja japonesa', 'Tres pasadas perfectas', 'After-shave artesanal'],
      popular: false
    }
  ];

  const barbers = [
    { 
      id: 1, 
      name: 'ALESSANDRO ROMANO', 
      title: 'Master Craftsman',
      specialty: 'Arquitecto del Estilo', 
      experience: '15 años perfeccionando el arte', 
      rating: 5,
      image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=800&h=1000&fit=crop',
      awards: ['Best Barber Europe 2023', 'Master Craftsman Award', 'Style Innovator 2022'],
      skills: ['Fade Specialist', 'Beard Architecture', 'Classic Cuts', 'Creative Designs'],
      quote: 'Cada corte es una obra de arte única',
      availability: 'Martes a Sábado'
    },
    { 
      id: 2, 
      name: 'MARCUS STERLING', 
      title: 'Beard Specialist',
      specialty: 'Escultor de Barbas', 
      experience: '10 años de excelencia', 
      rating: 5,
      image: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?q=80&w=800&h=1000&fit=crop',
      awards: ['Beard Champion 2022', 'Precision Award 2023'],
      skills: ['Beard Design', 'Hot Towel Expert', 'Straight Razor', 'Facial Treatments'],
      quote: 'La barba define el carácter del hombre',
      availability: 'Lunes a Viernes'
    },
    { 
      id: 3, 
      name: 'VIKTOR NOIR', 
      title: 'Style Director',
      specialty: 'Visionario del Estilo', 
      experience: '12 años de innovación', 
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&h=1000&fit=crop',
      awards: ['Innovation Award 2023', 'Trendsetter 2022'],
      skills: ['Modern Styles', 'Color Expert', 'Texture Specialist', 'Fashion Cuts'],
      quote: 'El estilo es la expresión del alma',
      availability: 'Miércoles a Domingo'
    }
  ];

  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "CEO, Tech Ventures",
      text: "No es simplemente un corte de pelo, es una experiencia transformadora. La atención al detalle y el profesionalismo son incomparables.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&q=80'
    },
    {
      name: "Roberto García",
      role: "Senior Partner, Law Firm",
      text: "Cinco años de fidelidad absoluta. The Gentleman's Club ha redefinido mi concepto de cuidado personal masculino.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop&q=80'
    },
    {
      name: "Miguel Ángel Torres",
      role: "Creative Director",
      text: "La excelencia personificada. Cada visita supera mis expectativas más altas. Un santuario del estilo masculino.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80'
    }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  const galleryImages = [
    { 
      url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1200&h=800&fit=crop',
      category: 'corte',
      service: 'Corte Ejecutivo',
      description: 'Elegancia contemporánea',
      featured: true
    },
    { 
      url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&h=800&fit=crop',
      category: 'corte',
      service: 'Fade Artístico',
      description: 'Precisión milimétrica'
    },
    { 
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&h=800&fit=crop',
      category: 'barba',
      service: 'Sculpting Completo',
      description: 'Maestría en cada trazo',
      featured: true
    },
    { 
      url: 'https://images.unsplash.com/photo-1582771498000-8ad44e6c84db?q=80&w=800&h=1200&fit=crop',
      category: 'vip',
      service: 'Experiencia Total',
      description: 'Lujo sin compromisos',
      featured: false
    },
    { 
      url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&h=800&fit=crop',
      category: 'afeitado',
      service: 'Afeitado Real',
      description: 'Tradición y perfección'
    },
    { 
      url: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?q=80&w=1200&h=800&fit=crop',
      category: 'vip',
      service: 'Tratamiento Premium',
      description: 'Cuidado integral',
      featured: true
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2500);

    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Handle scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };

    // Handle mouse move for parallax
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(testimonialInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const handleBooking = () => {
    if (bookingStep === 3 && formData.name && formData.email && formData.phone) {
      alert(`Estimado ${formData.name}, su reserva ha sido confirmada. Recibirá un correo de confirmación en ${formData.email}`);
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
        <div className="relative">
          {/* Animated Logo */}
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
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-[600px] h-[600px] opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, white 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Navigation */}
      <nav id="navbar" className="fixed top-0 w-full z-50 transition-all duration-700 navbar">
        <div className="absolute inset-0 bg-black/0 backdrop-blur-0 transition-all duration-700"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative">
                <div className="text-2xl font-thin tracking-[0.3em]">THE</div>
                <div className="text-2xl font-thin tracking-[0.3em]">GENTLEMAN'S</div>
                <div className="text-2xl font-thin tracking-[0.3em]">CLUB</div>
                <div className="absolute -bottom-2 left-0 w-full h-[0.5px] bg-white/50"></div>
              </div>
            </div>
            
            {/* Desktop Menu */}
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
              
              {/* Time Display */}
              <div className="text-xs tracking-[0.2em] text-white/50">
                {currentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              </div>
              
              {/* CTA Button */}
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

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
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

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center" ref={heroRef}>
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&h=1080&fit=crop" 
              alt="The Gentleman's Club"
              className="w-full h-full object-cover scale-110"
              style={{
                transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black"></div>
            
            {/* Geometric Overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Decorative Line */}
          <div className="w-px h-20 bg-white/30 mx-auto mb-12 animate-expand-vertical"></div>
          
          <h1 className="mb-8">
            <div className="overflow-hidden">
              <div className="text-7xl md:text-9xl font-thin tracking-[0.2em] leading-none animate-slide-up">
                DONDE EL
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="text-7xl md:text-9xl font-thin tracking-[0.2em] leading-none mt-4 animate-slide-up animation-delay-200">
                ESTILO
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="text-3xl md:text-5xl font-thin tracking-[0.3em] text-white/70 mt-6 animate-slide-up animation-delay-400">
                TRASCIENDE EL TIEMPO
              </div>
            </div>
          </h1>
          
          {/* Established Date */}
          <div className="flex items-center justify-center space-x-6 mb-16 animate-fade-in animation-delay-600">
            <div className="w-20 h-[0.5px] bg-white/30"></div>
            <p className="text-sm tracking-[0.3em] text-white/50">EST. 1995</p>
            <div className="w-20 h-[0.5px] bg-white/30"></div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animation-delay-800">
            <button 
              onClick={() => setShowBookingModal(true)}
              className="group relative overflow-hidden px-12 py-5 border border-white/30 hover:border-white transition-all duration-700"
            >
              <span className="relative z-10 text-sm tracking-[0.3em] flex items-center">
                RESERVAR EXPERIENCIA
                <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              <span className="absolute inset-0 flex items-center justify-center text-black text-sm tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                RESERVAR EXPERIENCIA
                <ArrowRight className="ml-3 w-4 h-4" />
              </span>
            </button>
            
            <a 
              href="#servicios"
              className="text-sm tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-500"
            >
              DESCUBRIR MÁS
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/30 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
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
          
          {/* Services Grid */}
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
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-4 -right-4 z-10">
                    <div className="bg-white text-black text-xs tracking-[0.2em] px-4 py-2">
                      POPULAR
                    </div>
                  </div>
                )}
                
                <div className="relative h-full border border-white/10 p-8 transition-all duration-700 hover:border-white/30 bg-black/50 backdrop-blur-sm">
                  {/* Service Image */}
                  <div className="relative h-48 mb-8 overflow-hidden">
                    <img 
                      src={service.icon} 
                      alt={service.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>
                  
                  {/* Service Details */}
                  <h3 className="text-lg tracking-[0.2em] mb-2">{service.name}</h3>
                  <p className="text-white/60 text-sm mb-6">{service.description}</p>
                  
                  {/* Price & Duration */}
                  <div className="flex items-baseline justify-between mb-6 border-b border-white/10 pb-6">
                    <div>
                      <span className="text-3xl font-thin">${service.price}</span>
                      <span className="text-white/40 text-xs ml-2">USD</span>
                    </div>
                    <span className="text-xs tracking-[0.2em] text-white/50">{service.duration}</span>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-white/50">
                        <div className="w-1 h-1 bg-white/50 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Section */}
      <section id="maestros" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
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
          
          {/* Barbers Grid */}
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
                  {/* Image Container */}
                  <div className="relative h-[600px] overflow-hidden mb-8">
                    <img 
                      src={barber.image}
                      alt={barber.name}
                      className="w-full h-full object-cover object-top grayscale transition-all duration-1000 group-hover:grayscale-0"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    
                    {/* Quote Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                      <p className="text-white/80 italic text-sm">"{barber.quote}"</p>
                    </div>
                    
                    {/* Side Line */}
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-white/20 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top"></div>
                  </div>
                  
                  {/* Barber Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-thin tracking-[0.2em] mb-1">{barber.name}</h3>
                      <p className="text-sm tracking-[0.2em] text-white/40 mb-2">{barber.title}</p>
                      <p className="text-white/60 text-sm">{barber.specialty}</p>
                      <p className="text-white/40 text-xs mt-2">{barber.experience}</p>
                    </div>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 py-4 border-y border-white/10">
                      {barber.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs tracking-[0.1em] text-white/30">
                          {skill}{idx < barber.skills.length - 1 && ' •'}
                        </span>
                      ))}
                    </div>
                    
                    {/* Awards & Availability */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-white/30" />
                        <span className="text-xs text-white/50">{barber.awards[0]}</span>
                      </div>
                      <p className="text-xs text-white/40 tracking-[0.1em]">
                        DISPONIBLE: {barber.availability}
                      </p>
                    </div>
                    
                    {/* Rating */}
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

      {/* Gallery Section */}
      <section id="galería" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
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
          
          {/* Filter */}
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
          
          {/* Gallery Grid - Masonry Layout */}
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
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <h4 className="text-lg tracking-[0.2em] mb-2">{item.service}</h4>
                        <p className="text-sm text-white/60">{item.description}</p>
                      </div>
                    </div>
                    
                    {/* Corner Frame */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/20 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:border-white/40"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/20 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:border-white/40"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="relative">
            {/* Large Quote Mark */}
            <div className="absolute -top-20 -left-10 text-[200px] text-white/5 font-serif leading-none select-none">"</div>
            
            {/* Testimonials Carousel */}
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
            
            {/* Navigation Dots */}
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

      {/* Contact Section */}
      <section id="contacto" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="mb-24">
            <div className="flex items-center mb-6">
              <div className="w-12 h-[0.5px] bg-white/30"></div>
              <p className="text-xs tracking-[0.3em] text-white/50 mx-6">04</p>
              <div className="flex-1 h-[0.5px] bg-white/10"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-thin tracking-[0.1em]">CONTACTO</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
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
              
              {/* CTA */}
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
            
            {/* Map/Image */}
            <div className="relative h-[600px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?q=80&w=800&h=600&fit=crop" 
                alt="The Gentleman's Club Interior"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Floating Info */}
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

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-black border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button 
              onClick={() => {setShowBookingModal(false); resetBooking();}}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            {/* Modal Content */}
            <div className="p-12">
              <h2 className="text-3xl font-thin tracking-[0.2em] mb-12">RESERVAR EXPERIENCIA</h2>
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-16">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-all duration-500 ${
                        bookingStep >= step 
                          ? 'border-white bg-white text-black' 
                          : 'border-white/30 text-white/30'
                      }`}>
                        {step}
                      </div>
                      <p className={`ml-3 text-xs tracking-[0.2em] hidden sm:block transition-colors duration-500 ${
                        bookingStep >= step ? 'text-white' : 'text-white/30'
                      }`}>
                        {step === 1 ? 'SERVICIO' : step === 2 ? 'HORARIO' : 'CONFIRMAR'}
                      </p>
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-[1px] ml-4 transition-all duration-500 ${
                        bookingStep > step ? 'bg-white/30' : 'bg-white/10'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Step 1: Service & Barber Selection */}
              {bookingStep === 1 && (
                <div className="space-y-12 animate-fade-in">
                  {/* Service Selection */}
                  <div>
                    <h3 className="text-sm tracking-[0.3em] text-white/40 mb-8">SELECCIONAR SERVICIO</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {services.map(service => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={`text-left p-6 border transition-all duration-500 ${
                            selectedService === service.id 
                              ? 'border-white bg-white/5' 
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg tracking-[0.1em]">{service.name}</h4>
                            <span className="text-xl font-thin">${service.price}</span>
                          </div>
                          <p className="text-sm text-white/50 mb-2">{service.duration}</p>
                          <p className="text-sm text-white/60">{service.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Barber Selection */}
                  <div>
                    <h3 className="text-sm tracking-[0.3em] text-white/40 mb-8">SELECCIONAR MAESTRO</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {barbers.map(barber => (
                        <button
                          key={barber.id}
                          onClick={() => setSelectedBarber(barber.id)}
                          className={`p-6 border transition-all duration-500 ${
                            selectedBarber === barber.id 
                              ? 'border-white bg-white/5' 
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <h4 className="text-lg tracking-[0.1em] mb-1">{barber.name}</h4>
                          <p className="text-sm text-white/50 mb-3">{barber.specialty}</p>
                          <div className="flex items-center justify-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div 
                                key={i} 
                                className={`w-1 h-3 ${i < Math.floor(barber.rating) ? 'bg-white/60' : 'bg-white/20'}`}
                              />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Next Button */}
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setBookingStep(2)}
                      disabled={!selectedService || !selectedBarber}
                      className={`px-12 py-4 border text-sm tracking-[0.2em] transition-all duration-500 ${
                        selectedService && selectedBarber
                          ? 'border-white text-white hover:bg-white hover:text-black'
                          : 'border-white/20 text-white/20 cursor-not-allowed'
                      }`}
                    >
                      CONTINUAR
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Date & Time Selection */}
              {bookingStep === 2 && (
                <div className="space-y-12 animate-fade-in">
                  {/* Date Selection */}
                  <div>
                    <h3 className="text-sm tracking-[0.3em] text-white/40 mb-8">SELECCIONAR FECHA</h3>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent border border-white/20 p-4 text-white focus:border-white outline-none transition-colors duration-300"
                    />
                  </div>
                  
                  {/* Time Selection */}
                  <div>
                    <h3 className="text-sm tracking-[0.3em] text-white/40 mb-8">SELECCIONAR HORA</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 border text-sm transition-all duration-500 ${
                            selectedTime === time 
                              ? 'border-white bg-white text-black' 
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button 
                      onClick={() => setBookingStep(1)}
                      className="px-12 py-4 border border-white/20 text-sm tracking-[0.2em] hover:border-white/40 transition-all duration-500"
                    >
                      ANTERIOR
                    </button>
                    <button 
                      onClick={() => setBookingStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className={`px-12 py-4 border text-sm tracking-[0.2em] transition-all duration-500 ${
                        selectedDate && selectedTime
                          ? 'border-white text-white hover:bg-white hover:text-black'
                          : 'border-white/20 text-white/20 cursor-not-allowed'
                      }`}
                    >
                      CONTINUAR
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Contact Information */}
              {bookingStep === 3 && (
                <div className="space-y-12 animate-fade-in">
                  {/* Contact Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm tracking-[0.3em] text-white/40 block mb-3">NOMBRE COMPLETO</label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:border-white outline-none transition-colors duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm tracking-[0.3em] text-white/40 block mb-3">EMAIL</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:border-white outline-none transition-colors duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm tracking-[0.3em] text-white/40 block mb-3">TELÉFONO</label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:border-white outline-none transition-colors duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  {/* Booking Summary */}
                  <div className="border border-white/20 p-8 space-y-4">
                    <h4 className="text-sm tracking-[0.3em] text-white/40 mb-6">RESUMEN DE RESERVA</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Servicio:</span>
                        <span>{services.find(s => s.id === selectedService)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Maestro:</span>
                        <span>{barbers.find(b => b.id === selectedBarber)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Fecha:</span>
                        <span>{selectedDate && new Date(selectedDate).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Hora:</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div className="border-t border-white/10 pt-4 mt-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-white/60">Total:</span>
                          <span className="text-2xl font-thin">
                            ${services.find(s => s.id === selectedService)?.price} USD
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button 
                      onClick={() => setBookingStep(2)}
                      className="px-12 py-4 border border-white/20 text-sm tracking-[0.2em] hover:border-white/40 transition-all duration-500"
                    >
                      ANTERIOR
                    </button>
                    <button 
                      onClick={handleBooking}
                      disabled={!formData.name || !formData.email || !formData.phone}
                      className={`px-12 py-4 border text-sm tracking-[0.2em] transition-all duration-500 flex items-center ${
                        formData.name && formData.email && formData.phone
                          ? 'border-white text-white hover:bg-white hover:text-black'
                          : 'border-white/20 text-white/20 cursor-not-allowed'
                      }`}
                    >
                      <Check size={16} className="mr-3" />
                      CONFIRMAR RESERVA
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
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

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes expand-vertical {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-expand-vertical {
          animation: expand-vertical 1s ease-out forwards;
          transform-origin: top;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .navbar-scrolled {
          background: rgba(0, 0, 0, 0.9) !important;
          backdrop-filter: blur(20px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-scrolled > div:first-child {
          background: transparent !important;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 0;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default BarberiaUltraPremium;