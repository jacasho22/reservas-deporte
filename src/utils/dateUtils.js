// Funciones de utilidad para manejar fechas y horas

// Formatear fecha en formato legible
export const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Obtener fechas disponibles (próximos 14 días, solo de lunes a sábado)
export const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Solo incluir días de lunes a sábado (0 = domingo, 1 = lunes, ..., 6 = sábado)
    if (date.getDay() !== 0) {
      const formattedDate = date.toISOString().split('T')[0];
      dates.push({
        value: formattedDate,
        label: formatDate(formattedDate)
      });
    }
  }
  
  return dates;
};

// Generar horas disponibles de 9:00 a 22:30
export const getAvailableTimes = () => {
  const times = [];
  const startHour = 9;
  const endHour = 22;
  const endMinute = 30;
  
  for (let hour = startHour; hour <= endHour; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour !== endHour) {
      times.push(`${hour.toString().padStart(2, '0')}:30`);
    } else if (endMinute === 30) {
      times.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  
  return times;
};

// Datos de las pistas deportivas
export const courtTypes = [
  { id: 'tenis', name: 'Tenis', count: 9 },
  { id: 'squash', name: 'Squash', count: 2 },
  { id: 'padel', name: 'Pádel', count: 7 },
  { id: 'futbol', name: 'Fútbol', count: 5 },
  { id: 'baloncesto', name: 'Baloncesto', count: 2 },
  { id: 'fronton', name: 'Frontón', count: 2 }
];

// Generar array de pistas disponibles según el tipo seleccionado
export const getAvailableCourts = (courtTypeId) => {
  const selectedType = courtTypes.find(type => type.id === courtTypeId);
  if (!selectedType) return [];
  
  return Array.from({ length: selectedType.count }, (_, i) => (i + 1).toString());
};