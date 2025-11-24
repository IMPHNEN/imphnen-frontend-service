import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Siapa yang bisa mengikuti hackathon ini?',
      answer:
        'Hackathon ini terbuka untuk mahasiswa, fresh graduate, dan profesional muda yang memiliki passion di bidang teknologi. Peserta dapat mendaftar secara tim.',
    },
    {
      question: 'Apakah ada biaya pendaftaran?',
      answer:
        'Tidak, hackathon ini gratis dan terbuka untuk semua peserta yang memenuhi kriteria.',
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
        'Ya, peserta harus membentuk tim dengan maksimal 3 orang per tim.',
    },
    {
      question: 'Apakah boleh menggunakan AI (vibe coding)?',
      answer:
        'Ya, peserta diperbolehkan menggunakan AI tools untuk membantu development.',
    },
    {
      question: 'Apa project wajib di-deploy?',
      answer:
        'Ya, project harus di-deploy dan dapat diakses secara online untuk penilaian.',
    },
    {
      question: 'Apakah peserta mendapatkan sertifikat?',
      answer:
        'Ya, semua peserta yang menyelesaikan hackathon akan mendapatkan sertifikat.',
    },
    {
      question: 'Website error dan terjadi masalah?',
      answer:
        'Silakan hubungi kami melalui grup WA Hackathon atau email imphnen@gmail.com.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl font-bold">IMPHNEN</span>
          <span className="text-lg md:text-xl font-bold text-blue-600">
            Hackathon
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href="#timeline"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Timeline
          </a>
          <a
            href="#hadiah"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Hadiah
          </a>
          <a
            href="#faq"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            FAQ
          </a>

          <button
            onClick={() => navigate('/auth/login')}
            className="px-4 lg:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
          >
            Daftar Sekarang
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
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
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white">
          <div className="flex flex-col gap-4 px-4 py-4">
            <a href="#timeline" className="text-gray-600 hover:text-gray-900">
              Timeline
            </a>
            <a href="#hadiah" className="text-gray-600 hover:text-gray-900">
              Hadiah
            </a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900">
              FAQ
            </a>
            <a href="#masuk" className="text-gray-600 hover:text-gray-900">
              Masuk
            </a>
            <button
              onClick={() => navigate('/auth/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 md:px-8 py-10 md:py-20 bg-gradient-to-b from-white to-gray-50">
        {/* Logos */}
        <div className="flex items-center gap-4 md:gap-8 lg:gap-12 mb-8 md:mb-12 lg:mb-16 flex-wrap justify-center">
          <div className="flex items-center">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-600">
              IMPHNEN
            </span>
          </div>
          <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-400">
            ×
          </span>
          <div className="flex items-center">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold">
              Kolosal
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-gray-900 mb-6 md:mb-10 lg:mb-12 text-center">
          Hackathon
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-3xl lg:text-4xl text-blue-600 font-semibold mb-6 md:mb-8 text-center px-4">
          "Inovasi AI: Mendorong Usaha Lokal dengan AI Inklusif"
        </p>

        {/* Description */}
        <p className="text-base md:text-xl lg:text-2xl text-gray-600 max-w-xs md:max-w-2xl lg:max-w-3xl text-center mb-8 md:mb-12 px-4">
          Kompetisi pengembangan teknologi untuk menciptakan
          <br className="hidden md:block" /> solusi inovatif yang menghadirkan
          dampak nyata
        </p>

        {/* Status */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-10 md:mb-16 text-sm md:text-lg lg:text-xl text-gray-600">
          <div className="flex items-center gap-2 md:gap-3">
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="8" fill="#10b981" />
            </svg>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-center">
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
            </svg>
            <span>Pendaftaran hingga 30 November 2025</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-4 md:px-0">
          <button
            onClick={() => navigate('/auth/login')}
            className="w-full md:w-auto px-6 md:px-8 py-3 bg-blue-600 text-white text-base md:text-lg rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
          >
            Daftar Sekarang
          </button>
          <button className="w-full md:w-auto px-6 md:px-8 py-3 bg-white text-gray-900 text-base md:text-lg rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors text-center font-semibold">
            Gabung Grup WA Hackathon
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 md:mt-20">
          <svg
            className="w-6 h-6 text-gray-400 animate-bounce"
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
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tentang <span className="text-blue-600">Hackathon</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            <span className="font-semibold text-gray-900">Hackathon</span>{' '}
            adalah kompetisi pengembangan teknologi yang mengajak talenta muda
            untuk berkolaborasi dalam menciptakan solusi inovatif.
          </p>
          <p className="text-lg md:text-xl text-gray-600">
            IMPHNEN bersama Kolosal.ai mengadakan Hackathon dengan tema lomba{' '}
            <span className="font-semibold text-blue-600">
              "Inovasi AI: Mendorong Usaha Lokal dengan AI Inklusif"
            </span>
            .
          </p>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="hadiah" className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Hadiah <span className="text-blue-600">Menarik</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-600 font-semibold">
              Total Prize Pool Rp14.500.000
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Prize 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-500 transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Juara 1</h3>
              <p className="text-3xl font-bold text-blue-600 text-center">
                Rp6.000.000
              </p>
            </div>

            {/* Prize 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-300 transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Juara 2</h3>
              <p className="text-3xl font-bold text-blue-600 text-center">
                Rp4.000.000
              </p>
            </div>

            {/* Prize 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-orange-300 transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Juara 3</h3>
              <p className="text-3xl font-bold text-orange-600 text-center">
                Rp2.500.000
              </p>
            </div>

            {/* Special Prize */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-purple-300 transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">
                Juara Kategori Lainnya
              </h3>
              <p className="text-3xl font-bold text-purple-600 text-center">
                Rp2.000.000
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Timeline <span className="text-blue-600">Acara</span>
            </h2>
            <p className="text-lg text-gray-600">
              Jadwal lengkap pelaksanaan hackathon
            </p>
          </div>

          <div className="space-y-8">
            {/* Timeline Item 1 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-300"></div>
              </div>
              <div className="flex-1 pb-8">
                <p className="text-blue-600 font-semibold mb-2">
                  30 November 2025
                </p>
                <h3 className="text-xl font-bold mb-2">Penutupan Registrasi</h3>
                <p className="text-gray-600">
                  Batas akhir pendaftaran peserta hackathon.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-300"></div>
              </div>
              <div className="flex-1 pb-8">
                <p className="text-blue-600 font-semibold mb-2">
                  30 November 2025
                </p>
                <h3 className="text-xl font-bold mb-2">Technical Meeting</h3>
                <p className="text-gray-600">
                  Akan diadakan technical meeting terkait lomba melalui Google
                  Meet. Stay tune di grup WA Hackathon.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-300"></div>
              </div>
              <div className="flex-1 pb-8">
                <p className="text-blue-600 font-semibold mb-2">
                  1 - 7 Desember 2025
                </p>
                <h3 className="text-xl font-bold mb-2">Tahap Penyisihan</h3>
                <p className="text-gray-600">
                  Peserta mengerjakan tantangan yang diberikan.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-300"></div>
              </div>
              <div className="flex-1 pb-8">
                <p className="text-blue-600 font-semibold mb-2">
                  8 - 14 Desember 2025
                </p>
                <h3 className="text-xl font-bold mb-2">Penilaian & Webinar</h3>
                <p className="text-gray-600">
                  Proses penilaian oleh juri dan sesi webinar.
                </p>
              </div>
            </div>

            {/* Timeline Item 5 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-blue-600 font-semibold mb-2">
                  15 Desember 2025
                </p>
                <h3 className="text-xl font-bold mb-2">Pengumuman & Final</h3>
                <p className="text-gray-600">
                  Presentasi final dan pengumuman pemenang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Judges Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Dewan <span className="text-blue-600">Juri</span>
            </h2>
            <p className="text-lg text-gray-600">
              Perwakilan dari IMPHNEN dan Kolosal.ai yang akan menilai karya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Judge 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">
                Alifais Farrel Ramdhani
              </h3>
              <p className="text-blue-600 font-semibold mb-1">CTO</p>
              <p className="text-gray-600">Kolosal.ai</p>
            </div>

            {/* Judge 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Anka Tama</h3>
              <p className="text-blue-600 font-semibold mb-1">Admin</p>
              <p className="text-gray-600">IMPHNEN</p>
            </div>

            {/* Judge 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Hafid Nur</h3>
              <p className="text-blue-600 font-semibold mb-1">Moderator</p>
              <p className="text-gray-600">IMPHNEN</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-600">
              FAQ
            </h2>
            <p className="text-lg text-gray-600">
              Pertanyaan yang Sering Diajukan
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-blue-600 transform transition-transform ${
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
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Sponsor & <span className="text-blue-600">Partner</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Acara ini sepenuhnya disponsori oleh
          </p>

          <div className="flex justify-center">
            <div className="bg-white rounded-xl p-8 shadow-lg inline-block">
              <span className="text-3xl font-bold">Kolosal</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="masuk"
        className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Segera Daftarkan <span className="text-blue-600">Timmu!</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Jangan lewatkan kesempatan emas untuk bersaing dengan developer
            terbaik,
            <br className="hidden md:block" />
            belajar dari para ahli, dan memenangkan hadiah jutaan rupiah!
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/auth/login')}
              className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Daftar Sekarang
            </button>
            <button className="px-8 py-3 bg-white text-gray-900 text-lg rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors font-semibold">
              Gabung Grup WA Hackathon
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Pendaftaran ditutup pada{' '}
            <span className="text-blue-600 font-semibold">
              30 November 2025
            </span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
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
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
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
                  <a
                    href="#masuk"
                    className="hover:text-white transition-colors"
                  >
                    Daftar
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  imphnen@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  WA Group Hackathon
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  IMPHNEN.dev
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
    </div>
  );
}
