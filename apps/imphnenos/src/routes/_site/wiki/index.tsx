import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Book, Search, ArrowRight, Rocket, Disc, Settings, Wrench } from 'lucide-react';

export const Route = createFileRoute('/_site/wiki/')({
  component: WikiIndexPage,
});

const iconMap: Record<string, any> = {
  rocket: Rocket,
  disc: Disc,
  settings: Settings,
  wrench: Wrench
};

function WikiIndexPage() {
  const [manifest, setManifest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchManifest() {
      try {
        const response = await fetch('/wiki/manifest.json');
        if (!response.ok) throw new Error('Gagal memuat manifest');
        const data = await response.json();
        setManifest(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchManifest();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Gagal memuat dokumentasi</h2>
      </div>
    );
  }

  const allArticles = manifest.categories.flatMap((c: any) => 
    c.articles.map((a: any) => ({ ...a, category: c.name }))
  );

  const searchResults = searchQuery 
    ? allArticles.filter((a: any) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-primary-600 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-white">
          <Book className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wiki & Dokumentasi
          </h1>
          <p className="text-xl text-primary-100 mb-10">
            Pelajari cara menggunakan ImphnenOS dari instalasi hingga konfigurasi tingkat lanjut.
          </p>
          
          <div className="relative max-w-2xl mx-auto text-left">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari artikel (ex: instalasi, pacman)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 bg-white border border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/30 shadow-lg text-lg"
            />
            
            {/* Search Results Dropdown */}
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <ul className="max-h-80 overflow-y-auto py-2">
                  {searchResults.map((article: any) => (
                    <li key={article.slug}>
                      <Link
                        to={`/wiki/${article.slug}`}
                        className="block px-4 py-3 hover:bg-gray-50"
                      >
                        <p className="text-sm font-medium text-gray-900">{article.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{article.category}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {manifest.categories.map((category: any, idx: number) => {
            const Icon = iconMap[category.icon] || Settings;
            const firstArticle = category.articles[0];
            
            return (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                <p className="text-gray-500 text-sm mb-6">{category.articles.length} artikel</p>
                
                <ul className="space-y-3 mb-8">
                  {category.articles.slice(0, 3).map((article: any) => (
                    <li key={article.slug}>
                      <Link 
                        to={`/wiki/${article.slug}`}
                        className="text-gray-600 hover:text-primary-600 transition-colors text-sm flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        {article.title}
                      </Link>
                    </li>
                  ))}
                  {category.articles.length > 3 && (
                    <li className="text-sm text-gray-400 pl-3.5">
                      +{category.articles.length - 3} artikel lainnya
                    </li>
                  )}
                </ul>

                {firstArticle && (
                  <Link 
                    to={`/wiki/${firstArticle.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group"
                  >
                    Mulai Membaca
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
