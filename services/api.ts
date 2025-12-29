import { AppData } from '../types';

// Use relative URL in production, local URL in development
const API_URL = import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }
  return response.json();
};

// FETCH EVERYTHING
export const getFullData = async (): Promise<AppData> => {
  try {
    const res = await fetch(`${API_URL}/content`);
    return await handleResponse(res);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      hero: { name: 'Error Loading', subtitle: 'Server Offline', bio: '', photoUrl: '' },
      projects: [],
      contacts: [],
      blogs: []
    };
  }
};

// SAVE EVERYTHING (Used by Admin Panel)
export const updateFullData = async (newData: AppData) => {
  return fetch(`${API_URL}/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData),
  }).then(handleResponse);
};
