import { createFileRoute } from '@tanstack/react-router';
import { Terminal, Cpu, Shield, Layout, Settings, Package, HardDrive, Wifi, Smartphone, MonitorPlay, Code, GitBranch } from 'lucide-react';
import FeatureCard from '../_components/FeatureCard';

export const Route = createFileRoute('/_site/features')({
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary-50/50 pt-20 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Fitur <span className="text-primary-500">ImphnenOS</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dirancang dari awal untuk memberikan pengalaman development yang tanpa hambatan. 
            Semua yang kamu butuhkan, siap sedia sejak instalasi pertama.
          </p>
        </div>
      </section>

      {/* Feature Categories */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Developer Experience */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                <Code className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Developer Experience</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Terminal className="w-6 h-6" />}
                title="ZSH & Oh My Zsh"
                description="Terminal interaktif dengan autocompletion, syntax highlighting, dan plugin produktivitas yang sudah terkonfigurasi."
                tag="Terminal"
              />
              <FeatureCard 
                icon={<GitBranch className="w-6 h-6" />}
                title="Git Terintegrasi"
                description="Git, GitHub CLI, dan tool version control lainnya sudah siap pakai dengan kredensial helper otomatis."
                tag="VCS"
              />
              <FeatureCard 
                icon={<Package className="w-6 h-6" />}
                title="Dev Environments"
                description="Node.js (NVM/Bun), Python (pyenv), Go, dan Rust bisa diaktifkan hanya dengan satu perintah simpel."
                tag="Tools"
              />
            </div>
          </section>

          {/* Desktop & UI */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <Layout className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Window Manager & UI</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<MonitorPlay className="w-6 h-6" />}
                title="Mango WM"
                description="Window Manager super ringan dan cepat dengan tema gelap eksklusif ImphnenOS yang nyaman untuk mata."
              />
              <FeatureCard 
                icon={<Settings className="w-6 h-6" />}
                title="Tiling Window Manager"
                description="Produktivitas keyboard-centric maksimal dengan tiling otomatis bawaan dari mango."
              />
              <FeatureCard 
                icon={<Smartphone className="w-6 h-6" />}
                title="Mobile Integration"
                description="KDE Connect terinstall default untuk sinkronisasi notifikasi, clipboard, dan file dengan smartphone kamu."
              />
            </div>
          </section>

          {/* System & Performance */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">System & Performance</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<HardDrive className="w-6 h-6" />}
                title="BTRFS by Default"
                description="File system modern dengan fitur auto-snapshot sebelum update, kamu bisa selalu rollback jika terjadi error."
              />
              <FeatureCard 
                icon={<Wifi className="w-6 h-6" />}
                title="Network Manager"
                description="Konfigurasi jaringan yang robust, mendukung VPN, DNS custom, dan proxy development langsung dari UI."
              />
              <FeatureCard 
                icon={<Shield className="w-6 h-6" />}
                title="Keamanan Terintegrasi"
                description="Firewall UFW aktif secara default, Full Disk Encryption (LUKS) tersedia sebagai opsi saat instalasi."
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
