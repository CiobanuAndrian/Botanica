'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function PoliticaPage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light mb-8">Politica de confidențialitate</h1>

        <div className="space-y-6 text-zinc-700">
          <p className="text-sm text-zinc-500">Ultima actualizare: 10 aprilie 2026</p>

          <section>
            <h2 className="text-2xl font-medium mb-4">1. Introducere</h2>
            <p className="leading-relaxed">
              La BOTANICA, confidențialitatea datelor dumneavoastră personale este o prioritate.
              Această politică explică ce informații colectăm, cum le folosim și cum le protejăm.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">2. Ce date colectăm</h2>
            <p className="leading-relaxed mb-3">Colectăm următoarele tipuri de informații:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Date de identificare:</strong> nume, prenume</li>
              <li><strong>Date de contact:</strong> adresă email, număr de telefon, adresă de livrare</li>
              <li><strong>Date de comandă:</strong> produse comandate, istoric comenzi, preferințe</li>
              <li><strong>Date tehnice:</strong> adresă IP, tip browser, sistem de operare</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">3. Cum folosim datele</h2>
            <p className="leading-relaxed mb-3">Utilizăm datele dumneavoastră pentru:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Procesarea și livrarea comenzilor</li>
              <li>Comunicarea cu dumneavoastră despre comenzi</li>
              <li>Îmbunătățirea serviciilor noastre</li>
              <li>Trimiterea de oferte și promoții (doar cu acordul dumneavoastră)</li>
              <li>Respectarea obligațiilor legale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">4. Partajarea datelor</h2>
            <p className="leading-relaxed">
              Nu vindem și nu închiriem datele dumneavoastră personale. Partajăm informații
              doar cu:
            </p>
            <ul className="space-y-2 list-disc list-inside mt-3">
              <li>Servicii de curierat pentru livrarea comenzilor</li>
              <li>Procesatori de plăți pentru tranzacții securizate</li>
              <li>Autorități legale, când este necesar prin lege</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">5. Securitatea datelor</h2>
            <p className="leading-relaxed">
              Implementăm măsuri tehnice și organizatorice pentru protejarea datelor:
            </p>
            <ul className="space-y-2 list-disc list-inside mt-3">
              <li>Criptare SSL pentru transmiterea datelor</li>
              <li>Acces restricționat la datele personale</li>
              <li>Backup-uri regulate și securizate</li>
              <li>Monitorizare constantă a sistemelor</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">6. Cookie-uri</h2>
            <p className="leading-relaxed">
              Site-ul nostru folosește cookie-uri pentru:
            </p>
            <ul className="space-y-2 list-disc list-inside mt-3">
              <li>Funcționarea coșului de cumpărături</li>
              <li>Memorarea preferințelor dumneavoastră</li>
              <li>Analiză trafic și comportament utilizatori</li>
            </ul>
            <p className="leading-relaxed mt-3">
              Puteți dezactiva cookie-urile din setările browserului, dar unele funcționalități
              ale site-ului pot fi afectate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">7. Drepturile dumneavoastră</h2>
            <p className="leading-relaxed mb-3">Aveți următoarele drepturi:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Dreptul de acces:</strong> să solicitați o copie a datelor personale</li>
              <li><strong>Dreptul de rectificare:</strong> să corectați datele incorecte</li>
              <li><strong>Dreptul de ștergere:</strong> să solicitați ștergerea datelor</li>
              <li><strong>Dreptul de opoziție:</strong> să vă opuneți prelucrării datelor</li>
              <li><strong>Dreptul de portabilitate:</strong> să primiți datele într-un format structurat</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">8. Păstrarea datelor</h2>
            <p className="leading-relaxed">
              Păstrăm datele dumneavoastră personale doar atât timp cât este necesar pentru
              scopurile menționate sau conform cerințelor legale (minim 5 ani pentru facturi).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">9. Modificări ale politicii</h2>
            <p className="leading-relaxed">
              Ne rezervăm dreptul de a actualiza această politică. Modificările vor fi publicate
              pe această pagină cu data actualizării.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">10. Contact</h2>
            <p className="leading-relaxed">
              Pentru întrebări despre confidențialitate sau pentru exercitarea drepturilor:<br />
              Email: <a href="mailto:privacy@botanica.md" className="text-green-600 hover:underline">privacy@botanica.md</a><br />
              Telefon: <a href="tel:+37360123456" className="text-green-600 hover:underline">+373 60 123 456</a><br />
              Adresă: Str. Florilor 25, Chișinău, MD-2001, Moldova
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
