import React from 'react';
import { Link } from 'react-router-dom';
import { courtTypes } from '../utils/dateUtils';

// Función para obtener el icono correspondiente a cada tipo de pista
const getCourtIcon = (courtType) => {
  switch(courtType) {
    case 'tenis':
      return <i className="bi bi-circle-fill court-icon"></i>;
    case 'futbol':
      return <i className="bi bi-dribbble court-icon"></i>;
    case 'baloncesto':
      return <i className="bi bi-basketball court-icon"></i>;
    case 'padel':
      return <i className="bi bi-pentagon court-icon"></i>;
    case 'squash':
      return <i className="bi bi-square court-icon"></i>;
    case 'fronton':
      return <i className="bi bi-triangle court-icon"></i>;
    default:
      return <i className="bi bi-trophy court-icon"></i>;
  }
};

const Home = () => {
  return (
    <div className="fade-in">
      <div className="jumbotron bg-light p-5 rounded mb-5 shadow-sm">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-4 fw-bold">Bienvenido a ReservasDeporte</h1>
            <p className="lead">Reserva tus pistas deportivas de forma fácil y rápida.</p>
            <hr className="my-4" />
            <p>Disponemos de múltiples instalaciones para la práctica de diferentes deportes.</p>
            <Link to="/reservar" className="btn btn-primary btn-lg">
              <i className="bi bi-calendar-check me-2"></i>Reservar ahora
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block text-center">
            <i className="bi bi-trophy display-1 text-primary"></i>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-center">Nuestras instalaciones</h2>
      
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        {courtTypes.map(court => (
          <div className="col" key={court.id}>
            <div className="court-card shadow-sm">
              {getCourtIcon(court.id)}
              <h3>{court.name}</h3>
              <p>Disponemos de <span className="badge bg-primary">{court.count}</span> pistas</p>
              <Link to={`/reservar/${court.id}`} className="btn btn-outline-primary mt-2">
                <i className="bi bi-calendar-plus me-2"></i>Reservar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;