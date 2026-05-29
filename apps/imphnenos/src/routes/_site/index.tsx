import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Terminal, Package, Zap, Palette, Shield, Users, Download, ArrowRight, Github, Code2, Globe } from 'lucide-react';
import TerminalMockup from '../_components/TerminalMockup';
import FeatureCard from '../_components/FeatureCard';

export const Route = createFileRoute('/_site/')({
  component: HomePage,
});

function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-white">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-primary-100/50 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-5 max-w-2xl animate-[fadeInUp_0.8s_ease-out]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 font-medium text-sm mb-6 border border-primary-100">
                <span className="text-base">🐧</span>
                <span>Distro Linux Komunitas IMPHNEN</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
                Imphnen<span className="text-gradient">OS</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
                Distribusi Linux Dari Programmer Malas Ngoding
              </p>
              
              <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-xl">
                Sistem operasi yang dirancang khusus untuk memenuhi kebutuhan developer modern. 
                Pre-configured, ringan, dan siap digunakan untuk coding tanpa perlu repot setup berjam-jam.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  to="/download"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  Download Sekarang
                </Link>
                <Link 
                  to="/wiki"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <Code2 className="w-5 h-5 text-gray-500" />
                  Baca Dokumentasi
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-7 relative mx-auto w-full max-w-2xl lg:max-w-none animate-[fadeInUp_1s_ease-out]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-blue-500 rounded-[1.5rem] blur opacity-20 animate-[pulse-glow_4s_ease-in-out_infinite]" />
              <TerminalMockup className="relative z-10 shadow-2xl w-full h-[450px] md:h-[500px]" />
              
              {/* Floating badges */}
              <div className="absolute -right-6 top-10 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 animate-[float_6s_ease-in-out_infinite] z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Berdasar pada</p>
                    <p className="text-sm font-bold text-gray-900">Arch Linux</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-6 bottom-20 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 animate-[float_5s_ease-in-out_infinite_0.5s] z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Boot Time</p>
                    <p className="text-sm font-bold text-gray-900">&lt; 5 Detik</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kenapa Memilih <span className="text-primary-500">ImphnenOS?</span>
            </h2>
            <p className="text-lg text-gray-600">
              Dibuat dari rasa frustasi setup environment yang berulang-ulang, kami meracik OS 
              yang langsung siap pakai untuk produktivitas maksimal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Terminal className="w-6 h-6" />}
              title="Pre-configured IDE"
              description="VS Code, Neovim, dan berbagai tools development sudah terinstall dan dikonfigurasi dengan plugin terbaik."
            />
            <FeatureCard 
              icon={<Package className="w-6 h-6" />}
              title="Package Manager Mantap"
              description="Menggunakan pacman dengan akses penuh ke AUR (Arch User Repository). Semua software yang kamu butuhkan ada di sini."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Performa Maksimal"
              description="Kernel yang dioptimasi dan window manager (mango) super ringan. Berjalan mulus bahkan di laptop kentang sekalipun."
            />
            <FeatureCard 
              icon={<Palette className="w-6 h-6" />}
              title="UI Estetik"
              description="Tampilan yang sudah dipoles sedemikian rupa dengan tema gelap yang ramah di mata programmer."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              title="Aman & Stabil"
              description="Konfigurasi firewall default dan enkripsi disk tersedia saat instalasi untuk menjaga kode berhargamu."
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6" />}
              title="Komunitas Aktif"
              description="Didukung oleh komunitas IMPHNEN dengan lebih dari 250.000 member. Ada error? Tanya aja di grup!"
            />
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/features"
              className="inline-flex items-center justify-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Lihat semua fitur lengkap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Penampakan <span className="text-primary-500">ImphnenOS</span>
            </h2>
            <p className="text-lg text-gray-600">
              Sekilas tampilan, wallpaper, dan antarmuka dari ImphnenOS yang super estetik.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              className="lg:col-span-2 row-span-2 relative group cursor-pointer"
              onClick={() => setSelectedImage("https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/preview.gif")}
            >
              <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10 flex items-center justify-center">
                <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Perbesar</span>
              </div>
              <img src="https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/preview.gif" alt="Preview ImphnenOS" className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-100" />
            </div>
            <div 
              className="relative group aspect-video lg:aspect-auto cursor-pointer"
              onClick={() => setSelectedImage("https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/wallpaper_imphnenos.png")}
            >
              <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10 flex items-center justify-center">
                <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Perbesar</span>
              </div>
              <img src="https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/wallpaper_imphnenos.png" alt="Wallpaper ImphnenOS" className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-100" />
            </div>
            <div 
              className="relative group aspect-video lg:aspect-auto cursor-pointer"
              onClick={() => setSelectedImage("https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/nmtui.png")}
            >
              <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10 flex items-center justify-center">
                <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Perbesar</span>
              </div>
              <img src="https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/nmtui.png" alt="Network Manager TUI" className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-100" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div 
              className="col-span-2 md:col-span-1 relative group aspect-square cursor-pointer"
              onClick={() => setSelectedImage("https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/doto.gif")}
            >
              <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10 flex items-center justify-center">
                <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Perbesar</span>
              </div>
              <img src="https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/doto.gif" alt="Doto Animation" className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-100" />
            </div>
            <div 
              className="relative group aspect-square cursor-pointer"
              onClick={() => setSelectedImage("https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/maomao.png")}
            >
              <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10 flex items-center justify-center">
                <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Perbesar</span>
              </div>
              <img src="https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/maomao.png" alt="Maomao Art" className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-100" />
            </div>
            <div 
              className="relative group aspect-square cursor-pointer"
              onClick={() => setSelectedImage("https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/fesnuk.png")}
            >
              <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10 flex items-center justify-center">
                <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Perbesar</span>
              </div>
              <img src="https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/fesnuk.png" alt="Fesnuk Screenshot" className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-100" />
            </div>
            <div 
              className="relative group aspect-square flex items-center justify-center bg-gray-50 rounded-2xl shadow-inner border border-gray-200 cursor-pointer"
              onClick={() => setSelectedImage("https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/imphnen.png")}
            >
              <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10 flex items-center justify-center">
                <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Perbesar</span>
              </div>
              <img src="https://raw.githubusercontent.com/IMPHNEN/ImphnenOs/main/media/imphnen.png" alt="Imphnen Logo" className="w-2/3 h-2/3 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-white">30+</div>
              <div className="text-primary-100 font-medium">Kontributor Aktif</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-white">250K+</div>
              <div className="text-primary-100 font-medium">Member Komunitas</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-white">5000+</div>
              <div className="text-primary-100 font-medium">Package Tersedia</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-white">100+</div>
              <div className="text-primary-100 font-medium">Star di GitHub</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Kembangkan ImphnenOS Bersama Kami
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            ImphnenOS adalah project open source yang dibangun oleh dan untuk komunitas. 
            Kami selalu terbuka untuk kontribusi berupa kode, desain, terjemahan, atau sekadar melaporkan bug.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="https://github.com/IMPHNEN/ImphnenOs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#24292e] hover:bg-[#1b1f23] rounded-xl transition-all"
            >
              <Github className="w-5 h-5" />
              Kontribusi di GitHub
            </a>
            <a 
              href="https://discord.gg/imphnen"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#5865F2] hover:bg-[#4752C4] rounded-xl transition-all"
            >
              <Users className="w-5 h-5" />
              Join Discord Server
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          />
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
