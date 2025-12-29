import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, Code, MapPin, Send, X, Play } from 'lucide-react';
import { AppData, Project, BlogPost, ContactLink } from '../types';
import { getFullData } from '../services/api'; // Switched to API
import { BentoGrid, BentoCard } from '../components/BentoGrid';

// --- Helper: YouTube ID Extractor ---
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// --- Blog Modal Component ---
const BlogModal = ({ blog, onClose }: { blog: BlogPost; onClose: () => void }) => {
  const isYouTube = blog.mediaType === 'video' && blog.mediaUrl && getYouTubeId(blog.mediaUrl);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-cyber-900 border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-electric-blue transition-colors"
        >
          <X size={20} />
        </button>

        {/* Media Section */}
        {blog.mediaUrl && (
          <div className="w-full aspect-video bg-black rounded-t-3xl overflow-hidden relative">
             {blog.mediaType === 'image' ? (
               <img src={blog.mediaUrl} alt={blog.title} className="w-full h-full object-cover" />
             ) : isYouTube ? (
               <iframe 
                 className="w-full h-full"
                 src={`https://www.youtube.com/embed/${isYouTube}?autoplay=1`}
                 title={blog.title}
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               />
             ) : (
                <video src={blog.mediaUrl} controls className="w-full h-full" />
             )}
          </div>
        )}

        <div className="p-8">
           {blog.caption && blog.mediaUrl && (
             <p className="text-xs text-gray-500 italic mb-6 text-center border-b border-white/5 pb-4">
               {blog.caption}
             </p>
           )}
           
           <div className="mb-6">
             <span className="text-electric-blue text-xs font-mono font-bold tracking-wider uppercase mb-2 block">{blog.date}</span>
             <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{blog.title}</h2>
           </div>

           <div className="prose prose-invert prose-lg max-w-none text-gray-300">
             <p className="whitespace-pre-line leading-relaxed">
               {blog.fullContent || blog.content}
             </p>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- Hero Grid Section ---
const HeroBento = ({ data, contacts }: { data: AppData['hero'], contacts: ContactLink[] }) => {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github': return <Github size={28} />;
      case 'linkedin': return <Linkedin size={28} />;
      case 'instagram': return <Instagram size={28} />;
      default: return <Mail size={28} />;
    }
  };

  const socialLinks = contacts.filter(c => ['github', 'linkedin', 'instagram'].includes(c.platform.toLowerCase()));

  return (
    <section className="mb-24">
      <BentoGrid>
        {/* 1. Title Card (Span 8) */}
        <BentoCard colSpan={8} className="p-8 flex flex-col justify-center min-h-[300px] bg-gradient-to-br from-white/10 to-transparent">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-electric-blue/20 text-electric-blue text-xs font-mono font-bold tracking-wider">
              PORTFOLIO 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
              {data.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-400 font-medium">
              {data.subtitle}
            </h2>
          </div>
        </BentoCard>

        {/* 2. Photo Card (Span 4, Row 2 for height) */}
        <BentoCard colSpan={4} rowSpan={2} className="relative group min-h-[400px]">
          <div className="absolute inset-0 bg-electric-blue/20 blur-3xl group-hover:bg-electric-blue/30 transition-colors duration-500"></div>
          <img 
            src={data.photoUrl} 
            alt={data.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-60"></div>
        </BentoCard>

        {/* 3. Bio Card (Span 4) */}
        <BentoCard colSpan={4} className="p-6 flex flex-col justify-between hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 text-electric-blue mb-4">
            <Code size={20} />
            <span className="font-mono text-sm uppercase">About Me</span>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {data.bio}
          </p>
        </BentoCard>

        {/* 4. Status Card (Span 4) */}
        <BentoCard colSpan={4} className="p-6 flex flex-col justify-between items-start hover:bg-white/10 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="font-mono text-sm text-gray-400 uppercase">Current Status</span>
           </div>
           <div>
             <h3 className="text-xl font-bold text-white">{data.status || "Open to Work"}</h3>
             <p className="text-sm text-gray-500 mt-1">Based in India</p>
           </div>
        </BentoCard>

        {/* 5. Socials Card (Span 12) */}
         <BentoCard colSpan={12} className="p-6 flex items-center justify-between bg-cyber-900/50">
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
                <MapPin size={16} className="text-electric-blue" />
                <span>DIATM, India</span>
                <span className="hidden md:inline text-gray-600">|</span>
                <span>UTC+05:30</span>
            </div>
            <div className="flex gap-4">
              {socialLinks.map(link => (
                <a 
                  key={link.id} 
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-electric-blue hover:text-white text-gray-400 transition-all hover:scale-110"
                >
                  {getIcon(link.platform)}
                </a>
              ))}
            </div>
         </BentoCard>
      </BentoGrid>
    </section>
  );
};

// --- Projects Section ---
const ProjectsBento = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="mb-24">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-end justify-between">
        <div>
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Selected Works</h2>
           <p className="text-gray-400">A collection of my recent experiments.</p>
        </div>
        <a href="https://github.com/abhinav04-b" target="_blank" className="hidden md:flex items-center gap-2 text-electric-blue hover:underline">
          View GitHub <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-electric-blue/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,112,243,0.3)] hover:-translate-y-1"
          >
            <div className="aspect-video overflow-hidden">
               <img 
                  src={project.imageUrl} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               />
            </div>
            <div className="p-6">
               <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">{project.name}</h3>
               <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
               <div className="flex flex-wrap gap-2">
                 {project.tags?.map(tag => (
                   <span key={tag} className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                     {tag}
                   </span>
                 ))}
               </div>
            </div>
            <a href={project.githubLink} target="_blank" className="absolute inset-0 z-10" aria-label={`View ${project.name}`} />
          </motion.div>
        ))}
        {projects.length === 0 && <p className="col-span-3 text-center text-gray-500 py-10">No projects found. Start the server!</p>}
      </div>
    </section>
  );
};

// --- Blog & Contact ---
const ContactBlogBento = ({ blogs, contacts }: { blogs: BlogPost[], contacts: ContactLink[] }) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const email = contacts.find(c => c.platform.toLowerCase() === 'email' || c.platform.toLowerCase() === 'mail');

  return (
    <section id="contact" className="mb-24 relative">
      <AnimatePresence>
        {selectedBlog && <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />}
      </AnimatePresence>

      <BentoGrid>
        {/* Contact Form Area (Span 6) */}
        <BentoCard colSpan={6} className="p-8 bg-gradient-to-br from-cyber-900 to-transparent">
          <h2 className="text-3xl font-bold text-white mb-6">Let's work together.</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
            />
            <textarea 
              placeholder="Tell me about your project..." 
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
            />
            <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Send Message <Send size={18} />
            </button>
          </form>
          {email && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-1">Or email me directly</p>
              <a href={email.url} className="text-xl font-mono text-electric-blue hover:text-white transition-colors">
                {email.value}
              </a>
            </div>
          )}
        </BentoCard>

        {/* Blog Ticker (Span 6) */}
        <BentoCard colSpan={6} className="p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Latest Notes</h2>
            <span className="text-xs font-mono text-electric-blue animate-pulse">LIVE</span>
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {blogs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-xl p-4">
                 <p>Cooking up new content...</p>
              </div>
            ) : (
              blogs.map(blog => (
                <div 
                  key={blog.id} 
                  onClick={() => setSelectedBlog(blog)}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer group hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                       <h3 className="font-bold text-gray-200 group-hover:text-electric-blue transition-colors">{blog.title}</h3>
                       {blog.mediaType === 'video' && <Play size={12} className="text-electric-blue" />}
                    </div>
                    <span className="text-xs text-gray-500 font-mono whitespace-nowrap ml-2">{blog.date}</span>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{blog.content}</p>
                </div>
              ))
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500">I don't have any assistant, reply may take time.</p>
          </div>
        </BentoCard>
      </BentoGrid>
    </section>
  );
};

export const PublicHome: React.FC = () => {
  const [data, setData] = useState<AppData | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getFullData().then(fetchedData => {
        setData(fetchedData);
    }).catch(() => {
        setError(true);
    });
  }, []);

  if (error) return (
      <div className="h-screen bg-cyber-black flex flex-col items-center justify-center text-white gap-4">
          <p className="text-red-500 font-mono text-xl">Error: Could not connect to Backend.</p>
          <p className="text-gray-500 text-sm">Run 'npm run server' in a terminal.</p>
      </div>
  );

  if (!data) return <div className="h-screen bg-cyber-black flex items-center justify-center text-electric-blue animate-pulse">Loading System...</div>;

  return (
    <>
      <div id="about" className="pt-8">
        <HeroBento data={data.hero} contacts={data.contacts} />
      </div>
      <ProjectsBento projects={data.projects} />
      <ContactBlogBento blogs={data.blogs} contacts={data.contacts} />
      
      <footer className="text-center py-8 text-gray-600 text-sm font-mono">
        <p>© 2024 Abhinav Kumar. Built with Next.js & Tailwind.</p>
      </footer>
    </>
  );
};
