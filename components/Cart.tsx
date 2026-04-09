/**
 * Cart - Componenta pentru coșul de cumpărături (sidebar)
 *
 * Afișează un sidebar glisant din dreapta cu conținutul coșului de cumpărături.
 * Include lista produselor, controale pentru cantitate, total și buton de checkout.
 *
 * Funcționalități:
 * - Sidebar glisant cu animație
 * - Lista produselor cu imagini și prețuri
 * - Butoane +/- pentru modificarea cantității
 * - Buton de ștergere pentru fiecare produs
 * - Calcul automat al totalului
 * - Buton "Finalizează comanda" care redirecționează la checkout
 * - Buton "Golește coșul"
 * - Mesaj când coșul este gol
 * - Click pe backdrop închide sidebar-ul
 */

'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CartProps {
  isOpen: boolean; // Controlează dacă sidebar-ul este deschis
  onClose: () => void; // Callback pentru închiderea sidebar-ului
}

/**
 * Componenta Cart
 *
 * @param {CartProps} props
 * @param {boolean} props.isOpen - Starea de deschidere a sidebar-ului
 * @param {Function} props.onClose - Funcție pentru închiderea sidebar-ului
 *
 * @example
 * <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
 */
export default function Cart({ isOpen, onClose }: CartProps) {
  // Obține funcțiile și datele din context
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const router = useRouter();

  /**
   * Gestionează procesul de checkout
   * Închide sidebar-ul și navighează la pagina de checkout
   */
  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  // Dacă sidebar-ul este închis, nu afișa nimic
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop semi-transparent - click închide sidebar-ul */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Sidebar container */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h2 className="text-xl font-light">Coș</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full" aria-label="Închide coșul">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conținut - afișează mesaj dacă coșul este gol sau lista produselor */}
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-zinc-400">
            Coșul este gol
          </div>
        ) : (
          <>
            {/* Lista produselor - scrollabil */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
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

                  {/* Informații produs și controale cantitate */}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-zinc-500">{item.price} MDL</p>

                    {/* Controale cantitate (+/-) */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 border border-zinc-300 rounded-full hover:bg-zinc-100"
                        aria-label="Scade cantitatea"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border border-zinc-300 rounded-full hover:bg-zinc-100"
                        aria-label="Crește cantitatea"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Buton ștergere produs */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-400 hover:text-zinc-600"
                    aria-label="Șterge din coș"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer cu total și butoane */}
            <div className="p-6 border-t border-zinc-200 space-y-4">
              {/* Afișare total */}
              <div className="flex justify-between text-lg">
                <span>Total:</span>
                <span className="font-medium">{totalPrice} MDL</span>
              </div>

              {/* Buton finalizare comandă */}
              <button onClick={handleCheckout} className="w-full py-3 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors">
                Finalizează comanda
              </button>

              {/* Buton golire coș */}
              <button
                onClick={clearCart}
                className="w-full py-2 text-sm text-zinc-500 hover:text-zinc-700"
              >
                Golește coșul
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
