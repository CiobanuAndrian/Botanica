/**
 * Interfața Plant definește structura datelor pentru o plantă din magazin
 *
 * @interface Plant
 * @property {number} id - Identificator unic al plantei
 * @property {string} name - Numele comun al plantei (ex: "Monstera")
 * @property {string} latinName - Numele științific latin (ex: "Monstera deliciosa")
 * @property {number} price - Prețul în MDL (lei moldovenești)
 * @property {string} image - URL-ul imaginii plantei
 * @property {string} description - Descriere detaliată a plantei
 * @property {string} care - Instrucțiuni de îngrijire
 * @property {'low' | 'medium' | 'high'} light - Necesarul de lumină (scăzut/mediu/ridicat)
 * @property {'low' | 'medium' | 'high'} water - Necesarul de apă (rar/moderat/frecvent)
 * @property {'indoor' | 'outdoor' | 'succulent' | 'tropical'} category - Categoria plantei
 */
export interface Plant {
  id: number;
  name: string;
  latinName: string;
  price: number;
  image: string;
  description: string;
  care: string;
  light: 'low' | 'medium' | 'high';
  water: 'low' | 'medium' | 'high';
  category: 'indoor' | 'outdoor' | 'succulent' | 'tropical';
}

/**
 * Interfața CartItem extinde Plant și adaugă cantitatea pentru coșul de cumpărături
 *
 * @interface CartItem
 * @extends Plant
 * @property {number} quantity - Cantitatea produsului în coș
 */
export interface CartItem extends Plant {
  quantity: number;
}
