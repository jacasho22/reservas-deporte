import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createReservation, checkAvailability } from '../services/reservationService';
import { courtTypes, getAvailableCourts, getAvailableDates, getAvailableTimes } from '../utils/dateUtils';

const Reservation = () => {
  const { courtType, courtId } = useParams();
  const navigate = useNavigate();
  
  const [selectedCourtType, setSelectedCourtType] = useState(courtType || '');
  const [selectedCourt, setSelectedCourt] = useState(courtId || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('60'); // 60 o 30 minutos
  const [personalId, setPersonalId] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  
  // Cargar horas disponibles
  useEffect(() => {
    if (selectedDate) {
      setAvailableTimes(getAvailableTimes());
    }
  }, [selectedDate]);

  // Actualizar URL cuando cambia el tipo de pista
  useEffect(() => {
    if (selectedCourtType) {
      navigate(`/reservar/${selectedCourtType}${selectedCourt ? `/${selectedCourt}` : ''}`, { replace: true });
    }
  }, [selectedCourtType, selectedCourt, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar disponibilidad
    if (!checkAvailability(selectedCourtType, selectedCourt, selectedDate, selectedTime)) {
      alert('Lo sentimos, esta pista ya está reservada para la fecha y hora seleccionadas.');
      return;
    }
    
    // Validar identificación personal
    if (!personalId.trim()) {
      alert('Por favor, introduce tu DNI o email para identificar la reserva.');
      return;
    }
    
    // Crear la reserva
    const reservation = {
      courtType: selectedCourtType,
      courtId: selectedCourt,
      courtNumber: selectedCourt,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      personalId: personalId.trim()
    };
    
    createReservation(reservation);
    alert('Reserva realizada con éxito');
    navigate('/mis-reservas');
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4 text-center"><i className="bi bi-calendar-plus me-2"></i>Reservar Pista</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
      
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <label htmlFor="courtType" className="form-label">Tipo de Pista</label>
            <select 
              id="courtType" 
              className="form-select" 
              value={selectedCourtType} 
              onChange={(e) => {
                setSelectedCourtType(e.target.value);
                setSelectedCourt('');
              }}
              required
            >
              <option value="">Selecciona un tipo de pista</option>
              {courtTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="court" className="form-label">Número de Pista</label>
            <select 
              id="court" 
              className="form-select" 
              value={selectedCourt} 
              onChange={(e) => setSelectedCourt(e.target.value)}
              disabled={!selectedCourtType}
              required
            >
              <option value="">Selecciona una pista</option>
              {getAvailableCourts(selectedCourtType).map(courtNum => (
                <option key={courtNum} value={courtNum}>Pista {courtNum}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <label htmlFor="date" className="form-label">Fecha</label>
            <select 
              id="date" 
              className="form-select" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            >
              <option value="">Selecciona una fecha</option>
              {getAvailableDates().map(date => (
                <option key={date.value} value={date.value}>{date.label}</option>
              ))}
            </select>
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="time" className="form-label">Hora</label>
            <select 
              id="time" 
              className="form-select" 
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)}
              disabled={!selectedDate}
              required
            >
              <option value="">Selecciona una hora</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Duración</label>
          <div>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="radio" 
                name="duration" 
                id="duration30" 
                value="30" 
                checked={selectedDuration === '30'}
                onChange={(e) => setSelectedDuration(e.target.value)}
              />
              <label className="form-check-label" htmlFor="duration30">30 minutos</label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="radio" 
                name="duration" 
                id="duration60" 
                value="60" 
                checked={selectedDuration === '60'}
                onChange={(e) => setSelectedDuration(e.target.value)}
              />
              <label className="form-check-label" htmlFor="duration60">1 hora</label>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="personalId" className="form-label">Identificación Personal (DNI o Email) *</label>
          <input 
            type="text" 
            className="form-control" 
            id="personalId" 
            value={personalId}
            onChange={(e) => setPersonalId(e.target.value)}
            placeholder="Introduce tu DNI o email para identificar tu reserva"
            required
          />
          <div className="form-text">Necesario para gestionar o cancelar tu reserva posteriormente.</div>
        </div>
        
        <button type="submit" className="btn btn-primary btn-lg w-100" disabled={!selectedCourtType || !selectedCourt || !selectedDate || !selectedTime || !personalId.trim()}>
          <i className="bi bi-check-circle me-2"></i>Confirmar Reserva
        </button>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Reservation;