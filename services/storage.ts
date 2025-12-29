import { AppData, BlogPost, ContactLink, HeroData, Project } from '../types';
import { INITIAL_DATA } from '../constants';

const STORAGE_KEY = 'abhinav_portfolio_db_v1';

// Initialize DB if empty
const initDB = (): AppData => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return JSON.parse(existing);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
  return INITIAL_DATA;
};

// Generic Getter
export const getDB = (): AppData => {
  return initDB();
};

// Generic Setter
const saveDB = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Dispatch event for live updates across components if we were using a context, 
  // but for now simple page refreshes or state updates will handle it.
  window.dispatchEvent(new Event('storage-update'));
};

// Hero Operations
export const updateHero = (hero: HeroData) => {
  const db = getDB();
  db.hero = hero;
  saveDB(db);
};

// Project Operations
export const addProject = (project: Project) => {
  const db = getDB();
  db.projects.push(project);
  saveDB(db);
};

export const updateProject = (updatedProject: Project) => {
  const db = getDB();
  db.projects = db.projects.map(p => p.id === updatedProject.id ? updatedProject : p);
  saveDB(db);
};

export const deleteProject = (id: string) => {
  const db = getDB();
  db.projects = db.projects.filter(p => p.id !== id);
  saveDB(db);
};

// Blog Operations
export const addBlog = (blog: BlogPost) => {
  const db = getDB();
  db.blogs.unshift(blog); // Newest first
  saveDB(db);
};

export const deleteBlog = (id: string) => {
  const db = getDB();
  db.blogs = db.blogs.filter(b => b.id !== id);
  saveDB(db);
};

// Contact Operations
export const addContact = (contact: ContactLink) => {
  const db = getDB();
  db.contacts.push(contact);
  saveDB(db);
};

export const deleteContact = (id: string) => {
  const db = getDB();
  db.contacts = db.contacts.filter(c => c.id !== id);
  saveDB(db);
};

// Reset to Seed
export const resetToSeed = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
  window.dispatchEvent(new Event('storage-update'));
};