import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiAward } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import SectionHeading from '../components/ui/SectionHeading';

const education = [
    {
        institution: 'Marwadi University',
        degree: 'B.Tech in Computer Engineering',
        period: '2025 – 2028 (Pursuing)',
        icon: <FiBookOpen size={24} />,
        highlight: true,
    },
    {
        institution: 'RK University',
        degree: 'Diploma in Computer Engineering',
        period: 'CGPA: 9.69',
        icon: <FiAward size={24} />,
        highlight: false,
    },
];

const AboutPage: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section className="min-h-screen pt-24 pb-16 px-4 mesh-bg">
            <div className="max-w-4xl mx-auto">
                <SectionHeading title="Identity & Journey" subtitle="The architectural blueprint of my professional growth" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`rounded-[32px] p-8 md:p-12 mb-16 glass premium-card ${isDark ? 'glass-dark' : 'glass-light'}`}
                >
                    <p className={`text-xl md:text-2xl leading-relaxed font-light ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                        I'm <span className="gradient-text font-black">Raj Kikani</span>, a creative technologist pushing the boundaries of
                        digital innovation from <span className="font-bold">Rajkot, Gujarat</span>. As a computer engineering student, 
                        my obsession with <span className="text-white font-medium">high-performance code</span> and <span className="text-white font-medium">striking aesthetics</span> 
                        drives me to build next-generation web platforms.
                    </p>
                </motion.div>

                <h3 className={`text-3xl font-black mb-12 flex items-center gap-4 ${isDark ? 'text-white' : 'text-black'}`}>
                    <span className="w-12 h-1 gradient-bg rounded-full"></span>
                    Education
                </h3>

                <div className="space-y-10">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className={`group relative flex flex-col md:flex-row gap-8 items-center p-8 rounded-[32px] glass transition-all duration-500 ${isDark ? 'glass-dark hover:bg-white/5' : 'glass-light hover:bg-black/5'}`}
                        >
                            <div className={`flex-shrink-0 w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:rotate-6 ${edu.highlight
                                    ? 'gradient-bg text-white shadow-primary/30'
                                    : isDark
                                        ? 'bg-white/5 text-primary-light'
                                        : 'bg-black/5 text-primary'
                                }`}>
                                {edu.icon}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-2xl font-black mb-2 tracking-tight">{edu.institution}</h4>
                                <p className={`text-lg font-semibold tracking-wide ${isDark ? 'text-accent' : 'text-primary'}`}>{edu.degree}</p>
                                <p className={`text-sm mt-3 font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>{edu.period}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
