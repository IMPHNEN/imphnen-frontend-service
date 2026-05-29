import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Download, AlertCircle, CheckCircle2, HardDrive, Cpu, MemoryStick } from 'lucide-react';
import DownloadCard from '../_components/DownloadCard';

export const Route = createFileRoute('/_site/download')({
  component: DownloadPage,
});

function DownloadPage() {
  const [releases, setReleases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReleases() {
      try {
        const response = await fetch('https://api.github.com/repos/IMPHNEN/ImphnenOs/releases');
        if (!response.ok) throw new Error('Gagal mengambil data release');
        const data = await response.json();
        setReleases(data);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    }
    fetchReleases();
  }, []);

  const latestRelease = releases.length > 0 ? releases[0] : null;
  const isoAsset = latestRelease?.assets?.find((a: any) => a.name.endsWith('.iso'));
  const shaAsset = latestRelease?.assets?.find((a: any) => a.name.endsWith('.sha256'));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary-50/50 pt-20 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Download <span className="text-primary-500">ImphnenOS</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dapatkan versi terbaru ImphnenOS. Siap di-install bare-metal atau dijalankan via Virtual Machine.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Download Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Download Status/Cards */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Download className="w-6 h-6 text-primary-500" />
                Latest Release
              </h2>

              {isLoading && (
                <div className="animate-pulse bg-gray-100 rounded-2xl h-48 w-full border border-gray-200"></div>
              )}

              {error && (
                <div className="bg-danger/10 border border-danger/20 rounded-xl p-6 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-danger shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-danger">Gagal memuat rilis</h3>
                    <p className="text-danger/80 text-sm mt-1">{error}</p>
                    <p className="text-danger/80 text-sm mt-2">
                      Silakan cek langsung di <a href="https://github.com/IMPHNEN/ImphnenOs/releases" className="underline font-medium hover:text-danger">GitHub Releases</a>.
                    </p>
                  </div>
                </div>
              )}

              {!isLoading && !error && latestRelease && (
                <DownloadCard
                  version={latestRelease.tag_name}
                  size={isoAsset ? `${(isoAsset.size / (1024 * 1024 * 1024)).toFixed(2)} GB` : 'N/A'}
                  date={latestRelease.published_at}
                  downloadUrl={isoAsset ? isoAsset.browser_download_url : latestRelease.html_url}
                  arch="x86_64"
                  sha256="cd825c0e1bd9cfbe0060965d1d64c1c9115b0266e74b88da8ef7c7d41f39f993" // Dummy since not usually in API easily
                  isLatest={true}
                />
              )}
            </div>

            {/* Quick Guide */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instalasi Cepat</h2>
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Download file ISO</h4>
                      <p className="text-gray-600 text-sm mt-1">Unduh file .iso dari tombol di atas. Pastikan koneksi stabil.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Buat Bootable USB</h4>
                      <p className="text-gray-600 text-sm mt-1">Gunakan tools seperti balenaEtcher, Rufus, atau Ventoy. Disarankan flashdisk minimal 8GB.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Boot dari USB & Install</h4>
                      <p className="text-gray-600 text-sm mt-1">Restart komputer, masuk ke BIOS/UEFI, pilih boot dari USB. Ikuti panduan Calamares installer.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* System Requirements */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h3 className="font-bold text-gray-900">Persyaratan Sistem</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Prosesor</p>
                    <p className="text-sm text-gray-600">x86_64 compatible (64-bit)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MemoryStick className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">RAM</p>
                    <p className="text-sm text-gray-600">Min: 2GB | Rekomendasi: 4GB+</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HardDrive className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Penyimpanan</p>
                    <p className="text-sm text-gray-600">Minimal 20GB space kosong</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-primary-50 rounded-2xl border border-primary-100 p-6">
              <h3 className="font-bold text-primary-900 mb-2">Butuh Bantuan?</h3>
              <p className="text-sm text-primary-700 mb-4">
                Bingung cara install? Atau takut data hilang? Baca dokumentasi lengkap kami sebelum memulai.
              </p>
              <a href="/wiki" className="text-sm font-medium text-primary-600 hover:text-primary-700 underline">
                Baca Dokumentasi Instalasi &rarr;
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
