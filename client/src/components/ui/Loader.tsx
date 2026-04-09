import React from 'react';

const Loader: React.FC = () => (
    <div className="flex items-center justify-center min-h-[40vh]">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/30 rounded-full animate-spin border-t-primary" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-accent opacity-20" />
        </div>
    </div>
);

export default React.memo(Loader);
