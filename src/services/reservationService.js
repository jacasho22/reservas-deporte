// Este servicio simula la interacción con una API o base de datos
// En una aplicación real, aquí se realizarían las peticiones HTTP

const STORAGE_KEY = 'reservasDeporte_reservations';

// Obtener todas las reservas
export const getReservations = () => {
  const storedReservations = localStorage.getItem(STORAGE_KEY);
  return storedReservations ? JSON.parse(storedReservations) : [];
};

// Crear una nueva reserva
export const createReservation = (reservation) => {
  const reservations = getReservations();
  
  // Generar un ID único
  const newReservation = {
    ...reservation,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    personalId: reservation.personalId || ''
  };
  
  // Añadir el nombre de la pista según el tipo
  const courtNames = {
    tenis: 'Tenis',
    squash: 'Squash',
    padel: 'Pádel',
    futbol: 'Fútbol',
    baloncesto: 'Baloncesto',
    fronton: 'Frontón'
  };
  
  newReservation.courtName = courtNames[reservation.courtType] || reservation.courtType;
  
  // Guardar la reserva
  const updatedReservations = [...reservations, newReservation];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations));
  
  return newReservation;
};

// Cancelar una reserva
export const cancelReservation = (reservationId) => {
  const reservations = getReservations();
  const updatedReservations = reservations.filter(r => r.id !== reservationId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations));
  
  return true;
};

// Verificar disponibilidad
export const checkAvailability = (courtType, courtId, date, time) => {
  const reservations = getReservations();
  
  // Comprobar si ya existe una reserva para esa pista, fecha y hora
  const isBooked = reservations.some(r => 
    r.courtType === courtType && 
    r.courtId === courtId && 
    r.date === date && 
    r.time === time
  );
  
  return !isBooked;
};