import { Link } from '@tanstack/react-router';
import { Github, Facebook, MessageSquare, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://imphnen.dev/logo.webp" alt="IMPHNEN" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              ImphnenOS adalah distribusi Linux yang dirancang khusus untuk programmer, 
              oleh komunitas programmer. Cepat, ringan, dan siap pakai.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com/IMPHNEN/ImphnenOs" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://discord.gg/imphnen" className="text-gray-400 hover:text-[#5865F2] transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="https://fb.com/groups/programmerhandal" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/imphnen.dev" className="text-gray-400 hover:text-[#E4405F] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Halaman */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Halaman</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Fitur</Link></li>
              <li><Link to="/download" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Download</Link></li>
              <li><Link to="/wiki" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Wiki & Docs</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Tentang</Link></li>
            </ul>
          </div>

          {/* Komunitas */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Komunitas IMPHNEN</h3>
            <ul className="space-y-3">
              <li><a href="https://imphnen.dev" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Website Utama</a></li>
              <li><a href="https://dimentorin.imphnen.dev" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Dimentorin</a></li>
              <li><a href="https://discord.gg/imphnen" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Discord Server</a></li>
              <li><a href="https://fb.com/groups/programmerhandal" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Facebook Group</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="https://github.com/IMPHNEN/ImphnenOs" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">GitHub Repository</a></li>
              <li><a href="https://github.com/IMPHNEN/ImphnenOs/releases" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Latest Releases</a></li>
              <li><a href="https://github.com/IMPHNEN/ImphnenOs/issues" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Report an Issue</a></li>
              <li><Link to="/wiki/contributing" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Contribute</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} IMPHNEN Community. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            Dibuat dengan <Heart className="w-4 h-4 text-danger fill-current" /> oleh 
            <a href="https://imphnen.dev" className="font-medium text-primary-600 hover:underline ml-1">
              Programmer Enggan Ngoding
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
