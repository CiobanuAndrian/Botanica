'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function DesprePage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light mb-8">Despre BOTANICA</h1>

        <div className="space-y-6 text-zinc-700">
          <section>
            <h2 className="text-2xl font-medium mb-4">Povestea noastră</h2>
            <p className="leading-relaxed">
              BOTANICA a fost fondată în 2024 cu o misiune simplă: să aducem natura în fiecare casă.
              Credem că plantele nu sunt doar decorațiuni, ci parteneri de viață care purifică aerul,
              reduc stresul și creează un mediu mai sănătos și mai fericit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">Ce ne face speciali</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Calitate premium:</strong> Selectăm cu grijă fiecare plantă pentru a asigura sănătatea și frumusețea ei.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Consiliere expertă:</strong> Echipa noastră te ajută să alegi planta perfectă pentru spațiul și stilul tău de viață.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Livrare gratuită:</strong> Aducem plantele direct la ușa ta, ambalate cu grijă pentru a ajunge în condiții perfecte.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Sustenabilitate:</strong> Folosim ambalaje ecologice și susținem practici de cultivare responsabile.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">Misiunea noastră</h2>
            <p className="leading-relaxed">
              Vrem să facem plantele accesibile tuturor, indiferent de experiența în grădinărit.
              Fie că ești un începător care își cumpără prima plantă sau un colecționar pasionat,
              BOTANICA este aici pentru a te ajuta să creezi o oază verde în casa ta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4">Contactează-ne</h2>
            <p className="leading-relaxed">
              Ai întrebări? Suntem aici pentru tine!<br />
              Email: <a href="mailto:contact@botanica.md" className="text-green-600 hover:underline">contact@botanica.md</a><br />
              Telefon: <a href="tel:+37360123456" className="text-green-600 hover:underline">+373 60 123 456</a>
            </p>
          </section>

          <div className="pt-8">
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
