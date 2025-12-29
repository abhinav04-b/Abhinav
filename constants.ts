import { AppData } from './types';

export const INITIAL_DATA: AppData = {
  hero: {
    name: "Abhinav Kumar",
    subtitle: "Future Developer",
    bio: "Passionate student learning CSE from DIATM. Crafting clean, high-performance web experiences.",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", 
    status: "Learning Java & Next.js"
  },
  projects: [
    {
      id: '1',
      name: "Portfolio V2",
      description: "A high-performance bento-grid portfolio built with Next.js concepts.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      githubLink: "https://github.com/abhinav04-b",
      tags: ["React", "Framer Motion", "Tailwind"]
    },
    {
      id: '2',
      name: "E-Commerce Dash",
      description: "Admin panel for managing inventory, orders, and analytics in real-time.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      githubLink: "https://github.com/abhinav04-b",
      tags: ["Next.js", "MongoDB", "Stripe"]
    },
    {
      id: '3',
      name: "TaskFlow",
      description: "A collaborative project management tool with drag-and-drop features.",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
      githubLink: "https://github.com/abhinav04-b",
      tags: ["TypeScript", "Redux", "DND"]
    }
  ],
  contacts: [
    {
      id: 'c1',
      platform: "GitHub",
      value: "abhinav04-b",
      url: "https://github.com/abhinav04-b",
      iconName: "Github"
    },
    {
      id: 'c2',
      platform: "LinkedIn",
      value: "Abhinav Kumar",
      url: "https://www.linkedin.com/in/abhinav-kumar-bb89872a1/",
      iconName: "Linkedin"
    },
    {
      id: 'c3',
      platform: "Instagram",
      value: "@abhinav0691",
      url: "https://instagram.com/abhinav0691",
      iconName: "Instagram"
    },
    {
      id: 'c4',
      platform: "Email",
      value: "abhinav41205@gmail.com",
      url: "mailto:abhinav41205@gmail.com",
      iconName: "Mail"
    },
    {
      id: 'c5',
      platform: "Phone",
      value: "+91-9693197475",
      url: "tel:+919693197475",
      iconName: "Phone"
    }
  ],
  blogs: [
    {
        id: 'b1',
        title: 'Mastering the Bento Grid Layout',
        date: 'Oct 24, 2023',
        content: 'Why grid layouts are taking over modern web design portfolios.'
    },
    {
        id: 'b2',
        title: 'The Future of Next.js',
        date: 'Nov 02, 2023',
        content: 'Understanding Server Actions and the App Router paradigm.'
    }
  ]
};