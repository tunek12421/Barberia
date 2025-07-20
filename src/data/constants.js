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