import { useNavigate, Link } from 'react-router';
import { useState } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Icon } from '@iconify/react';
import { ThemeToggle } from '../components/theme-toggle';
import { useAuthStore } from '@imphnen-frontend-service/service';

export default function HomePage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { session } = useAuthStore();
  const isAuthenticated = !!session?.token;

  const faqs = [
    {
      question: 'Siapa yang bisa mengikuti hackathon ini?',
      answer:
        'Hackathon ini terbuka untuk mahasiswa, fresh graduate, dan profesional muda yang memiliki passion di bidang teknologi. Peserta dapat mendaftar secara tim.',
    },
    {
      question: 'Apakah ada biaya pendaftaran?',
      answer:
        'Tidak, hackathon ini GRATIS dan terbuka untuk semua peserta yang memenuhi kriteria.',
    },
    {
      question: 'Apa tema hackathon kali ini?',
      answer:
        'Tema hackathon kali ini adalah "Inovasi AI: Mendorong Usaha Lokal dengan AI Inklusif".',
    },
    {
      question: 'Bagaimana format pelaksanaannya?',
      answer:
        'Hackathon dilaksanakan secara online dengan berbagai tahap mulai dari pendaftaran, technical meeting, tahap penyisihan, hingga final.',
    },
    {
      question: 'Apa hadiah lombanya?',
      answer:
        'Total hadiah senilai Rp14.500.000 dengan juara 1 mendapat Rp6.000.000, juara 2 Rp4.000.000, juara 3 Rp2.500.000, dan juara kategori lainnya Rp2.000.000.',
    },
    {
      question: 'Apakah harus membentuk tim? Boleh solo?',
      answer:
        'Tidak boleh solo. Peserta harus membentuk tim yang terdiri dari 2 - 5 orang per tim. Peserta bisa mencari anggota melalui website ini atau WA Group Hackathon.',
    },
    {
      question: 'Apakah boleh menggunakan AI (vibe coding)?',
      answer:
        'Ya, peserta diperbolehkan menggunakan AI tools untuk membantu development. Kami merekomendasikan menggunakan Kolosal.ai selama proses development (Free Credit)',
    },
    {
      question: 'Apa project wajib di-deploy?',
      answer:
        'Diusahakan project agar di-deploy dan dapat diakses secara online untuk meningkatkan penilaian.',
    },
    {
      question: 'Apakah peserta mendapatkan sertifikat?',
      answer:
        'Kami akan memberikan sertifikat kepada tim yang submit project dan menyelesaikan rangkaian hackathon.',
    },
    {
      question: 'Website error dan terjadi masalah?',
      answer:
        'Jika menemukan masalah teknis, silakan hubungi kami melalui grup WA Hackathon.',
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <div id="#top" className="hidden"></div>
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold dark:text-white">
              IMPHNEN
            </span>
            <a
              href="#top"
              className="text-lg md:text-xl font-bold text-primary-500 hover:cursor-pointer"
            >
              Hackathon
            </a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex text-label1 items-center gap-4 lg:gap-8">
            <a
              href="#timeline"
              className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Timeline
            </a>
            <a
              href="#hadiah"
              className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Hadiah
            </a>
            <a
              href="#faq"
              className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              FAQ
            </a>
            <ThemeToggle />
            {isAuthenticated ? (
              <Button
                onClick={() => navigate('/dashboard')}
                size="sm"
                className="rounded-lg text-base"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/auth/login')}
                  size="sm"
                  variant="bordered"
                  className="rounded-lg text-base dark:bg-gray-800"
                >
                  Masuk
                </Button>
                <Button
                  onClick={() => navigate('/auth/signup')}
                  size="sm"
                  className="rounded-lg text-base"
                >
                  Daftar Sekarang
                </Button>
              </>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 cursor-pointer text-gray-900 dark:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden sticky top-18 border-b border-gray-200 dark:border-gray-800 bg-white z-40 dark:bg-gray-900">
          <div className="flex flex-col items-start gap-4 px-4 py-4">
            <a
              href="#timeline"
              className="ms-3 text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Timeline
            </a>
            <a
              href="#hadiah"
              className="ms-3 text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Hadiah
            </a>
            <a
              href="#faq"
              className="ms-3 text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              FAQ
            </a>
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-primary-500 text-white text-base rounded-lg hover:bg-primary-600 transition-colors text-center cursor-pointer"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth/login')}
                  className="ms-3 text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  onClick={() => navigate('/auth/login')}
                  className="px-4 py-2 bg-primary-500 text-white text-base rounded-lg hover:bg-primary-600 transition-colors text-center cursor-pointer"
                >
                  Daftar Sekarang
                </button>
              </>
            )}
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 -left-20 w-100 h-100 rounded-full bg-linear-to-r from-primary/20 to-blue-400/20 blur-3xl"
            style={{ transform: 'translate(10px, -5px)', opacity: 0.9 }}
          ></div>
          <div
            className="absolute bottom-1/3 -right-20 w-100 h-100 rounded-full bg-linear-to-r from-blue-400/20 to-primary/20 blur-3xl"
            style={{ transform: 'translate(0px, 0px)', opacity: 1 }}
          ></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-size-[40px_40px]"></div>
        </div>
        <div className="mx-auto container px-4 relative flex flex-col items-center">
          {/* Logos */}
          <div className="flex items-center gap-4 md:gap-8 lg:gap-12 mb-8 md:mb-12 lg:mb-16 flex-wrap justify-center">
            <div className="flex items-center">
              <img
                src="images/imphnen-logo.svg"
                alt="IMPHNEN"
                className="h-12 md:h-16"
              />
            </div>
            <span className="text-3xl md:text-5xl font-bold text-gray-400 dark:text-gray-500">
              ×
            </span>
            <div className="flex items-center">
              <img
                src="images/sponsors/kolosal-logo_rlxbck.svg"
                alt="Kolosal.ai"
                className="h-8 md:h-12 dark:invert"
              />
            </div>
          </div>
          {/* Title */}
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white mb-4 text-center">
            Hackathon
          </h1>
          {/* Subtitle */}
          <p className="text-p1 text-primary-500 font-semibold mb-6 md:mb-8 text-center px-4">
            "Inovasi AI: Mendorong Usaha Lokal dengan AI Inklusif"
          </p>
          {/* Description */}
          <p className="text-p3 text-gray-600 dark:text-gray-200 max-w-lg md:max-w-xl text-center mb-8 md:mb-12 px-4 font-sans">
            Kompetisi pengembangan teknologi untuk menciptakan solusi inovatif
            yang menghadirkan dampak nyata
          </p>
          {/* Status */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-10 md:mb-16 text-base text-gray-600 dark:text-gray-200">
            <div className="flex items-center gap-2 md:gap-3">
              <Icon icon="streamline-plump:web" className="w-4 h-4" />
              <span>Online</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-center">
              <Icon icon="heroicons:clock" className="w-4 h-4" />
              <span>Pendaftaran hingga 30 November 2025</span>
            </div>
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 px-4">
            <Button
              onClick={() => navigate('/auth/signup')}
              className="rounded-lg text-base max-h-auto"
            >
              Daftar Sekarang
            </Button>
            <a
              href="https://chat.whatsapp.com/BlxrYh9uSC37d7VPhJslGL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-center bg-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 text-base text-gray-600 dark:text-gray-200 dark:bg-gray-800 rounded-lg font-bai-jamjuree font-semibold"
            >
              Gabung Grup WA Hackathon
            </a>
          </div>
          {/* Scroll indicator */}
          <div className="mt-12 md:mt-20">
            <svg
              className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 dark:text-white">
            Tentang <span className="text-primary-500">Hackathon</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-left md:text-center text-gray-600 dark:text-gray-200 mb-6">
            <span className="font-semibold text-gray-900 dark:text-white">
              Hackathon
            </span>{' '}
            adalah kompetisi pengembangan teknologi yang mengajak talenta muda
            untuk berkolaborasi dalam menciptakan solusi inovatif.
          </p>
          <p className="font-sans text-lg md:text-xl text-left md:text-center text-gray-600 dark:text-gray-200">
            IMPHNEN bersama Kolosal.ai mengadakan Hackathon dengan tema lomba{' '}
            <span className="font-semibold text-primary-500">
              "Inovasi AI: Mendorong Usaha Lokal dengan AI Inklusif"
            </span>
            .
          </p>
        </div>
      </section>

      {/* Prizes Section */}
      <section
        id="hadiah"
        className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 dark:bg-linear-to-b dark:from-gray-950 dark:to-gray-900"
      >
        <div className="max-w-lg md:max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-bai-jamjuree dark:text-white">
              Hadiah <span className="text-primary-500">Menarik</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary-500 font-semibold font-sans">
              Total Prize Pool Rp14.500.000
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Prize 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-xl px-4 py-8 shadow-lg border-2 border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Icon
                    icon="ic:round-star"
                    className="h-8 w-8 text-primary-500"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 dark:text-white">
                Juara 1
              </h3>
              <p className="text-2xl font-bold text-primary-500 text-center font-sans">
                Rp6.000.000
              </p>
            </div>

            {/* Prize 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-xl px-4 py-8 shadow-lg border-2 border-gray-300 dark:border-gray-700 hover:border-gray-500 dark:hover:border-gray-500 transition-colors">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Icon
                    icon="ic:round-star"
                    className="h-8 w-8 text-gray-600 dark:text-gray-200"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 dark:text-white">
                Juara 2
              </h3>
              <p className="text-2xl font-bold text-primary-500 text-center font-sans">
                Rp4.000.000
              </p>
            </div>

            {/* Prize 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-xl px-4 py-8 shadow-lg border-2 border-gray-300 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 transition-colors">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <Icon
                    icon="ic:round-star"
                    className="h-8 w-8 text-orange-600 dark:text-orange-500"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 dark:text-white">
                Juara 3
              </h3>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-500 text-center font-sans">
                Rp2.500.000
              </p>
            </div>

            {/* Special Prize */}
            <div className="bg-white dark:bg-gray-900 rounded-xl px-4 py-8 shadow-lg border-2 border-gray-300 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transition-colors">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Icon
                    icon="ic:round-star"
                    className="h-8 w-8 text-purple-600 dark:text-purple-500"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 dark:text-white">
                Juara Kategori Lainnya
              </h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-500 text-center font-sans">
                Rp2.000.000
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-gray-950"
      >
        <div className="max-w-4xl mx-auto font-sans">
          <div className="text-center mb-12 font-bai-jamjuree">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white">
              Timeline <span className="text-primary-500">Acara</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-200">
              Jadwal lengkap pelaksanaan hackathon
            </p>
          </div>

          <div>
            {/* Timeline Item 1 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="flex-1 pb-8">
                <p className="text-primary-500 font-semibold mb-2">
                  30 November 2025
                </p>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Penutupan Registrasi
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Batas akhir pendaftaran peserta hackathon.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="flex-1 pb-8">
                <p className="text-primary-500 font-semibold mb-2">
                  30 November 2025
                </p>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Technical Meeting
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Akan diadakan technical meeting terkait lomba melalui Google
                  Meet. Stay tune di grup WA Hackathon.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="flex-1 pb-8">
                <p className="text-primary-500 font-semibold mb-2">
                  1 - 7 Desember 2025
                </p>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Tahap Penyisihan
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Peserta mengerjakan tantangan yang diberikan.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="flex-1 pb-8">
                <p className="text-primary-500 font-semibold mb-2">
                  8 - 14 Desember 2025
                </p>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Penilaian & Webinar
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Proses penilaian oleh juri dan sesi webinar.
                </p>
              </div>
            </div>

            {/* Timeline Item 5 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-primary-500 font-semibold mb-2">
                  15 Desember 2025
                </p>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Pengumuman & Final
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Presentasi final dan pengumuman pemenang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Judges Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="md:max-w-6xl mx-auto">
          <div className="text-center mb-12 font-bai-jamjuree">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white">
              Dewan <span className="text-primary-500">Juri</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-200">
              Perwakilan dari IMPHNEN dan Kolosal.ai yang akan menilai karya
            </p>
          </div>

          <div className="w-full max-w-md md:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Judge 1 */}
            <div className="flex flex-col justify-between bg-white dark:bg-gray-800 rounded-xl px-4 py-8 shadow-lg text-center">
              <h3 className="text-p3 font-bold mb-1 dark:text-white">
                Alifais Farrel Ramdhani
              </h3>
              <div>
                <p className="text-primary-500 font-semibold mb-1">CTO</p>
                <p className="text-gray-600 dark:text-gray-200">Kolosal.ai</p>
              </div>
            </div>

            {/* Judge 2 */}
            <div className="flex flex-col justify-between bg-white dark:bg-gray-800 rounded-xl px-4 py-8 shadow-lg text-center">
              <h3 className="text-p3 font-bold mb-1 dark:text-white">
                Anka Tama
              </h3>
              <div>
                <p className="text-primary-500 font-semibold mb-1">Admin</p>
                <p className="text-gray-600 dark:text-gray-200">IMPHNEN</p>
              </div>
            </div>

            {/* Judge 3 */}
            <div className="flex flex-col justify-between bg-white dark:bg-gray-800 rounded-xl px-4 py-8 shadow-lg text-center">
              <h3 className="text-p3 font-bold mb-1 dark:text-white">
                Hafid Nur
              </h3>
              <div>
                <p className="text-primary-500 font-semibold mb-1">Moderator</p>
                <p className="text-gray-600 dark:text-gray-200">IMPHNEN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-gray-950"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-500">
              FAQ
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-200">
              Pertanyaan yang Sering Diajukan
            </p>
          </div>

          <div className="space-y-4 font-sans">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-900"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-primary-500 transform transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white">
            Sponsor & <span className="text-primary-500">Partner</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-200 mb-8">
            Acara ini sepenuhnya disponsori oleh
          </p>

          <div className="flex justify-center">
            <a
              href="https://kolosal.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg inline-block border-2 border-transparent hover:border-gray-500 dark:hover:border-gray-500 transition-colors"
            >
              <img
                src="images/sponsors/kolosal-logo_rlxbck.svg"
                alt="Kolosal.ai"
                className="h-12 md:h-16 dark:invert"
              />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="masuk"
        className="py-20 md:py-28 px-4 md:px-8 bg-linear-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900"
      >
        <div className="max-w-4xl mx-auto text-center font-sans">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-bai-jamjuree dark:text-white">
            Segera Daftarkan <span className="text-primary-500">Timmu!</span>
          </h2>
          <p className="text-lg md:text-xl text-left md:text-center text-gray-600 dark:text-gray-200 mb-8">
            Jangan lewatkan kesempatan emas untuk bersaing dengan developer
            terbaik,
            <br className="hidden md:block" /> belajar dari para ahli, dan
            memenangkan hadiah jutaan rupiah!
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/auth/signup')}
              className="px-8 py-3 bg-primary-500 text-white text-lg rounded-lg hover:bg-primary-700 transition-colors font-semibold cursor-pointer"
            >
              Daftar Sekarang
            </button>
            <a
              href="https://chat.whatsapp.com/BlxrYh9uSC37d7VPhJslGL"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors font-semibold"
            >
              Gabung Grup WA Hackathon
            </a>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
            Pendaftaran ditutup pada{' '}
            <span className="text-primary-500 font-semibold">
              30 November 2025
            </span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 px-4 md:px-8 font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4 font-bai-jamjuree">
                <span className="text-2xl font-bold">IMPHNEN</span>
                <span className="text-2xl font-bold text-blue-500">
                  Hackathon
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Wujudkan ide brilian mu menjadi solusi nyata. Bergabunglah dalam
                IMPHNEN Hackathon dan jadilah bagian dari perubahan teknologi
                masa depan.
              </p>
              <div className="flex gap-4 mt-4">
                <div className="flex gap-4">
                  <a
                    href="https://fb.com/groups/programmerhandal"
                    className="text-gray-400 hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Icon icon="ic:baseline-facebook" className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/imphnen.dev"
                    className="text-gray-400 hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Icon icon="mdi:instagram" className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/imphnen"
                    className="text-gray-400 hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Icon icon="mdi:linkedin" className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@imphnen"
                    className="text-gray-400 hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <Icon icon="ic:baseline-tiktok" className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/IMPHNEN"
                    className="text-gray-400 hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Icon icon="mdi:github" className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 font-bai-jamjuree">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#timeline"
                    className="hover:text-white transition-colors"
                  >
                    Timeline
                  </a>
                </li>
                <li>
                  <a
                    href="#hadiah"
                    className="hover:text-white transition-colors"
                  >
                    Hadiah
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link
                    to="/auth/signup"
                    className="hover:text-white transition-colors"
                  >
                    Daftar
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4 font-bai-jamjuree">
                Contact
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <Icon
                    icon="material-symbols:mail-outline-rounded"
                    className="min-w-5 min-h-5 mt-0.5"
                  />
                  <a
                    href="mailto:imphnen@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    imphnen@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    icon="solar:phone-linear"
                    className="min-w-5 min-h-5 mt-0.5"
                  />
                  <a
                    href="https://chat.whatsapp.com/BlxrYh9uSC37d7VPhJslGL"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WA Group Hackathon
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    icon="streamline-plump:web"
                    className="min-w-5 min-h-5 mt-0.5"
                  />
                  <a
                    href="https://imphnen.dev"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IMPHNEN.dev
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>
              © 2025 IMPHNEN - Ingin Menjadi Programmer Handal Namun Enggan
              Ngoding. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
