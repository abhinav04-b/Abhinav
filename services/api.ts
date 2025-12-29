import { AppData, HeroData, Project, BlogPost, ContactLink } from '../types';

const API_URL = import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }
  return response.json();
};

// --- CORE FETCH/SAVE ---
export const getFullData = async (): Promise<AppData> => {
  try {
    const res = await fetch(`${API_URL}/content`);
    const data = await handleResponse(res);
    return {
      hero: data.hero || { name: '', subtitle: '', bio: '', photoUrl: '' },
      projects: data.projects || [],
      contacts: data.contacts || [],
      blogs: data.blogs || []
    };
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

export const updateFullData = async (newData: AppData) => {
  return fetch(`${API_URL}/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData),
  }).then(handleResponse);
};

// --- COMPATIBILITY WRAPPERS (To fix AdminDashboard.tsx errors) ---
// These allow your existing Dashboard code to work with the new MongoDB setup

export const updateHero = async (hero: HeroData) => {
  const current = await getFullData();
  return updateFullData({ ...current, hero });
};

export const addProject = async (project: Project) => {
  const current = await getFullData();
  return updateFullData({ ...current, projects: [...current.projects, project] });
};

export const deleteProject = async (id: string) => {
  const current = await getFullData();
  return updateFullData({ ...current, projects: current.projects.filter(p => p.id !== id) });
};

export const addBlog = async (blog: BlogPost) => {
  const current = await getFullData();
  return updateFullData({ ...current, blogs: [...current.blogs, blog] });
};

export const deleteBlog = async (id: string) => {
  const current = await getFullData();
  return updateFullData({ ...current, blogs: current.blogs.filter(b => b.id !== id) });
};
