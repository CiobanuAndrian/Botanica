/**
 * CartContext - Context pentru gestionarea coșului de cumpărături
 *
 * Acest fișier implementează un context React pentru gestionarea globală a coșului de cumpărături.
 * Folosește localStorage pentru persistența datelor între sesiuni.
 *
 * Funcționalități principale:
 * - Adăugare produse în coș
 * - Ștergere produse din coș
 * - Actualizare cantități
 * - Calcul automat al totalurilor
 * - Persistență în localStorage
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Plant } from '@/types/plant';

/**
 * Tipul pentru contextul coșului de cumpărături
 *
 * @interface CartContextType
 * @property {CartItem[]} cart - Array-ul cu produsele din coș
 * @property {Function} addToCart - Funcție pentru adăugarea unei plante în coș
 * @property {Function} removeFromCart - Funcție pentru ștergerea unui produs din coș
 * @property {Function} updateQuantity - Funcție pentru actualizarea cantității
 * @property {Function} clearCart - Funcție pentru golirea completă a coșului
 * @property {number} totalItems - Numărul total de articole din coș
 * @property {number} totalPrice - Prețul total al coșului în MDL
 */
interface CartContextType {
  cart: CartItem[];
  addToCart: (plant: Plant) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Crearea contextului cu valoare inițială undefined
// Crearea contextului cu valoare inițială undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider - Componenta provider pentru contextul coșului
 *
 * Această componentă înfășoară aplicația și oferă acces la funcționalitățile coșului
 * pentru toate componentele copil.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Componentele copil care vor avea acces la context
 *
 * Funcționare:
 * 1. La montare, încarcă coșul din localStorage (dacă există)
 * 2. La fiecare modificare a coșului, salvează automat în localStorage
 * 3. Calculează automat totalItems și totalPrice
 */
export function CartProvider({ children }: { children: ReactNode }) {
  // State pentru coș și flag de încărcare
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Effect pentru încărcarea coșului din localStorage la montare
   * Rulează o singură dată când componenta este montată
   */
  useEffect(() => {
    const savedCart = localStorage.getItem('botanica-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  /**
   * Effect pentru salvarea coșului în localStorage la fiecare modificare
   * Rulează doar după ce coșul a fost încărcat inițial
   */
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('botanica-cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  /**
   * Adaugă o plantă în coș
   * Dacă planta există deja, incrementează cantitatea
   * Dacă nu există, o adaugă cu cantitatea 1
   *
   * @param {Plant} plant - Planta de adăugat
   */
  const addToCart = (plant: Plant) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === plant.id);
      if (existing) {
        // Plantă existentă - incrementează cantitatea
        return prev.map(item =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Plantă nouă - adaugă cu cantitatea 1
      return [...prev, { ...plant, quantity: 1 }];
    });
  };

  /**
   * Șterge un produs din coș pe baza ID-ului
   *
   * @param {number} id - ID-ul produsului de șters
   */
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  /**
   * Actualizează cantitatea unui produs din coș
   * Dacă cantitatea este 0 sau negativă, șterge produsul
   *
   * @param {number} id - ID-ul produsului
   * @param {number} quantity - Noua cantitate
   */
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  /**
   * Golește complet coșul de cumpărături
   */
  const clearCart = () => setCart([]);

  /**
   * Calculează numărul total de articole din coș
   * Sumează cantitățile tuturor produselor
   */
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * Calculează prețul total al coșului în MDL
   * Sumează prețul * cantitatea pentru fiecare produs
   */
  /**
   * Calculează prețul total al coșului în MDL
   * Sumează prețul * cantitatea pentru fiecare produs
   */
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Returnează provider-ul cu toate valorile și funcțiile
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook personalizat pentru accesarea contextului coșului
 *
 * Acest hook simplifică accesul la funcționalitățile coșului în componente.
 * Aruncă o eroare dacă este folosit în afara CartProvider.
 *
 * @returns {CartContextType} Obiectul cu toate funcțiile și datele coșului
 * @throws {Error} Dacă hook-ul este folosit în afara CartProvider
 *
 * @example
 * function MyComponent() {
 *   const { cart, addToCart, totalPrice } = useCart();
 *   return <div>Total: {totalPrice} MDL</div>;
 * }
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
