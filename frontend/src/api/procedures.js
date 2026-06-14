const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getProcedures = async () => {
  const response = await fetch(`${API_URL}/procedures`);

  if (!response.ok) {
    throw new Error('Failed to fetch procedures');
  }

  return response.json();
};

export const getProcedure = async (id) => {
  const response = await fetch(`${API_URL}/procedures/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch procedure');
  }

  return response.json();
};

export const getProcedureAppointments = async (id) => {
  const response = await fetch(`${API_URL}/procedures/${id}/appointments`);

  if (!response.ok) {
    throw new Error('Failed to fetch procedure appointments');
  }

  return response.json();
};
