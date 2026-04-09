import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSun, FiMoon, FiUser } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const isDark = theme === 'dark';

    return (
        <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl glass ${isDark ? 'glass-dark' : 'glass-light'} shadow-2xl`}>
            <div className="px-6 sm:px-10">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="text-2xl font-black gradient-text tracking-tighter hover:scale-105 transition-transform">
                        {'<RK />'}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${location.pathname === link.path
                                    ? 'bg-white text-black shadow-lg'
                                    : isDark
                                        ? 'text-white/50 hover:text-white hover:bg-white/5'
                                        : 'text-black/50 hover:text-black hover:bg-black/5'
                                    }`}
                            >
                                {link.name.toUpperCase()}
                            </Link>
                        ))}
                        <div className="w-px h-6 bg-white/10 mx-2" />
                        <div className="flex items-center gap-1">
                            <button
                                onClick={toggleTheme}
                                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                className={`p-3 rounded-xl transition-all duration-300 ${isDark ? 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20' : 'bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20'
                                    }`}
                            >
                                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                            </button>
                            <Link
                                to="/admin-login"
                                title="Admin Login"
                                className={`p-3 rounded-xl transition-all duration-300 ${
                                    isDark ? 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10' : 'bg-black/5 text-black/50 hover:text-black hover:bg-black/10'
                                }`}
                            >
                                <FiUser size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <Link
                            to="/admin-login"
                            className={`p-3 rounded-xl ${isDark ? 'bg-white/5 text-white' : 'bg-black/5 text-black'}`}
                        >
                            <FiUser size={20} />
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-3 rounded-xl ${isDark ? 'bg-white/5 text-white' : 'bg-black/5 text-black'}`}
                        >
                            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`absolute top-full left-0 right-0 mt-4 rounded-3xl glass overflow-hidden ${isDark ? 'glass-dark' : 'glass-light'}`}
                    >
                        <div className="px-6 py-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-6 py-4 rounded-2xl text-lg font-bold transition-all ${location.pathname === link.path
                                        ? 'bg-white text-black'
                                        : isDark
                                            ? 'text-white/50 hover:text-white hover:bg-white/5'
                                            : 'text-black/50 hover:text-black hover:bg-black/5'
                                        }`}
                                >
                                    {link.name.toUpperCase()}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
