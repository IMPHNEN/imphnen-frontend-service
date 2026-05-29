import { createFileRoute } from '@tanstack/react-router';
import { Heart, Github, Code2, Coffee, Shield } from 'lucide-react';

export const Route = createFileRoute('/_site/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary-50/50 pt-20 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tentang <span className="text-primary-500">ImphnenOS</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berawal dari keluhan di grup Facebook, kini menjadi distribusi Linux kebanggaan komunitas.
          </p>
        </div>
      </section>

      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Cerita */}
          <section className="prose prose-lg prose-primary mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Awal Mula</h2>
            <p className="text-gray-600 leading-relaxed">
              Komunitas IMPHNEN (Ingin Menjadi Programmer Handal Namun Enggan Ngoding) adalah rumah bagi 
              ratusan ribu programmer Indonesia. Salah satu keluhan yang paling sering muncul di grup adalah: 
              "Bang, cara setup environment untuk coding gimana ya? Kok error terus pas install dependencies?"
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Dari rasa frustasi kolektif tersebut, beberapa anggota inti komunitas berkumpul dan memiliki ide gila: 
              Bagaimana jika kita membuat OS sendiri yang sudah siap pakai untuk ngoding? Tanpa perlu setup berjam-jam, 
              tinggal install, buka editor, dan langsung koding.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Maka lahirlah ImphnenOS. Dibangun di atas fondasi Arch Linux yang solid, dengan racikan khusus
              berupa pre-installed tools, environment yang terkonfigurasi, dan tema window manager yang nyaman di mata.
            </p>
          </section>

          {/* Visi Misi */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nilai Inti Kami</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Developer First</h3>
                <p className="text-sm text-gray-600">Fokus utama OS ini adalah produktivitas programmer, bukan sekadar user biasa.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 mx-auto bg-success/10 rounded-full flex items-center justify-center text-success mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Open & Free</h3>
                <p className="text-sm text-gray-600">Selamanya akan gratis dan open-source. Kode kami terbuka untuk diaudit siapapun.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Community Driven</h3>
                <p className="text-sm text-gray-600">Dibangun oleh komunitas, didukung oleh komunitas, untuk komunitas.</p>
              </div>
            </div>
          </section>

          {/* Kontribusi CTA */}
          <section className="bg-primary-50 rounded-3xl p-8 md:p-12 border border-primary-100 text-center">
            <Coffee className="w-12 h-12 mx-auto text-primary-500 mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ikut Berkontribusi?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Project ini tidak akan berjalan tanpa bantuan para kontributor. Kamu bisa membantu lewat kode, desain, terjemahan dokumentasi, atau sekadar melaporkan bugs.
            </p>
            <a 
              href="https://github.com/IMPHNEN/ImphnenOs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
            >
              <Github className="w-5 h-5" />
              Repository GitHub
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}
