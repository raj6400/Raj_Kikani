import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Login successful!');
            navigate('/admin-dashboard');
        } catch {
            toast.error('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-primary ${isDark
        ? 'bg-dark-card border border-dark-border text-dark-text placeholder:text-dark-muted/60'
        : 'bg-light-card border border-light-border text-light-text placeholder:text-light-muted/60'
        }`;

    return (
        <section className="min-h-screen flex items-center justify-center px-4 pt-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full max-w-md rounded-2xl p-8 glass ${isDark ? 'glass-dark' : 'glass-light'}`}
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center text-white mb-4">
                        <FiLock size={28} />
                    </div>
                    <h2 className="text-2xl font-bold gradient-text">Admin Login</h2>
                    <p className={`text-sm mt-2 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                        Sign in to manage your portfolio
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`${inputClass} pl-11`}
                        />
                    </div>
                    <div className="relative">
                        <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`${inputClass} pl-11`}
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Sign In'
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
};

export default AdminLogin;
