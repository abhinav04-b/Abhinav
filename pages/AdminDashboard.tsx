import React, { useState, useEffect } from 'react';
// Updated imports to use API services
import { getFullData, updateHero, addProject, deleteProject, addBlog, deleteBlog } from '../services/api';
import { AppData, Project, BlogPost } from '../types';
import { Save, Trash2, Plus, RefreshCcw, Layout, Briefcase, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Shared Components ---
const Input = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="mb-4">
    <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2 tracking-wider">{label}</label>
    <input {...props} className="w-full bg-cyber-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric-blue transition-colors" />
  </div>
);

const TextArea = ({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <div className="mb-4">
    <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2 tracking-wider">{label}</label>
    <textarea {...props} className="w-full bg-cyber-900 border border-white/10 rounded-lg px-4 py-2 text-white h-24 focus:outline-none focus:border-electric-blue transition-colors" />
  </div>
);

const Select = ({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) => (
    <div className="mb-4">
      <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2 tracking-wider">{label}</label>
      <select {...props} className="w-full bg-cyber-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric-blue transition-colors">
          {children}
      </select>
    </div>
);

const Button = ({ children, variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'danger' | 'ghost' }) => {
  const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm";
  const variants = {
    primary: "bg-electric-blue hover:bg-blue-600 text-white shadow-lg shadow-blue-900/20",
    danger: "bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white"
  };
  return <button {...props} className={`${baseStyle} ${variants[variant]}`}>{children}</button>;
};

// --- Tabs ---

const HeroEditor = ({ data, refresh }: { data: AppData; refresh: () => void }) => {
  const [formData, setFormData] = useState(data.hero);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHero(formData);
    refresh();
    alert('Hero updated successfully');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
      <h3 className="text-xl font-bold text-white mb-6">Hero Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Display Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <Input label="Subtitle" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} />
      </div>
      <Input label="Status (Green Dot Text)" value={formData.status || ''} onChange={e => setFormData({ ...formData, status: e.target.value })} />
      <Input label="Photo URL" value={formData.photoUrl} onChange={e => setFormData({ ...formData, photoUrl: e.target.value })} />
      <TextArea label="Bio" value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
      <div className="flex justify-end mt-4">
        <Button type="submit"><Save size={16} /> Save Changes</Button>
      </div>
    </form>
  );
};

const ProjectsManager = ({ data, refresh }: { data: AppData; refresh: () => void }) => {
  const [newProject, setNewProject] = useState<Partial<Project>>({ name: '', description: '', imageUrl: '', githubLink: '' });
  const [tags, setTags] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;
    
    await addProject({
      id: Date.now().toString(),
      name: newProject.name!,
      description: newProject.description || '',
      imageUrl: newProject.imageUrl || 'https://picsum.photos/600/400',
      githubLink: newProject.githubLink!,
      tags: tags.split(',').map(t => t.trim()).filter(t => t)
    });
    setNewProject({ name: '', description: '', imageUrl: '', githubLink: '' });
    setTags('');
    refresh();
  };

  const handleDelete = async (id: string) => {
      await deleteProject(id);
      refresh();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <h3 className="text-xl font-bold text-white mb-6">Add Project</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Project Name" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} />
          <Input label="GitHub Link" value={newProject.githubLink} onChange={e => setNewProject({ ...newProject, githubLink: e.target.value })} />
        </div>
        <Input label="Image URL (16:9)" value={newProject.imageUrl} onChange={e => setNewProject({ ...newProject, imageUrl: e.target.value })} />
        <Input label="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} placeholder="Next.js, Tailwind, MongoDB" />
        <TextArea label="Description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
        <div className="flex justify-end">
          <Button type="submit"><Plus size={16} /> Add Project</Button>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {data.projects.map(p => (
          <div key={p.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4">
            <img src={p.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg bg-black" />
            <div className="flex-1">
              <h4 className="font-bold text-white">{p.name}</h4>
              <p className="text-xs text-gray-500">{p.tags?.join(', ')}</p>
            </div>
            <Button variant="danger" onClick={() => handleDelete(p.id)} style={{ padding: '0.5rem' }}>
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogManager = ({ data, refresh }: { data: AppData; refresh: () => void }) => {
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({ 
      title: '', 
      content: '', 
      fullContent: '',
      mediaUrl: '',
      mediaType: 'image',
      caption: ''
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title) return;
    await addBlog({
      id: Date.now().toString(),
      title: newBlog.title!,
      content: newBlog.content || '',
      fullContent: newBlog.fullContent || newBlog.content,
      mediaUrl: newBlog.mediaUrl,
      mediaType: newBlog.mediaType,
      caption: newBlog.caption,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    setNewBlog({ title: '', content: '', fullContent: '', mediaUrl: '', mediaType: 'image', caption: '' });
    refresh();
  };

  const handleDelete = async (id: string) => {
      await deleteBlog(id);
      refresh();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <h3 className="text-xl font-bold text-white mb-6">Create Post</h3>
        <Input label="Title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Select 
                label="Media Type" 
                value={newBlog.mediaType} 
                onChange={e => setNewBlog({ ...newBlog, mediaType: e.target.value as 'image' | 'video' })}
             >
                <option value="image">Image</option>
                <option value="video">Video</option>
             </Select>
             <Input label="Media URL" placeholder="https://..." value={newBlog.mediaUrl} onChange={e => setNewBlog({ ...newBlog, mediaUrl: e.target.value })} />
        </div>
        <Input label="Caption (Optional)" placeholder="Brief description with emojis 📸" value={newBlog.caption} onChange={e => setNewBlog({ ...newBlog, caption: e.target.value })} />
        <TextArea label="Short Summary (Card Preview)" value={newBlog.content} onChange={e => setNewBlog({ ...newBlog, content: e.target.value })} style={{ height: 100 }} />
        <TextArea label="Full Content (Modal Body)" value={newBlog.fullContent} onChange={e => setNewBlog({ ...newBlog, fullContent: e.target.value })} style={{ height: 200 }} />
        
        <div className="flex justify-end">
          <Button type="submit"><Plus size={16} /> Publish</Button>
        </div>
      </form>

      <div className="space-y-2">
        {data.blogs.map(b => (
          <div key={b.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-start">
             <div>
                <h4 className="font-bold text-white">{b.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{b.date}</p>
             </div>
             <Button variant="danger" onClick={() => handleDelete(b.id)} style={{ padding: '0.5rem' }}>
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Dashboard ---

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'blog'>('hero');
  const [data, setData] = useState<AppData | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Fetch Data Wrapper
  const loadData = async () => {
      const fetched = await getFullData();
      setData(fetched);
  }

  useEffect(() => {
    loadData();
    // Mock Auth Check
    const session = sessionStorage.getItem('admin_session');
    if(session === 'true') setIsAuth(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(username === 'Abhinav0691' && password === 'Abhinav@mus84') {
        setIsAuth(true);
        sessionStorage.setItem('admin_session', 'true');
    } else {
        alert('Invalid Credentials');
    }
  };

  if (!isAuth) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cyber-black">
            <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl w-full max-w-sm">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
                <Input label="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="w-full bg-electric-blue text-white font-bold py-2 rounded-lg mt-4">Enter</button>
            </form>
        </div>
    )
  }

  if (!data) return <div className="text-white p-10">Connecting to Server... (Ensure npm run server is running)</div>;

  const tabs = [
    { id: 'hero', label: 'Hero', icon: Layout },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'blog', label: 'Blog', icon: PenTool },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
           <h1 className="text-3xl font-bold text-white">Dashboard</h1>
           <p className="text-gray-500">Manage your content via API.</p>
        </div>
        <Button variant="ghost" onClick={loadData}>
          <RefreshCcw size={16} /> Refresh Data
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === tab.id 
                  ? 'bg-electric-blue text-white shadow-lg shadow-blue-900/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1">
           <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
           >
             {activeTab === 'hero' && <HeroEditor data={data} refresh={loadData} />}
             {activeTab === 'projects' && <ProjectsManager data={data} refresh={loadData} />}
             {activeTab === 'blog' && <BlogManager data={data} refresh={loadData} />}
           </motion.div>
        </div>
      </div>
    </div>
  );
};
