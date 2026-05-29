import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Search, ChevronDown, ChevronRight, Menu, X, Rocket, Disc, Settings, Wrench } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  order: number;
}

interface Category {
  name: string;
  icon: string;
  articles: Article[];
}

interface WikiSidebarProps {
  categories: Category[];
  currentSlug?: string;
  className?: string;
}

const iconMap: Record<string, any> = {
  rocket: Rocket,
  disc: Disc,
  settings: Settings,
  wrench: Wrench
};

export default function WikiSidebar({ categories, currentSlug, className = '' }: WikiSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>(
    categories.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {})
  );

  const toggleCat = (name: string) => {
    setExpandedCats(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredCategories = categories.map(cat => ({
    ...cat,
    articles: cat.articles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(cat => cat.articles.length > 0);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {filteredCategories.map((cat) => {
          const Icon = iconMap[cat.icon] || Settings;
          const isExpanded = expandedCats[cat.name];

          return (
            <div key={cat.name}>
              <button
                onClick={() => toggleCat(cat.name)}
                className="flex items-center justify-between w-full text-left mb-2 group"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                )}
              </button>

              {isExpanded && (
                <div className="pl-6 space-y-1 mt-2">
                  {cat.articles.map(article => {
                    const isActive = currentSlug === article.slug;
                    return (
                      <Link
                        key={article.slug}
                        to={`/wiki/${article.slug}`}
                        className={`block py-1.5 px-3 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? 'bg-primary-50 text-primary-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => setIsOpenMobile(false)}
                      >
                        {article.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        onClick={() => setIsOpenMobile(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-primary-600 text-white p-3 rounded-full shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block w-64 shrink-0 border-r border-gray-200 sticky top-16 h-[calc(100vh-4rem)] ${className}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setIsOpenMobile(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-gray-900">Wiki Navigasi</span>
              <button onClick={() => setIsOpenMobile(false)} className="text-gray-500 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
