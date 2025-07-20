import React from 'react';
import { X, Check } from 'lucide-react';
import { services, barbers, timeSlots } from '../data/constants';

const BookingModal = ({
  showBookingModal,
  setShowBookingModal,
  bookingStep,
  setBookingStep,
  selectedService,
  setSelectedService,
  selectedBarber,
  setSelectedBarber,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  formData,
  setFormData,
  handleBooking,
  resetBooking
}) => {
  if (!showBookingModal) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-black border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={() => {setShowBookingModal(false); resetBooking();}}
          className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>
        
        <div className="p-12">
          <h2 className="text-3xl font-thin tracking-[0.2em] mb-12">RESERVAR EXPERIENCIA</h2>
          
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
          
          {bookingStep === 1 && (
            <div className="space-y-12 animate-fade-in">
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
          
          {bookingStep === 2 && (
            <div className="space-y-12 animate-fade-in">
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
          
          {bookingStep === 3 && (
            <div className="space-y-12 animate-fade-in">
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
  );
};

export default BookingModal;