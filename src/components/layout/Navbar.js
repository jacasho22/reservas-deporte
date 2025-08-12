import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // Import custom CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-trophy me-2"></i>
          ReservasDeporte
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/">
                <i className="bi bi-house-door me-1"></i> Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/reservar">
                <i className="bi bi-calendar-plus me-1"></i> Reservar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/mis-reservas">
                <i className="bi bi-calendar-check me-1"></i> Mis Reservas
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;