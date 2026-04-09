/**
 * Home - Pagina principală a magazinului de plante
 *
 * Aceasta este pagina de start a aplicației care afișează catalogul complet de plante.
 * Include funcționalități de filtrare și sortare pentru o experiență de cumpărături optimă.
 *
 * Funcționalități principale:
 * - Afișare grid responsive cu carduri de plante
 * - Filtrare pe categorii (Toate, Interior, Tropicale, Suculente)
 * - Sortare după: implicit, preț crescător/descrescător, nume alfabetic
 * - Deschidere modal cu detalii la click pe plantă
 * - Sidebar coș de cumpărături
 * - Optimizare performanță cu useMemo pentru filtrare/sortare
 */

'use client';

import { useState, useMemo } from 'react';
import { plants } from '@/data/plants';
import { Plant } from '@/types/plant';
import Header from '@/components/Header';
import PlantCard from '@/components/PlantCard';
import Cart from '@/components/Cart';
import PlantDetails from '@/components/PlantDetails';

// Tipuri pentru opțiunile de sortare și filtrare
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';
type FilterCategory = 'all' | 'indoor' | 'outdoor' | 'succulent' | 'tropical';

/**
 * Componenta Home - Pagina principală
 *
 * Gestionează starea pentru:
 * - Deschiderea/închiderea coșului
 * - Planta selectată pentru detalii
 * - Opțiunea de sortare curentă
 * - Categoria de filtrare curentă
 */
export default function Home() {
  // State pentru controlul UI-ului
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');

  /**
   * Calculează lista filtrată și sortată de plante
   * Folosește useMemo pentru optimizare - recalculează doar când se schimbă sortBy sau filterCategory
   *
   * Proces:
   * 1. Filtrează plantele după categoria selectată
   * 2. Sortează rezultatul după criteriul selectat
   */
  const filteredAndSortedPlants = useMemo(() => {
    let result = [...plants];

    // Filtrare după categorie
    if (filterCategory !== 'all') {
      result = result.filter(plant => plant.category === filterCategory);
    }

    // Sortare după criteriul selectat
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      // 'default' - păstrează ordinea originală din array
    }

    return result;
  }, [sortBy, filterCategory]);

  return (
    <div className="min-h-screen">
      {/* Header cu logo și buton coș */}
      <Header onCartClick={() => setIsCartOpen(true)} />

      {/* Conținut principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Titlu și descriere */}
        <div className="mb-8">
          <h2 className="text-3xl font-light mb-2">Colecția de plante</h2>
          <p className="text-zinc-600">Alegeți planta perfectă pentru casa dumneavoastră</p>
        </div>

        {/* Controale de filtrare și sortare */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Butoane filtrare categorii */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(['all', 'indoor', 'tropical', 'succulent'] as FilterCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  filterCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-white border border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {/* Traducere etichete categorii în română */}
                {cat === 'all' ? 'Toate' : cat === 'indoor' ? 'Interior' : cat === 'tropical' ? 'Tropicale' : 'Suculente'}
              </button>
            ))}
          </div>

          {/* Dropdown sortare */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 bg-white border border-zinc-200 rounded-full text-sm focus:outline-none focus:border-zinc-400"
          >
            <option value="default">Implicit</option>
            <option value="price-asc">Preț: crescător</option>
            <option value="price-desc">Preț: descrescător</option>
            <option value="name">După nume</option>
          </select>
        </div>

        {/* Grid cu carduri de plante - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedPlants.map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onDetailsClick={setSelectedPlant}
            />
          ))}
        </div>

        {/* Mesaj când nu sunt rezultate */}
        {filteredAndSortedPlants.length === 0 && (
          <div className="text-center py-16 text-zinc-400">
            Nu s-au găsit plante
          </div>
        )}
      </main>

      {/* Componente modale */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <PlantDetails plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
    </div>
  );
}
