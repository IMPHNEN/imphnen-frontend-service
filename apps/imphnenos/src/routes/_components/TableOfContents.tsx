import { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extractedHeadings: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      // Simple slugify matching github-markdown-css behavior
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className={`hidden lg:block w-56 shrink-0 ${className}`}>
      <div className="sticky top-24">
        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
          Di Halaman Ini
        </h4>
        <nav className="border-l-2 border-gray-100">
          <ul className="space-y-2.5">
            {headings.map((heading) => (
              <li 
                key={heading.id} 
                className={`${heading.level === 3 ? 'ml-4' : ''}`}
              >
                <a
                  href={`#${heading.id}`}
                  className={`block text-sm transition-colors relative -left-[2px] border-l-2 pl-3 py-0.5 ${
                    activeId === heading.id
                      ? 'border-primary-500 text-primary-600 font-medium'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth'
                    });
                    // Also update URL without scrolling
                    history.pushState(null, '', `#${heading.id}`);
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
