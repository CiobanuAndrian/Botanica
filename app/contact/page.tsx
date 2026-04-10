'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mesajul tău a fost trimis! Îți vom răspunde în curând.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light mb-8">Contactează-ne</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formular Contact */}
          <div>
            <h2 className="text-2xl font-medium mb-6">Trimite-ne un mesaj</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-600 mb-2">Nume *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-600 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-600 mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+373 (__) ___-___"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-600 mb-2">Mesaj *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black resize-none"
                  placeholder="Scrie-ne mesajul tău aici..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors"
              >
                Trimite mesajul
              </button>
            </form>
          </div>

          {/* Informații Contact */}
          <div>
            <h2 className="text-2xl font-medium mb-6">Informații de contact</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </h3>
                <a href="mailto:contact@botanica.md" className="text-zinc-600 hover:text-black">
                  contact@botanica.md
                </a>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Telefon
                </h3>
                <a href="tel:+37360123456" className="text-zinc-600 hover:text-black">
                  +373 60 123 456
                </a>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Adresă
                </h3>
                <p className="text-zinc-600">
                  Str. Florilor 25<br />
                  Chișinău, MD-2001<br />
                  Moldova
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Program
                </h3>
                <p className="text-zinc-600">
                  Luni - Vineri: 09:00 - 18:00<br />
                  Sâmbătă: 10:00 - 16:00<br />
                  Duminică: Închis
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-white border border-black text-black rounded-full hover:bg-black hover:text-white transition-colors"
              >
                Înapoi la magazin
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
