'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function TermeniPage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light mb-8">Termeni și condiții</h1>

        <div className="space-y-6 text-zinc-700">
          <p className="text-sm text-zinc-500">Ultima actualizare: 10 aprilie 2026</p>

          <section>
            <h2 className="text-2xl font-medium mb-4">1. Introducere</h2>
            <p className="leading-relaxed">
              Bine ați venit la BOTANICA! Prin accesarea și utilizarea site-ului nostru,
              sunteți de acord cu termenii și condițiile prezentate mai jos. Vă rugăm să
              citiți cu atenție aceste condiții înainte de a efectua o comandă.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">2. Produse și prețuri</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Toate plantele sunt fotografiate și descrise cât mai fidel posibil.</li>
              <li>Prețurile sunt afișate în MDL (lei moldovenești) și includ TVA.</li>
              <li>Ne rezervăm dreptul de a modifica prețurile fără notificare prealabilă.</li>
              <li>Disponibilitatea produselor poate varia în funcție de sezon.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">3. Comenzi și plată</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Comenzile pot fi plasate online prin site-ul nostru.</li>
              <li>Acceptăm plata cu cardul bancar și numerar la livrare.</li>
              <li>Confirmarea comenzii se face prin email în maxim 24 de ore.</li>
              <li>Ne rezervăm dreptul de a anula comenzi în cazuri excepționale.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">4. Livrare</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Livrarea este gratuită pentru comenzi în Chișinău.</li>
              <li>Termenul de livrare este de 2-5 zile lucrătoare.</li>
              <li>Plantele sunt ambalate cu grijă pentru a ajunge în condiții optime.</li>
              <li>Clientul trebuie să verifice starea plantei la primire.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">5. Returnări și garanții</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Oferim garanție de 7 zile pentru toate plantele.</li>
              <li>Returnările sunt acceptate doar dacă planta a fost deteriorată la livrare.</li>
              <li>Pentru returnări, contactați-ne în termen de 24 de ore de la primire.</li>
              <li>Rambursarea se face în maxim 14 zile lucrătoare.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">6. Protecția datelor</h2>
            <p className="leading-relaxed">
              Datele personale furnizate sunt utilizate exclusiv pentru procesarea comenzilor
              și nu sunt partajate cu terțe părți. Pentru mai multe detalii, consultați
              Politica de confidențialitate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">7. Proprietate intelectuală</h2>
            <p className="leading-relaxed">
              Tot conținutul site-ului (texte, imagini, logo-uri) este proprietatea BOTANICA
              și este protejat de legile drepturilor de autor. Reproducerea fără acordul nostru
              este interzisă.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">8. Contact</h2>
            <p className="leading-relaxed">
              Pentru întrebări legate de termeni și condiții, ne puteți contacta la:<br />
              Email: <a href="mailto:contact@botanica.md" className="text-green-600 hover:underline">contact@botanica.md</a><br />
              Telefon: <a href="tel:+37360123456" className="text-green-600 hover:underline">+373 60 123 456</a>
            </p>
          </section>

          <div className="pt-8 border-t border-zinc-200">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors"
            >
              Înapoi la magazin
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
