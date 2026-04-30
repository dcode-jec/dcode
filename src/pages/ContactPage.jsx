import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // EmailJS requires Service ID, Template ID, and Public Key.
    // Ensure you replace these with your actual keys from emailjs.com
    const serviceId = 'service_x4n2jfp';
    const templateId = 'template_njaloic';
    const publicKey = 'U_79h5n1v9hXJviRY';

    emailjs.sendForm(serviceId, templateId, e.target, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, (error) => {
        console.error(error);
        setStatus('error');
      });
  };

  return (
    <main className="pt-24 min-h-screen pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <section className="max-w-4xl mx-auto px-8 relative z-10 pt-12">
        <header className="mb-12 text-center">
          <div className="font-code-display text-sm text-primary mb-4 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">folder_open</span>
            <span>~/dcode/contact</span>
            <span className="cursor-blink">_</span>
          </div>
          <h1 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-surface mb-4">Initialize <span className="text-primary">Connection</span></h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto">
            Have a question, collaboration idea, or just want to ping us? Drop a message below or email us directly at <a href="mailto:dcode.jec@gmail.com" className="text-primary hover:underline">dcode.jec@gmail.com</a>.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-code-display text-on-surface-variant">Name / Identifier</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-surface-container-high border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-code-display text-on-surface-variant">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-surface-container-high border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-code-display text-on-surface-variant">Message Payload</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-surface-container-high border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-y"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-white/5">
              <div className="text-sm font-code-display">
                {status === 'sending' && <span className="text-tertiary animate-pulse">Sending payload...</span>}
                {status === 'success' && <span className="text-green-400">Connection successful! Message delivered.</span>}
                {status === 'error' && <span className="text-error">Transmission failed. Please check keys or try again.</span>}
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto bg-primary text-on-primary font-code-display font-bold px-8 py-3 rounded-lg hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Execute <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </main>
  );
};

export default ContactPage;
