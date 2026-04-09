/**
 * Header - Componenta pentru antetul aplicației
 *
 * Afișează logo-ul magazinului și butonul pentru coșul de cumpărături.
 * Header-ul este sticky (rămâne vizibil la scroll) și are efect de blur.
 *
 * Funcționalități:
 * - Logo "BOTANICA" cu font light și tracking wide
 * - Buton pentru coș cu badge care arată numărul de articole
 * - Design minimalist cu backdrop blur
 * - Responsive pe toate dimensiunile de ecran
 */

'use client';

import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onCartClick: () => void; // Callback apelat când utilizatorul dă click pe iconița coșului
}

/**
 * Componenta Header
 *
 * @param {HeaderProps} props
 * @param {Function} props.onCartClick - Funcție apelată la click pe butonul coșului
 *
 * @example
 * <Header onCartClick={() => setIsCartOpen(true)} />
 */
export default function Header({ onCartClick }: HeaderProps) {
  // Obține numărul total de articole din coș folosind hook-ul useCart
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo magazinului */}
          <h1 className="text-xl font-light tracking-wide">BOTANICA</h1>

          {/* Buton coș de cumpărături */}
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-zinc-100 rounded-full transition-colors"
            aria-label="Deschide coșul de cumpărături"
          >
            {/* Iconița SVG pentru coș */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>

            {/* Badge cu numărul de articole - afișat doar dacă există articole în coș */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
