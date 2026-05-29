import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export const Route = createFileRoute('/_site/faq')({
  component: FAQPage,
});

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "Apa itu ImphnenOS?",
        a: "ImphnenOS adalah distribusi Linux yang berbasis Arch Linux, dirancang khusus untuk programmer dan developer. OS ini sudah dilengkapi dengan berbagai tools development yang terkonfigurasi secara optimal."
      },
      {
        q: "Apakah ImphnenOS gratis?",
        a: "Ya, 100% gratis dan open-source. Seluruh kode sumber tersedia di GitHub."
      },
      {
        q: "Apa bedanya dengan Ubuntu atau Linux Mint?",
        a: "ImphnenOS berbasis Arch Linux yang menggunakan model rolling-release (selalu up-to-date). Berbeda dengan distro lain yang general-purpose, ImphnenOS sangat opinionated dan difokuskan murni untuk software development."
      },
      {
        q: "Apakah cocok untuk pemula Linux?",
        a: "Meskipun berbasis Arch, kami menyediakan installer grafis (Calamares) yang sangat mudah digunakan. Namun, pemahaman dasar tentang terminal Linux sangat disarankan untuk penggunaan optimal."
      }
    ]
  },
  {
    category: "Instalasi",
    questions: [
      {
        q: "Bagaimana cara installnya?",
        a: "Download file ISO, flash ke USB flashdisk menggunakan Rufus atau balenaEtcher, lalu boot komputer kamu dari USB tersebut. Setelah masuk ke Live Desktop, klik icon 'Install ImphnenOS'."
      },
      {
        q: "Bisa dual boot dengan Windows?",
        a: "Sangat bisa. Installer kami (Calamares) dapat mendeteksi partisi Windows dan mengatur bootloader (GRUB) secara otomatis agar kamu bisa memilih OS saat komputer menyala."
      },
      {
        q: "Apakah data saya akan aman saat install?",
        a: "Jika kamu memilih opsi 'Replace a partition' atau 'Manual partitioning', data di partisi lain akan aman. Namun, SANGAT DISARANKAN untuk melakukan backup data penting sebelum menginstal sistem operasi apa pun."
      },
      {
        q: "Berapa spesifikasi minimumnya?",
        a: "Prosesor 64-bit, RAM minimal 2GB (direkomendasikan 4GB+ untuk IDE modern), dan ruang penyimpanan kosong minimal 20GB."
      }
    ]
  },
  {
    category: "Penggunaan",
    questions: [
      {
        q: "Bagaimana cara install aplikasi baru?",
        a: "Kamu bisa menggunakan terminal dengan perintah 'sudo pacman -S nama_aplikasi' atau menggunakan aplikasi grafis 'Pamac' (Add/Remove Software) yang sudah terinstall."
      },
      {
        q: "Bagaimana cara update sistem?",
        a: "Buka terminal dan jalankan 'sudo pacman -Syu', atau biarkan update notifier di taskbar yang memberitahu kamu saat ada update tersedia."
      },
      {
        q: "Window Manager apa yang digunakan?",
        a: "ImphnenOS tidak menggunakan Desktop Environment (seperti KDE/GNOME), melainkan murni menggunakan Tiling Window Manager bernama 'mango'. Ini dirancang agar sangat ringan dan mengutamakan produktivitas berbasis keyboard."
      },
      {
        q: "Apakah saya perlu menginstall driver NVIDIA secara manual?",
        a: "Tidak perlu. Saat booting ISO, pilih opsi 'Boot with proprietary drivers' (biasanya non-free). Installer otomatis akan menginstall driver NVIDIA yang tepat untuk komputermu."
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white transition-all duration-300 hover:border-primary-200 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left bg-white focus:outline-none"
      >
        <span className="font-semibold text-gray-900 pr-8">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary-500 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        )}
      </button>
      <div 
        className={`px-5 text-gray-600 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <p className="leading-relaxed border-t border-gray-100 pt-4 mt-2">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary-50/50 pt-20 pb-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            FAQ & Bantuan
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Pertanyaan yang sering diajukan seputar ImphnenOS.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari pertanyaan atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm text-lg"
            />
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ditemukan</h3>
              <p className="text-gray-500">Maaf, kami tidak menemukan jawaban untuk pencarian "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFaqs.map((category, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm">
                      {idx + 1}
                    </span>
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((q, qIdx) => (
                      <FAQItem key={qIdx} question={q.q} answer={q.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Belum menemukan jawaban?</h3>
            <p className="text-gray-600 mb-6">Jangan ragu untuk bertanya langsung di komunitas kami.</p>
            <a 
              href="https://discord.gg/imphnen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-500 hover:bg-primary-600 shadow-sm"
            >
              Tanya di Discord
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
