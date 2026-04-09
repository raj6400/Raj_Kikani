import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiMessageSquare, FiStar, FiPlus, FiTrash2, FiEdit, FiLogOut, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Loader from '../components/ui/Loader';

interface Project {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    githubLink: string;
    liveLink: string;
}

interface Skill {
    _id: string;
    name: string;
    level: number;
}

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

type Tab = 'dashboard' | 'projects' | 'skills' | 'messages';

const AdminPage: React.FC = () => {
    const [tab, setTab] = useState<Tab>('dashboard');
    const [projects, setProjects] = useState<Project[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [projectForm, setProjectForm] = useState({
        title: '', description: '', technologies: '', githubLink: '', liveLink: '',
    });
    const [skillForm, setSkillForm] = useState({ name: '', level: 80 });
    const { theme } = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const isDark = theme === 'dark';

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const [pRes, sRes, mRes] = await Promise.all([
                API.get('/projects'),
                API.get('/skills'),
                API.get('/messages'),
            ]);
            setProjects(pRes.data);
            setSkills(sRes.data);
            setMessages(mRes.data);
        } catch (error) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...projectForm,
            technologies: projectForm.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        };
        try {
            if (editingProject) {
                await API.put(`/projects/${editingProject._id}`, payload);
                toast.success('Project updated!');
            } else {
                await API.post('/projects', payload);
                toast.success('Project added!');
            }
            setShowProjectForm(false);
            setEditingProject(null);
            setProjectForm({ title: '', description: '', technologies: '', githubLink: '', liveLink: '' });
            fetchAll();
        } catch {
            toast.error('Failed to save project');
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm('Delete this project?')) return;
        try {
            await API.delete(`/projects/${id}`);
            toast.success('Project deleted');
            fetchAll();
        } catch {
            toast.error('Failed to delete project');
        }
    };

    const handleEditProject = (p: Project) => {
        setEditingProject(p);
        setProjectForm({
            title: p.title,
            description: p.description,
            technologies: p.technologies.join(', '),
            githubLink: p.githubLink,
            liveLink: p.liveLink,
        });
        setShowProjectForm(true);
    };

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post('/skills', skillForm);
            toast.success('Skill added!');
            setSkillForm({ name: '', level: 80 });
            fetchAll();
        } catch {
            toast.error('Failed to add skill');
        }
    };

    const handleDeleteSkill = async (id: string) => {
        try {
            await API.delete(`/skills/${id}`);
            toast.success('Skill deleted');
            fetchAll();
        } catch {
            toast.error('Failed to delete skill');
        }
    };

    const handleDeleteMessage = async (id: string) => {
        try {
            await API.delete(`/messages/${id}`);
            toast.success('Message deleted');
            fetchAll();
        } catch {
            toast.error('Failed to delete message');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out');
    };

    const cardClass = `rounded-3xl p-8 glass premium-card ${isDark ? 'glass-dark' : 'glass-light'}`;
    const inputClass = `w-full px-6 py-4 rounded-2xl outline-none text-sm transition-all focus:ring-2 focus:ring-primary ${
        isDark ? 'bg-white/5 border border-white/10 text-white' : 'bg-black/5 border border-black/10 text-black'
    }`;

    const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
        { key: 'dashboard', label: 'Dashboard', icon: <FiFolder /> },
        { key: 'projects', label: 'Projects', icon: <FiFolder /> },
        { key: 'skills', label: 'Skills', icon: <FiStar /> },
        { key: 'messages', label: 'Messages', icon: <FiMessageSquare /> },
    ];

    if (loading) return <div className="pt-24"><Loader /></div>;

    return (
        <section className="min-h-screen pt-32 pb-16 px-4 mesh-bg">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6 p-8 rounded-[32px] glass glass-dark">
                    <h1 className="text-4xl font-black gradient-text tracking-tighter uppercase">Admin Core</h1>
                    <button onClick={handleLogout}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-black uppercase tracking-widest shadow-2xl">
                        <FiLogOut /> Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                                tab === t.key
                                    ? 'bg-white text-black shadow-2xl scale-105'
                                    : isDark
                                        ? 'text-white/40 hover:text-white hover:bg-white/5'
                                        : 'text-black/40 hover:text-black hover:bg-black/5'
                            }`}
                        >
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {/* Dashboard Stats */}
                {tab === 'dashboard' && (
                    <div className="grid sm:grid-cols-3 gap-8">
                        {[
                            { label: 'Intelligence', sub: 'Projects', value: projects.length, color: 'from-blue-600 to-indigo-600', icon: <FiFolder size={32} /> },
                            { label: 'Capabilities', sub: 'Skills', value: skills.length, color: 'from-emerald-500 to-teal-500', icon: <FiStar size={32} /> },
                            { label: 'Network', sub: 'Messages', value: messages.length, color: 'from-orange-500 to-red-500', icon: <FiMessageSquare size={32} /> },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-[40px] p-8 glass premium-card ${isDark ? 'glass-dark' : 'glass-light'} shadow-2xl group hover:-translate-y-2 transition-transform duration-500`}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`p-5 rounded-3xl bg-gradient-to-br ${stat.color} text-white shadow-2xl transition-transform duration-500 group-hover:rotate-6`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40`}>{stat.label}</p>
                                        <p className="text-sm font-bold opacity-60">{stat.sub}</p>
                                    </div>
                                </div>
                                <p className="text-7xl font-black tracking-tighter">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Projects Tab */}
                {tab === 'projects' && (
                    <div>
                        <button
                            onClick={() => { setShowProjectForm(true); setEditingProject(null); setProjectForm({ title: '', description: '', technologies: '', githubLink: '', liveLink: '' }); }}
                            className="flex items-center gap-3 px-8 py-4 rounded-2xl gradient-bg text-white text-xs font-black uppercase tracking-widest mb-10 shadow-2xl hover:scale-105 transition-transform"
                        >
                            <FiPlus /> Add New Project
                        </button>

                        {showProjectForm && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`${cardClass} mb-12`}>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-black uppercase tracking-tight">{editingProject ? 'Modify Project' : 'New Project'}</h3>
                                    <button onClick={() => setShowProjectForm(false)} className="p-3 rounded-xl bg-red-500/10 text-red-500"><FiX size={20} /></button>
                                </div>
                                <form onSubmit={handleProjectSubmit} className="space-y-6">
                                    <input placeholder="Project Title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required className={inputClass} />
                                    <textarea placeholder="Describe the mission" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} required rows={4} className={inputClass} />
                                    <input placeholder="Technologies (comma-separated)" value={projectForm.technologies} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })} required className={inputClass} />
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <input placeholder="GitHub URL" value={projectForm.githubLink} onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })} className={inputClass} />
                                        <input placeholder="Production URL" value={projectForm.liveLink} onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })} className={inputClass} />
                                    </div>
                                    <button type="submit" className="w-full py-5 rounded-2xl gradient-bg text-white text-sm font-black uppercase tracking-[0.3em] shadow-2xl">
                                        {editingProject ? 'Apply Changes' : 'Initialize Project'}
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        <div className="space-y-6">
                            {projects.map((p) => (
                                <div key={p._id} className={`${cardClass} flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-white/5 transition-colors`}>
                                    <div className="flex-1 text-center md:text-left">
                                        <h4 className="text-2xl font-black tracking-tight mb-2 group-hover:gradient-text transition-all">{p.title}</h4>
                                        <p className={`text-sm font-medium leading-relaxed opacity-60`}>{p.description}</p>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-6">
                                            {p.technologies.map((t) => (
                                                <span key={t} className="px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-white/60">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-shrink-0">
                                        <button onClick={() => handleEditProject(p)} className="p-5 rounded-2xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 shadow-xl"><FiEdit size={20} /></button>
                                        <button onClick={() => handleDeleteProject(p._id)} className="p-5 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-xl"><FiTrash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills Tab */}
                {tab === 'skills' && (
                    <div>
                        <form onSubmit={handleAddSkill} className={`${cardClass} mb-10 flex flex-col md:flex-row gap-6 items-end`}>
                            <div className="flex-[2] w-full">
                                <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40">Skill Designation</label>
                                <input placeholder="e.g. REACT JS" value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} required className={inputClass} />
                            </div>
                            <div className="flex-1 w-full">
                                <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40">Potency (%)</label>
                                <input type="number" min={0} max={100} value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })} className={inputClass} />
                            </div>
                            <button type="submit" className="w-full md:w-auto px-10 py-5 rounded-2xl gradient-bg text-white text-xs font-black uppercase tracking-[0.2em] shadow-2xl">
                                <FiPlus className="inline mr-2" /> Insert Skill
                            </button>
                        </form>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {skills.map((s) => (
                                <div key={s._id} className={`${cardClass} flex flex-col items-center group transition-all duration-500`}>
                                    <p className="font-black text-xs tracking-widest mb-6 group-hover:scale-110 transition-transform">{s.name.toUpperCase()}</p>
                                    <div className="relative w-full h-2 rounded-full bg-white/5 overflow-hidden ring-1 ring-white/5">
                                        <motion.div 
                                          initial={{ width: 0 }}
                                          animate={{ width: `${s.level}%` }}
                                          className="h-full gradient-bg rounded-full shadow-lg"
                                        />
                                    </div>
                                    <div className="flex w-full justify-between items-center mt-6">
                                        <span className="text-[10px] font-black opacity-40">{s.level}%</span>
                                        <button onClick={() => handleDeleteSkill(s._id)} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20">
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages Tab */}
                {tab === 'messages' && (
                    <div className="space-y-6">
                        {messages.length === 0 && (
                            <div className={`${cardClass} text-center py-24`}>
                                <div className="text-6xl opacity-10 mb-6">📭</div>
                                <p className="font-black uppercase tracking-[0.3em] opacity-40">No incoming transmissions</p>
                            </div>
                        )}
                        {messages.map((m) => (
                            <div key={m._id} className={`${cardClass} group hover:bg-white/5 transition-colors`}>
                                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-black tracking-tight mb-2 group-hover:gradient-text transition-all">{m.subject}</h4>
                                        <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest opacity-60">
                                            <span className="text-primary-light">EXP: {m.name}</span>
                                            <span>SRC: {m.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black opacity-30 tracking-widest">
                                            {new Date(m.createdAt).toLocaleDateString()}
                                        </span>
                                        <button onClick={() => handleDeleteMessage(m._id)} className="p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-xl">
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm font-medium leading-relaxed opacity-70 p-6 rounded-2xl bg-white/5 border border-white/5">{m.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminPage;
