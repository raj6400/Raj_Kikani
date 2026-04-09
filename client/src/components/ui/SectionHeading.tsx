import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    title: string;
    subtitle?: string;
}

const SectionHeading: React.FC<Props> = ({ title, subtitle }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
    >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">{title}</span>
        </h2>
        {subtitle && <p className="text-dark-muted text-lg max-w-2xl mx-auto">{subtitle}</p>}
        <div className="w-20 h-1 gradient-bg rounded-full mx-auto mt-4" />
    </motion.div>
);

export default React.memo(SectionHeading);
