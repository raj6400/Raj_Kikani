import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const HomePage: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 mesh-bg">
            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="mb-8"
                    >
                        <div className="w-40 h-40 mx-auto rounded-3xl gradient-bg flex items-center justify-center text-white text-5xl font-black shadow-[0_20px_50px_rgba(139,92,246,0.3)] rotate-3 hover:rotate-0 transition-transform duration-500">
                            RK
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, tracking: 10 }}
                        animate={{ opacity: 1, tracking: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`text-sm font-bold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-accent' : 'text-primary'}`}
                    >
                        CREATIVE DEVELOPER
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
                    >
                        <span className="gradient-text">Raj Kikani</span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className={`text-2xl md:text-3xl font-light mb-8 max-w-2xl mx-auto ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}
                    >
                        Crafting <span className="text-white font-medium">Digital Experiences</span> that define the future.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
                    >
                        <Link
                            to="/projects"
                            className="group relative px-10 py-4 rounded-2xl bg-white text-black font-bold shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <span className="relative z-10">EXPLORE WORK</span>
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity" />
                        </Link>
                        <Link
                            to="/contact"
                            className={`px-10 py-4 rounded-2xl font-bold border-2 transition-all duration-300 hover:bg-white/5 ${isDark
                                ? 'border-white/10 text-white'
                                : 'border-black/10 text-black'
                                }`}
                        >
                            LET'S TALK
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center justify-center gap-6"
                    >
                        <a href="https://github.com/raj6400" target="_blank" rel="noopener noreferrer"
                            className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${isDark ? 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10' : 'bg-black/5 text-black/50 hover:text-black hover:bg-black/10'}`}>
                            <FiGithub size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/raj-kikani-5932a328b" target="_blank" rel="noopener noreferrer"
                            className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${isDark ? 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10' : 'bg-black/5 text-black/50 hover:text-black hover:bg-black/10'}`}>
                            <FiLinkedin size={24} />
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={isDark ? 'text-white/20' : 'text-black/20'}
                >
                    <FiArrowDown size={32} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HomePage;
