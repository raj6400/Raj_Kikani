import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SkeletonCard: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`rounded-xl p-6 animate-pulse ${isDark ? 'bg-dark-card' : 'bg-light-card'}`}>
            <div className={`h-40 rounded-lg mb-4 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`} />
            <div className={`h-5 rounded w-3/4 mb-3 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`} />
            <div className={`h-4 rounded w-full mb-2 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`} />
            <div className={`h-4 rounded w-2/3 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`} />
        </div>
    );
};

export default React.memo(SkeletonCard);
