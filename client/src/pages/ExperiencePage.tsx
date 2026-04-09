import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import SectionHeading from '../components/ui/SectionHeading';

const responsibilities = [
    'Built admin panels with role-based access control',
    'Developed RESTful APIs for various modules',
    'Generated PDF reports for business operations',
    'Implemented AJAX workflows for seamless UX',
    'Optimized application performance and database queries',
    'Fixed critical bugs and improved code quality',
    'Collaborated using Git & GitHub for version control',
];

const ExperiencePage: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                <SectionHeading title="Experience" subtitle="My professional journey and work experience" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`rounded-2xl overflow-hidden glass ${isDark ? 'glass-dark' : 'glass-light'}`}
                >
                    {/* Company Header */}
                    <div className="gradient-bg p-8 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                                <FiBriefcase size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Fuerte Developers</h3>
                                <p className="text-white/80 font-medium">Web Developer Intern</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                            <FiCalendar size={16} />
                            <span>December 2024 – June 2025</span>
                        </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="p-8">
                        <h4 className={`text-lg font-semibold mb-6 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
                            Key Responsibilities & Achievements
                        </h4>
                        <div className="space-y-4">
                            {responsibilities.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="flex items-start gap-3"
                                >
                                    <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                    <p className={`${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ExperiencePage;
