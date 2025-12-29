import { AppData, BlogPost, ContactLink, HeroData, Project } from '../types';
// api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


// Helper to handle response
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }
  return response.json();
};

// --- GET ALL DATA (Aggregated for init) ---
export const getFullData = async (): Promise<AppData> => {
  try {
    const [heroRes, projectsRes, contactsRes, blogsRes] = await Promise.all([
      fetch(`${API_URL}/hero`),
      fetch(`${API_URL}/projects`),
      fetch(`${API_URL}/contacts`),
      fetch(`${API_URL}/blogs`)
    ]);

    const hero = await handleResponse(heroRes);
    const projects = await handleResponse(projectsRes);
    const contacts = await handleResponse(contactsRes);
    const blogs = await handleResponse(blogsRes);

    return { hero, projects, contacts, blogs };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Fallback/Empty structure if server is down to prevent crash
    return {
      hero: { name: 'Error Loading', subtitle: 'Server Offline', bio: '', photoUrl: '' },
      projects: [],
      contacts: [],
      blogs: []
    };
  }
};

// --- HERO ---
export const updateHero = async (heroData: HeroData) => {
  return fetch(`${API_URL}/hero`, {
    method: 'PUT', // or PATCH
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(heroData),
  }).then(handleResponse);
};

// --- PROJECTS ---
export const getProjects = async (): Promise<Project[]> => {
  return fetch(`${API_URL}/projects`).then(handleResponse);
};

export const addProject = async (project: Project) => {
  return fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  }).then(handleResponse);
};

export const deleteProject = async (id: string) => {
  return fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
};

// --- BLOGS ---
export const getBlogs = async (): Promise<BlogPost[]> => {
  return fetch(`${API_URL}/blogs`).then(handleResponse);
};

export const addBlog = async (blog: BlogPost) => {
  return fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  }).then(handleResponse);
};

export const deleteBlog = async (id: string) => {
  return fetch(`${API_URL}/blogs/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
};

// --- CONTACTS ---
export const getContacts = async (): Promise<ContactLink[]> => {
  return fetch(`${API_URL}/contacts`).then(handleResponse);
};

export const addContact = async (contact: ContactLink) => {
  return fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  }).then(handleResponse);
};

export const deleteContact = async (id: string) => {
  return fetch(`${API_URL}/contacts/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
};
