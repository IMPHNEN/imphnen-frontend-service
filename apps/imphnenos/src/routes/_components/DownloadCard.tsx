import { useState } from 'react';
import { Download, ChevronDown, ChevronUp, HardDrive, Calendar, Shield, Hash } from 'lucide-react';

interface DownloadCardProps {
  version: string;
  size: string;
  date: string;
  downloadUrl: string;
  arch: string;
  sha256?: string;
  isLatest?: boolean;
}

export default function DownloadCard({ 
  version, 
  size, 
  date, 
  downloadUrl, 
  arch, 
  sha256,
  isLatest = false 
}: DownloadCardProps) {
  const [showChecksum, setShowChecksum] = useState(false);

  return (
    <div className={`bg-white rounded-2xl border ${isLatest ? 'border-primary-300 shadow-lg shadow-primary-500/10' : 'border-gray-200 shadow-sm'} overflow-hidden transition-all duration-300 hover:shadow-xl`}>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Info Section */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">ImphnenOS {version}</h3>
              {isLatest && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/20">
                  Latest Release
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-gray-400" />
                <span>{size}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-gray-400" />
                <span>{arch}</span>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
            <a 
              href={downloadUrl}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-5 h-5" />
              Download ISO
            </a>
          </div>
        </div>

        {/* Checksum Section */}
        {sha256 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button 
              onClick={() => setShowChecksum(!showChecksum)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors"
            >
              <Hash className="w-4 h-4" />
              Verify Checksum (SHA256)
              {showChecksum ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showChecksum && (
              <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <code className="text-xs text-gray-600 break-all select-all font-mono">
                  {sha256}
                </code>
                <p className="text-xs text-gray-400 mt-2">
                  Jalankan perintah <code className="bg-gray-200 px-1 py-0.5 rounded">sha256sum imphnenos-{version}-x86_64.iso</code> di terminal untuk memverifikasi integritas file.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
