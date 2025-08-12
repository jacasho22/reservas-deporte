import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5><i className="bi bi-trophy me-2"></i>ReservasDeporte</h5>
            <p className="small mb-0">Tu plataforma de reservas deportivas</p>
          </div>
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <div className="d-flex justify-content-center gap-3">
              <Link to="/" className="text-white"><i className="bi bi-facebook fs-4"></i></Link>
              <Link to="/" className="text-white"><i className="bi bi-twitter fs-4"></i></Link>
              <Link to="/" className="text-white"><i className="bi bi-instagram fs-4"></i></Link>
            </div>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-0">© {new Date().getFullYear()} ReservasDeporte</p>
            <p className="small mb-0">Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;