import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SectionHeading from '../components/ui/SectionHeading';
import Loader from '../components/ui/Loader';
import API from '../services/api';

interface Skill {
    _id: string;
    name: string;
    level: number;
}

const skillIcons: Record<string, string> = {
    HTML: '🌐', CSS: '🎨', JavaScript: '⚡', TypeScript: '💎',
    React: '⚛️', 'Node.js': '🟢', Express: '🚂', MongoDB: '🍃',
    Laravel: '🔺', PHP: '🐘', MySQL: '🗄️', Bootstrap: '🅱️',
    Git: '📦', GitHub: '🐙',
};

const SkillsPage: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const { data } = await API.get('/skills');
                setSkills(data);
            } catch (error) {
                console.error('Failed to fetch skills:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) return <div className="pt-24"><Loader /></div>;

    return (
        <section className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <SectionHeading title="My Skills" subtitle="Technologies and tools I work with" />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill._id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`rounded-2xl p-5 text-center cursor-default transition-all duration-300 group ${isDark
                                    ? 'bg-dark-card hover:bg-dark-border/60 hover:shadow-lg hover:shadow-primary/10'
                                    : 'bg-light-card hover:bg-white hover:shadow-lg hover:shadow-primary/10'
                                }`}
                        >
                            <div className="text-3xl mb-3">{skillIcons[skill.name] || '💻'}</div>
                            <h3 className="font-semibold mb-3 text-sm">{skill.name}</h3>

                            {/* Progress bar */}
                            <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-dark-border' : 'bg-light-border'}`}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: 'easeOut' }}
                                    className="h-full rounded-full gradient-bg"
                                />
                            </div>
                            <p className={`text-xs mt-2 font-medium ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                                {skill.level}%
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsPage;
