import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './custom.css';

// Componentes de layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Páginas
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import MyReservations from './pages/MyReservations';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservar/:courtType?/:courtId?" element={<Reservation />} />
            <Route path="/mis-reservas" element={<MyReservations />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
