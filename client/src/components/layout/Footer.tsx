import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const Footer: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <footer className={`py-12 border-t mt-20 ${isDark ? 'border-white/5 bg-black/20' : 'border-black/5 bg-white/20'} glass`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-black gradient-text">Raj Kikani</p>
                        <p className={`text-sm font-medium tracking-widest uppercase ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                            Future-Ready Developer
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="https://github.com/raj6400" target="_blank" rel="noopener noreferrer"
                            className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/5 text-white/50 hover:text-white' : 'bg-black/5 text-black/50 hover:text-black'}`}>
                            <FiGithub size={22} />
                        </a>
                        <a href="https://www.linkedin.com/in/raj-kikani-5932a328b" target="_blank" rel="noopener noreferrer"
                            className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/5 text-white/50 hover:text-white' : 'bg-black/5 text-black/50 hover:text-black'}`}>
                            <FiLinkedin size={22} />
                        </a>
                        <a href="mailto:mayurchavda@email.com"
                            className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/5 text-white/50 hover:text-white' : 'bg-black/5 text-black/50 hover:text-black'}`}>
                            <FiMail size={22} />
                        </a>
                    </div>

                    <p className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                        ESTABLISHED 2024 <span className="text-red-500/50">•</span> RAJ KIKANI © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
