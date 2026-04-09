/**
 * PlantCard - Componenta card pentru afișarea unei plante
 *
 * Afișează informațiile de bază ale unei plante într-un format card compact.
 * Include imagine, nume, descriere scurtă, preț și buton de adăugare în coș.
 *
 * Funcționalități:
 * - Imagine cu efect hover (zoom)
 * - Click pe imagine deschide detaliile plantei
 * - Buton pentru adăugare rapidă în coș
 * - Design responsive și minimalist
 * - Animații smooth la hover
 */

'use client';

import { Plant } from '@/types/plant';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface PlantCardProps {
  plant: Plant; // Datele plantei de afișat
  onDetailsClick: (plant: Plant) => void; // Callback pentru deschiderea detaliilor
}

/**
 * Componenta PlantCard
 *
 * @param {PlantCardProps} props
 * @param {Plant} props.plant - Obiectul cu datele plantei
 * @param {Function} props.onDetailsClick - Funcție apelată când se dă click pe imagine
 *
 * @example
 * <PlantCard
 *   plant={plantData}
 *   onDetailsClick={(plant) => setSelectedPlant(plant)}
 * />
 */
export default function PlantCard({ plant, onDetailsClick }: PlantCardProps) {
  // Obține funcția addToCart din context
  const { addToCart } = useCart();

  return (
    <div className="group bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Container imagine cu aspect ratio pătrat */}
      <div className="aspect-square bg-zinc-50 relative cursor-pointer overflow-hidden" onClick={() => onDetailsClick(plant)}>
        <Image
          src={plant.image}
          alt={plant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Secțiunea cu informații */}
      <div className="p-4 space-y-3">
        {/* Nume plantă */}
        <div>
          <h3 className="font-medium text-lg">{plant.name}</h3>
          <p className="text-sm text-zinc-500 italic">{plant.latinName}</p>
        </div>

        {/* Descriere scurtă - limitată la 2 linii */}
        <p className="text-sm text-zinc-600 line-clamp-2">{plant.description}</p>

        {/* Footer cu preț și buton */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-light">{plant.price} MDL</span>
          <button
            onClick={() => addToCart(plant)}
            className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-zinc-800 transition-colors"
          >
            Adaugă în coș
          </button>
        </div>
      </div>
    </div>
  );
}
