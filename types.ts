
export interface HeroData {
  name: string;
  subtitle: string;
  bio: string;
  photoUrl: string;
  status?: string; // e.g., "Open to Work"
}

export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  githubLink: string;
  tags?: string[];
}

export interface ContactLink {
  id: string;
  platform: string;
  value: string;
  url: string;
  iconName: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string; // Short summary or preview
  fullContent?: string; // Long form text
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  caption?: string;
  date: string;
}

export interface AppData {
  hero: HeroData;
  projects: Project[];
  contacts: ContactLink[];
  blogs: BlogPost[];
}
