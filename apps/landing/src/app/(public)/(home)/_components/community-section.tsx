import SOCIALS from '@/data/socials.json';
import {
  FaArrowRight,
  FaDiscord,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from 'react-icons/fa';

const ICON_MAP: Record<string, typeof FaArrowRight> = {
  FaFacebook, FaDiscord, FaGithub, FaInstagram, FaTiktok, FaLinkedin,
};

const COLOR_MAP: Record<string, string> = {
  FaFacebook: 'text-[#1877F2]',
  FaDiscord: 'text-[#5865F2]',
  FaGithub: 'text-[#000000]',
  FaInstagram: 'text-[#E4405F]',
  FaTiktok: 'text-[#000000]',
  FaLinkedin: 'text-[#0A66C2]',
};

export function CommunitySection() {
  return (
    <section id="community" className="w-full py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Bergabung dengan Komunitas Kami di
            <span className="block mt-2 text-primary-500">Berbagai Platform</span>
          </h2>
          <p className="max-w-[600px] mx-auto text-gray-600 md:text-lg/relaxed mt-4">
            Terhubung dengan sesama developer di komunitas kami
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SOCIALS.map((community, index) => {
            const IconComponent = ICON_MAP[community.icon] || FaArrowRight;
            const iconColor = COLOR_MAP[community.icon] || 'text-primary-500';

            return (
              <div
                key={index}
                className="group relative p-8 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 animate-[fadeInUp_0.4s_ease-out]"
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex flex-col items-start gap-5">
                  <div className="flex items-center gap-4">
                    <IconComponent className={`w-8 h-8 ${iconColor} transition-colors`} />
                    <h3 className="text-xl font-semibold text-gray-900">{community.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm/relaxed">{community.description}</p>
                  <a
                    href={community.link}
                    className="inline-flex items-center gap-2 mt-2 text-sm font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Jelajahi Komunitas</span>
                    <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
