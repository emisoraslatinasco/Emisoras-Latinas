'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // FormSubmit.co — envío real sin backend. El primer envío dispara un
      // correo de activación de FormSubmit a emisoraslatinasco@gmail.com que
      // hay que confirmar una sola vez.
      const res = await fetch('https://formsubmit.co/ajax/emisoraslatinasco@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `${formData.message}\n\nAsunto: ${formData.subject}`,
          _subject: `Contacto Emisoras Latinas: ${formData.subject}`,
        }),
      });

      if (!res.ok) throw new Error('Error al enviar');

      alert(`✅ ¡Gracias ${formData.name}!\n\nTu mensaje ha sido enviado. Te responderemos pronto a ${formData.email}.`);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      alert('Hubo un error al enviar. Intenta de nuevo o escríbenos a emisoraslatinasco@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="glass-effect rounded-2xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        <i className="fas fa-paper-plane text-blue-400 mr-2"></i>
        Envíanos un Mensaje
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
            Nombre Completo <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Ej: Juan Pérez"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
            Correo Electrónico <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-slate-300 mb-2">
            Asunto <span className="text-red-400">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">Selecciona un asunto</option>
            <option value="soporte">Soporte Técnico</option>
            <option value="sugerencia">Sugerencia de Emisora</option>
            <option value="problema">Reportar Problema</option>
            <option value="publicidad">Publicidad / Alianzas</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
            Mensaje <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Escribe tu mensaje aquí..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'} mr-2`}></i>
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>

        <p className="text-slate-500 text-xs text-center">
          <i className="fas fa-info-circle mr-1"></i>
          Los campos marcados con <span className="text-red-400">*</span> son obligatorios
        </p>
      </form>
    </section>
  );
}
