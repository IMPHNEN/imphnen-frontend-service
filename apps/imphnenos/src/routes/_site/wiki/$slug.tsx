import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronRight, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import WikiSidebar from '../../_components/WikiSidebar';
import TableOfContents from '../../_components/TableOfContents';

export const Route = createFileRoute('/_site/wiki/$slug')({
  component: WikiArticlePage,
});

function WikiArticlePage() {
  const { slug } = Route.useParams();
  const [content, setContent] = useState<string>('');
  const [manifest, setManifest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch manifest for sidebar and metadata
        if (!manifest) {
          const manifestRes = await fetch('/wiki/manifest.json');
          if (manifestRes.ok) {
            setManifest(await manifestRes.json());
          }
        }

        // Fetch article content
        const contentRes = await fetch(`/wiki/${slug}.md`);
        if (!contentRes.ok) {
          throw new Error('Artikel tidak ditemukan');
        }
        setContent(await contentRes.text());
        
        // Scroll to top on new article load
        window.scrollTo(0, 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  // Find current article metadata
  let currentArticle = null;
  let currentCategory = null;
  let prevArticle = null;
  let nextArticle = null;

  if (manifest) {
    const allArticles = manifest.categories.flatMap((c: any) => 
      c.articles.map((a: any) => ({ ...a, category: c.name }))
    );
    
    const currentIndex = allArticles.findIndex((a: any) => a.slug === slug);
    if (currentIndex !== -1) {
      currentArticle = allArticles[currentIndex];
      currentCategory = currentArticle.category;
      prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
      nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Breadcrumb Header */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
          <Link to="/wiki" className="hover:text-primary-600 transition-colors">Wiki</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          {currentCategory && (
            <>
              <span className="text-gray-900">{currentCategory}</span>
              <ChevronRight className="w-4 h-4 mx-1" />
            </>
          )}
          <span className="text-gray-900 font-medium truncate">
            {currentArticle?.title || slug}
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:block w-64 shrink-0 py-8 pr-8 border-r border-gray-100">
          {manifest ? (
            <WikiSidebar categories={manifest.categories} currentSlug={slug} />
          ) : (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          )}
        </div>

        {/* Mobile sidebar is handled within WikiSidebar component via fixed button */}
        {manifest && (
           <div className="md:hidden">
             <WikiSidebar categories={manifest.categories} currentSlug={slug} />
           </div>
        )}

        {/* Main Content */}
        <main className="flex-1 py-8 md:pl-10 min-w-0">
          {isLoading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-32 bg-gray-100 rounded w-full mt-8"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Artikel Tidak Ditemukan</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link to="/wiki" className="text-primary-600 font-medium hover:underline">
                Kembali ke beranda Wiki
              </Link>
            </div>
          ) : (
            <>
              {currentArticle && (
                <h1 className="text-4xl font-bold text-gray-900 mb-8">{currentArticle.title}</h1>
              )}
              
              {/* Markdown Content */}
              <div className="prose prose-primary max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100 prose-h3:text-xl prose-h3:mt-8 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>

              {/* Prev/Next Navigation */}
              <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
                {prevArticle ? (
                  <Link 
                    to={`/wiki/${prevArticle.slug}`}
                    className="flex-1 flex flex-col items-start p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
                  >
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 
                      Sebelumnya
                    </span>
                    <span className="font-semibold text-primary-600">{prevArticle.title}</span>
                  </Link>
                ) : <div className="flex-1" />}

                {nextArticle ? (
                  <Link 
                    to={`/wiki/${nextArticle.slug}`}
                    className="flex-1 flex flex-col items-end text-right p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
                  >
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center gap-1">
                      Selanjutnya
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> 
                    </span>
                    <span className="font-semibold text-primary-600">{nextArticle.title}</span>
                  </Link>
                ) : <div className="flex-1" />}
              </div>
            </>
          )}
        </main>

        {/* Table of Contents */}
        {!isLoading && !error && (
          <div className="hidden lg:block w-56 shrink-0 py-8 pl-8">
            <TableOfContents content={content} />
          </div>
        )}
      </div>
    </div>
  );
}
