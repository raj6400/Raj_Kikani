import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NotFoundPage: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section className="min-h-screen flex items-center justify-center px-4 pt-16">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</h1>
                <h2 className={`text-2xl md:text-3xl font-semibold mb-4 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
                    Page Not Found
                </h2>
                <p className={`text-lg mb-8 max-w-md mx-auto ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="px-8 py-3 rounded-xl gradient-bg text-white font-medium shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-300 inline-block"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </section>
    );
};

export default NotFoundPage;
