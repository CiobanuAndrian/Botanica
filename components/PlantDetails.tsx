/**
 * PlantDetails - Modal pentru afișarea detaliilor complete ale unei plante
 *
 * Componenta afișează un modal full-screen (pe mobile) sau centrat (pe desktop)
 * cu toate informațiile detaliate despre o plantă selectată.
 *
 * Funcționalități:
 * - Modal overlay cu backdrop blur
 * - Imagine mare a plantei
 * - Informații complete: nume, descriere, îngrijire, necesități lumină/apă
 * - Buton pentru adăugare în coș
 * - Buton de închidere (X)
 * - Click pe backdrop închide modalul
 * - Responsive design (full-screen pe mobile, centrat pe desktop)
 */

'use client';

import { Plant } from '@/types/plant';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface PlantDetailsProps {
  plant: Plant | null; // Planta selectată sau null dacă modalul este închis
  onClose: () => void; // Callback pentru închiderea modalului
}

/**
 * Componenta PlantDetails
 *
 * @param {PlantDetailsProps} props
 * @param {Plant | null} props.plant - Planta de afișat (null = modal închis)
 * @param {Function} props.onClose - Funcție pentru închiderea modalului
 *
 * @example
 * <PlantDetails
 *   plant={selectedPlant}
 *   onClose={() => setSelectedPlant(null)}
 * />
 */
export default function PlantDetails({ plant, onClose }: PlantDetailsProps) {
  const { addToCart } = useCart();

  // Dacă nu există plantă selectată, nu afișa nimic
  if (!plant) return null;

  // Mapare pentru etichetele de lumină în română
  const lightLabels = { low: 'Scăzută', medium: 'Medie', high: 'Ridicată' };
  // Mapare pentru etichetele de udare în română
  const waterLabels = { low: 'Rar', medium: 'Moderat', high: 'Frecvent' };

  return (
    <>
      {/* Backdrop semi-transparent - click închide modalul */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Container modal */}
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
        {/* Buton închidere (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white z-10"
          aria-label="Închide detaliile"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Conținut scrollabil */}
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Imagine mare cu aspect ratio video */}
          <div className="aspect-video bg-zinc-50 relative">
            <Image
              src={plant.image}
              alt={plant.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Secțiunea cu informații */}
          <div className="p-8 space-y-6">
            {/* Titlu și nume latin */}
            <div>
              <h2 className="text-3xl font-light mb-1">{plant.name}</h2>
              <p className="text-zinc-500 italic">{plant.latinName}</p>
            </div>

            {/* Descriere detaliată */}
            <p className="text-zinc-700 leading-relaxed">{plant.description}</p>

            {/* Grid cu necesități (lumină și apă) */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-200">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Lumină</p>
                <p className="font-medium">{lightLabels[plant.light]}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-1">Udare</p>
                <p className="font-medium">{waterLabels[plant.water]}</p>
              </div>
            </div>

            {/* Secțiunea îngrijire */}
            <div>
              <h3 className="font-medium mb-2">Îngrijire</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{plant.care}</p>
            </div>

            {/* Footer cu preț și buton adăugare în coș */}
            <div className="flex items-center justify-between pt-4">
              <span className="text-3xl font-light">{plant.price} MDL</span>
              <button
                onClick={() => {
                  addToCart(plant);
                  onClose(); // Închide modalul după adăugare
                }}
                className="px-8 py-3 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors"
              >
                Adaugă în coș
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
