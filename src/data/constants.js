export const services = [
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

export const barbers = [
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

export const testimonials = [
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

export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '14:00', '14:30', '15:00', '15:30', '16:00',
  '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
];

export const galleryImages = [
  // CORTES - Imágenes específicas de cortes de pelo
  { 
    url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop&q=80',
    category: 'corte',
    service: 'Corte Ejecutivo',
    description: 'Elegancia contemporánea',
    featured: true
  },
  { 
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=800&fit=crop&q=80',
    category: 'corte',
    service: 'Fade Artístico',
    description: 'Precisión milimétrica'
  },
  { 
    url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=600&fit=crop&q=80',
    category: 'corte',
    service: 'Corte Clásico',
    description: 'Estilo atemporal'
  },
  { 
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=850&h=650&fit=crop&q=80',
    category: 'corte',
    service: 'Modern Fade',
    description: 'Tendencia contemporánea'
  },
  {
    url: 'https://images.unsplash.com/photo-1614026480577-85ac93ad1dc3?w=900&h=600&fit=crop&q=80',
    category: 'corte',
    service: 'Pompadour Style',
    description: 'Elegancia vintage',
    featured: true
  },
  {
    url: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=750&h=850&fit=crop&q=80',
    category: 'corte',
    service: 'Side Part Classic',
    description: 'Elegancia tradicional'
  },
  {
    url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=850&h=650&fit=crop&q=80',
    category: 'corte',
    service: 'Slick Back',
    description: 'Estilo ejecutivo'
  },
  {
    url: 'https://images.unsplash.com/photo-1594736797933-d0d39b4e5db0?w=650&h=850&fit=crop&q=80',
    category: 'corte',
    service: 'Comb Over Fade',
    description: 'Elegancia moderna'
  },

  // BARBAS - Imágenes específicas de barbas y bigotes
  { 
    url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop&q=80',
    category: 'barba',
    service: 'Sculpting Completo',
    description: 'Maestría en cada trazo',
    featured: true
  },
  { 
    url: 'https://images.unsplash.com/photo-1632781297772-2bd01f8117c2?w=600&h=800&fit=crop&q=80',
    category: 'barba',
    service: 'Beard Sculpting',
    description: 'Contornos perfectos'
  },
  { 
    url: 'https://images.unsplash.com/photo-1566207531781-b04adb1e39ce?w=900&h=700&fit=crop&q=80',
    category: 'barba',
    service: 'Full Beard Service',
    description: 'Cuidado completo'
  },
  { 
    url: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=750&h=850&fit=crop&q=80',
    category: 'barba',
    service: 'Goatee Perfection',
    description: 'Estilo personalizado'
  },
  {
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=700&fit=crop&q=80',
    category: 'barba',
    service: 'Van Dyke Style',
    description: 'Distinción clásica',
    featured: true
  },
  {
    url: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=850&h=600&fit=crop&q=80',
    category: 'barba',
    service: 'Balbo Styling',
    description: 'Sofisticación italiana'
  },

  // AFEITADO - Imágenes específicas de afeitado tradicional
  { 
    url: 'https://images.unsplash.com/photo-1553521041-d168abd31de3?w=800&h=800&fit=crop&q=80',
    category: 'afeitado',
    service: 'Afeitado Real',
    description: 'Tradición y perfección'
  },
  { 
    url: 'https://images.unsplash.com/photo-1588771598044-6d6065fb7d4d?w=900&h=600&fit=crop&q=80',
    category: 'afeitado',
    service: 'Straight Razor',
    description: 'La experiencia definitiva',
    featured: true
  },
  { 
    url: 'https://images.unsplash.com/photo-1596638919734-8ac77de11018?w=600&h=850&fit=crop&q=80',
    category: 'afeitado',
    service: 'Hot Towel Service',
    description: 'Relajación total'
  },
  { 
    url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=750&fit=crop&q=80',
    category: 'afeitado',
    service: 'Classic Shave',
    description: 'Tradición pura'
  },
  { 
    url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1200&h=800&fit=crop',
    category: 'afeitado',
    service: 'Precision Shave',
    description: 'Perfección en cada pasada'
  },

  // VIP - Ambiente y experiencias de lujo en barbería
  { 
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=900&fit=crop&q=80',
    category: 'vip',
    service: 'Experiencia Total',
    description: 'Lujo sin compromisos',
    featured: true
  },
  { 
    url: 'https://images.unsplash.com/photo-1582771498000-8ad44e6c84db?w=700&h=500&fit=crop&q=80',
    category: 'vip',
    service: 'Tratamiento Premium',
    description: 'Cuidado integral'
  },
  { 
    url: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&h=900&fit=crop&q=80',
    category: 'vip',
    service: 'Royal Treatment',
    description: 'Experiencia de lujo'
  },
  { 
    url: 'https://images.unsplash.com/photo-1624052929685-35bc5b67f4b4?w=950&h=650&fit=crop&q=80',
    category: 'vip',
    service: 'Executive Package',
    description: 'Para el profesional exigente'
  },
  { 
    url: 'https://images.unsplash.com/photo-1598887142962-a7d2f6b8ad55?w=650&h=800&fit=crop&q=80',
    category: 'vip',
    service: 'Platinum Experience',
    description: 'El máximo nivel',
    featured: true
  }
];

// Footer Data Structure
export const footerData = {
  company: {
    name: 'THE GENTLEMAN\'S CLUB',
    tagline: 'EST. 1995 • EXCELLENCE IN EVERY DETAIL',
    description: 'Redefiniendo el lujo masculino desde 1995. Experiencias excepcionales en un ambiente de distinción y elegancia.',
    logo: {
      text: 'THE GENTLEMAN\'S CLUB',
      subtitle: 'Barbería Premium'
    }
  },
  
  navigation: {
    services: {
      title: 'Servicios',
      links: [
        { name: 'Corte Premium', href: '#servicios', id: 'corte' },
        { name: 'Afeitado Real', href: '#servicios', id: 'afeitado' },
        { name: 'Tratamiento Capilar', href: '#servicios', id: 'tratamiento' },
        { name: 'Experiencia VIP', href: '#servicios', id: 'vip' },
        { name: 'Paquetes Premium', href: '#servicios', id: 'paquetes' }
      ]
    },
    company: {
      title: 'Nosotros',
      links: [
        { name: 'Nuestro Equipo', href: '#barberos', id: 'team' },
        { name: 'Historia', href: '#historia', id: 'history' },
        { name: 'Filosofía', href: '#filosofia', id: 'philosophy' },
        { name: 'Testimonios', href: '#testimonios', id: 'testimonials' },
        { name: 'Galería', href: '#galeria', id: 'gallery' }
      ]
    },
    support: {
      title: 'Soporte',
      links: [
        { name: 'Reservar Cita', href: '#reservar', id: 'booking' },
        { name: 'Política de Cancelación', href: '#politicas', id: 'cancellation' },
        { name: 'Gift Cards', href: '#gift-cards', id: 'gifts' },
        { name: 'Programa de Lealtad', href: '#loyalty', id: 'loyalty' },
        { name: 'FAQ', href: '#faq', id: 'faq' }
      ]
    }
  },
  
  contact: {
    title: 'Contacto',
    address: {
      street: '123 Luxury Avenue',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      country: 'USA',
      full: '123 Luxury Avenue, Miami, FL 33101'
    },
    phone: {
      primary: '+1 (305) 555-0123',
      display: '305.555.0123',
      href: 'tel:+13055550123'
    },
    email: {
      primary: 'contact@gentlemansclub.com',
      reservations: 'reservas@gentlemansclub.com',
      support: 'soporte@gentlemansclub.com'
    },
    hours: {
      weekdays: 'Lun - Vie: 9:00 AM - 8:00 PM',
      saturday: 'Sábado: 8:00 AM - 6:00 PM',
      sunday: 'Domingo: 10:00 AM - 4:00 PM'
    }
  },
  
  social: {
    title: 'Síguenos',
    platforms: [
      {
        name: 'Instagram',
        href: 'https://instagram.com/gentlemansclub',
        icon: 'Instagram',
        handle: '@gentlemansclub',
        color: '#E4405F'
      },
      {
        name: 'Facebook',
        href: 'https://facebook.com/gentlemansclub',
        icon: 'Facebook',
        handle: 'The Gentleman\'s Club',
        color: '#1877F2'
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/gentlemansclub',
        icon: 'Twitter',
        handle: '@gentlemansclub',
        color: '#1DA1F2'
      },
      {
        name: 'TikTok',
        href: 'https://tiktok.com/@gentlemansclub',
        icon: 'Music',
        handle: '@gentlemansclub',
        color: '#FF0050'
      },
      {
        name: 'YouTube',
        href: 'https://youtube.com/gentlemansclub',
        icon: 'Youtube',
        handle: 'The Gentleman\'s Club',
        color: '#FF0000'
      }
    ]
  },
  
  newsletter: {
    title: 'Newsletter Exclusivo',
    subtitle: 'Ofertas especiales y tips de grooming',
    placeholder: 'Tu email...',
    buttonText: 'Suscribirse',
    privacy: 'Respetamos tu privacidad. Sin spam.',
    benefits: [
      'Descuentos exclusivos',
      'Tips de grooming',
      'Nuevos servicios',
      'Eventos especiales'
    ]
  },
  
  legal: {
    copyright: '© 2025 The Gentleman\'s Club. Todos los derechos reservados.',
    links: [
      { name: 'Política de Privacidad', href: '/privacidad', id: 'privacy' },
      { name: 'Términos de Servicio', href: '/terminos', id: 'terms' },
      { name: 'Política de Cookies', href: '/cookies', id: 'cookies' },
      { name: 'Política de Reembolso', href: '/reembolso', id: 'refund' }
    ],
    certifications: [
      'Certificado de Calidad ISO 9001',
      'Miembro de la Asociación de Barberos de América',
      'Compromiso con la Sostenibilidad'
    ]
  }
};