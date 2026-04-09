import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import SectionHeading from '../components/ui/SectionHeading';
import SkeletonCard from '../components/ui/SkeletonCard';
import API from '../services/api';

interface Project {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    githubLink: string;
    liveLink: string;
    image: string;
}

const techColors: Record<string, string> = {
    Laravel: 'bg-red-500/20 text-red-400',
    PHP: 'bg-indigo-500/20 text-indigo-400',
    MySQL: 'bg-blue-500/20 text-blue-400',
    JavaScript: 'bg-yellow-500/20 text-yellow-400',
    Bootstrap: 'bg-purple-500/20 text-purple-400',
    Livewire: 'bg-pink-500/20 text-pink-400',
    AJAX: 'bg-green-500/20 text-green-400',
    React: 'bg-cyan-500/20 text-cyan-400',
    'Node.js': 'bg-lime-500/20 text-lime-400',
    TypeScript: 'bg-blue-600/20 text-blue-300',
    MongoDB: 'bg-emerald-500/20 text-emerald-400',
};

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await API.get('/projects');
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <SectionHeading title="My Projects" subtitle="A showcase of my recent work and personal projects" />

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                whileHover={{ y: -8 }}
                                className={`rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-2xl ${isDark
                                        ? 'bg-dark-card hover:shadow-primary/10'
                                        : 'bg-white shadow-md hover:shadow-primary/10'
                                    }`}
                            >
                                {/* Project Image / Placeholder */}
                                <div className="h-48 gradient-bg relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white/30 text-6xl font-bold">
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                                                className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all">
                                                <FiGithub size={20} />
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                                                className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all">
                                                <FiExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className={`text-sm mb-4 line-clamp-3 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${techColors[tech] || 'bg-gray-500/20 text-gray-400'
                                                    }`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsPage;
