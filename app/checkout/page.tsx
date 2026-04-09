/**
 * CheckoutPage - Pagina de finalizare a comenzii
 *
 * Această pagină permite utilizatorilor să completeze datele personale și de livrare
 * pentru finalizarea comenzii. Include validare formular și sumar comandă.
 *
 * Funcționalități principale:
 * - Formular cu date personale (nume, email, telefon, adresă)
 * - Validare câmpuri obligatorii
 * - Sumar comandă cu produse și total
 * - Verificare coș gol cu redirecționare
 * - Golire coș după plasarea comenzii
 * - Layout responsive cu 2 coloane (formular + sumar)
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

/**
 * Componenta CheckoutPage
 *
 * Gestionează procesul de checkout complet:
 * 1. Verifică dacă coșul este gol
 * 2. Afișează formular pentru date personale
 * 3. Afișează sumar comandă
 * 4. Procesează plasarea comenzii
 */
export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();

  // State pentru datele formularului
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    comment: ''
  });

  /**
   * Gestionează trimiterea formularului
   * Afișează confirmare, golește coșul și redirecționează la pagina principală
   *
   * @param {React.FormEvent} e - Evenimentul de submit
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Comanda a fost plasată! Vă mulțumim pentru achiziție.');
    clearCart();
    router.push('/');
  };

  /**
   * Actualizează state-ul formularului la modificarea câmpurilor
   *
   * @param {React.ChangeEvent} e - Evenimentul de change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Verificare coș gol
   * Dacă coșul este gol, afișează mesaj și buton de întoarcere
   */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">Coșul este gol</h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-zinc-800"
          >
            Înapoi la magazin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header simplu cu buton înapoi */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-zinc-600 hover:text-black"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi la magazin
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-light mb-8">Finalizare comandă</h1>

        {/* Layout cu 2 coloane: formular + sumar */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coloana stângă - Formular date personale */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-medium mb-6">Date personale</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Grid cu 2 coloane pentru prenume și nume */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-600 mb-2">Prenume *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-600 mb-2">Nume *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Email */}
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

              {/* Telefon */}
              <div>
                <label className="block text-sm text-zinc-600 mb-2">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+373 (__) ___-___"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              {/* Adresă de livrare */}
              <div>
                <label className="block text-sm text-zinc-600 mb-2">Adresa de livrare *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Strada, număr, apartament"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              {/* Grid cu 2 coloane pentru oraș și cod poștal */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-600 mb-2">Oraș *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-600 mb-2">Cod poștal *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="MD-2001"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Comentariu opțional */}
              <div>
                <label className="block text-sm text-zinc-600 mb-2">Comentariu la comandă</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-black resize-none"
                  placeholder="Informații suplimentare pentru curier"
                />
              </div>

              {/* Buton submit */}
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors mt-6"
              >
                Plasează comanda pentru {totalPrice} MDL
              </button>
            </form>
          </div>

          {/* Coloana dreaptă - Sumar comandă */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h2 className="text-xl font-medium mb-6">Comanda dumneavoastră</h2>

            {/* Lista produselor din coș */}
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-zinc-100">
                  {/* Imagine produs */}
                  <div className="relative w-20 h-20 bg-zinc-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Informații produs */}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-zinc-500">{item.price} MDL × {item.quantity}</p>
                  </div>

                  {/* Subtotal produs */}
                  <div className="text-right">
                    <p className="font-medium">{item.price * item.quantity} MDL</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Secțiunea cu totaluri */}
            <div className="space-y-2 pt-4 border-t border-zinc-200">
              {/* Subtotal produse */}
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Produse ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>{totalPrice} MDL</span>
              </div>

              {/* Livrare */}
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Livrare</span>
                <span>Gratuită</span>
              </div>

              {/* Total final */}
              <div className="flex justify-between text-lg font-medium pt-2 border-t border-zinc-200">
                <span>Total</span>
                <span>{totalPrice} MDL</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
