import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReservations, cancelReservation } from '../services/reservationService';
import { formatDate } from '../utils/dateUtils';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  // Cargar reservas al iniciar
  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = () => {
    const userReservations = getReservations();
    setReservations(userReservations);
  };

  const handleCancelReservation = (id) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      cancelReservation(id);
      loadReservations(); // Recargar la lista de reservas
      alert('Reserva cancelada con éxito');
    }
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4 text-center"><i className="bi bi-calendar-check me-2"></i>Mis Reservas</h2>
      
      {reservations.length === 0 ? (
        <div className="alert alert-info shadow-sm">
          <i className="bi bi-info-circle me-2"></i>
          No tienes reservas activas. <Link to="/reservar" className="alert-link">Haz una reserva ahora</Link>.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
          {reservations.map(reservation => (
            <div className="col" key={reservation.id}>
              <div className="card shadow-sm h-100">
                <div className="card-header bg-primary text-white">
                  <i className={`bi bi-${reservation.courtType === 'futbol' ? 'dribbble' : reservation.courtType === 'baloncesto' ? 'basketball' : 'trophy'} me-2`}></i>
                  {reservation.courtName} - Pista {reservation.courtNumber}
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-calendar-date me-2"></i>
                    {formatDate(reservation.date)}
                  </h5>
                  <div className="card-text">
                    <p>
                      <i className="bi bi-clock me-2"></i>
                      <strong>Hora:</strong> {reservation.time}
                    </p>
                    <p>
                      <i className="bi bi-hourglass-split me-2"></i>
                      <strong>Duración:</strong> {reservation.duration === '30' ? '30 minutos' : '1 hora'}
                    </p>
                    <p>
                      <i className="bi bi-person-badge me-2"></i>
                      <strong>Identificación:</strong> {reservation.personalId || 'No especificada'}
                    </p>
                  </div>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <button 
                    className="btn btn-danger w-100" 
                    onClick={() => handleCancelReservation(reservation.id)}
                  >
                    <i className="bi bi-x-circle me-2"></i>Cancelar Reserva
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;