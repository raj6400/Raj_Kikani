import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiUser, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import SectionHeading from '../components/ui/SectionHeading';
import API from '../services/api';

const ContactPage: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            await API.post('/messages', form);
            toast.success('Message sent successfully! I\'ll get back to you soon.');
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setSending(false);
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-primary ${isDark
            ? 'bg-dark-card border border-dark-border text-dark-text placeholder:text-dark-muted/60 focus:border-primary'
            : 'bg-light-card border border-light-border text-light-text placeholder:text-light-muted/60 focus:border-primary'
        }`;

    return (
        <section className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-2xl mx-auto">
                <SectionHeading title="Get In Touch" subtitle="Have a question or want to work together? Drop me a message!" />

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-2xl p-8 glass ${isDark ? 'glass-dark' : 'glass-light'}`}
                >
                    <div className="space-y-5">
                        <div className="relative">
                            <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`} />
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                className={`${inputClass} pl-11`}
                            />
                        </div>

                        <div className="relative">
                            <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`} />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className={`${inputClass} pl-11`}
                            />
                        </div>

                        <div className="relative">
                            <FiMessageSquare className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`} />
                            <input
                                type="text"
                                placeholder="Subject"
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                required
                                className={`${inputClass} pl-11`}
                            />
                        </div>

                        <textarea
                            placeholder="Your Message"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            required
                            rows={5}
                            className={inputClass}
                        />

                        <motion.button
                            type="submit"
                            disabled={sending}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {sending ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <FiSend size={18} />
                                    Send Message
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.form>
            </div>
        </section>
    );
};

export default ContactPage;
