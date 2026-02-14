const apps = [
  { name: 'Landing', domain: 'imphnen.dev', type: 'Next.js', color: 'blue' },
  { name: 'WWW', domain: 'www.imphnen.dev', type: 'Redirect', color: 'purple' },
  { name: 'Gacha', domain: 'gacha.imphnen.dev', type: 'Vite', color: 'green' },
  { name: 'Backoffice', domain: 'backoffice.imphnen.dev', type: 'Vite', color: 'green' },
  { name: 'Dimentorin', domain: 'dimentorin.imphnen.dev', type: 'Vite', color: 'green' },
  { name: 'Hackathon', domain: 'hackathon.imphnen.dev', type: 'Vite', color: 'green' },
  { name: 'QR Campaign', domain: 'qr.imphnen.dev', type: 'Vite', color: 'green' },
  { name: 'Infra', domain: 'infra.imphnen.dev', type: 'Vite', color: 'green' },
  { name: 'API QR', domain: 'api-qr.imphnen.dev', type: 'Backend', color: 'orange' },
];

const techStack = [
  { category: 'OS', items: ['NixOS 25.05'] },
  { category: 'Web Server', items: ['Nginx'] },
  { category: 'SSL', items: ['Let\'s Encrypt (ACME)'] },
  { category: 'Build', items: ['Nix Flakes', 'Nx Monorepo'] },
  { category: 'CI/CD', items: ['GitHub Actions', 'Cachix'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Vite', 'TailwindCSS'] },
  { category: 'Backend', items: ['Go', 'Supabase'] },
  { category: 'Secrets', items: ['sops-nix'] },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">
                I
              </div>
              <span className="text-xl font-semibold">IMPHNEN Infrastructure</span>
            </div>
            <a
              href="https://github.com/IMPHNEN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Infrastructure Overview
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Declarative NixOS infrastructure powering IMPHNEN's frontend applications
            on Hetzner Cloud.
          </p>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Architecture</h2>
          <div className="card bg-[#141414] border-zinc-800 p-8">
            <div className="flex flex-col items-center gap-6">
              {/* Internet */}
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-2xl">🌐</span>
                <span>Internet</span>
              </div>
              <div className="w-px h-8 bg-zinc-700" />

              {/* Cloudflare */}
              <div className="card bg-orange-500/10 border-orange-500/30 px-6 py-3">
                <span className="badge badge-orange">Cloudflare</span>
                <p className="text-sm text-zinc-400 mt-1">DNS + CDN + DDoS Protection</p>
              </div>
              <div className="w-px h-8 bg-zinc-700" />

              {/* Hetzner VPS */}
              <div className="card bg-[#1a1a1a] border-zinc-700 w-full max-w-3xl">
                <div className="text-center mb-4">
                  <span className="badge badge-purple">Hetzner Cloud VPS</span>
                  <p className="text-sm text-zinc-400 mt-1">NixOS | 167.235.70.37</p>
                </div>

                {/* Nginx */}
                <div className="card bg-green-500/10 border-green-500/30 mb-4">
                  <div className="text-center">
                    <span className="badge badge-green">Nginx</span>
                    <p className="text-sm text-zinc-400 mt-1">Reverse Proxy + Static Files + SSL Termination</p>
                  </div>
                </div>

                {/* Apps Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {apps.map((app) => (
                    <div
                      key={app.name}
                      className="card bg-[#0a0a0a] border-zinc-800 text-center p-3"
                    >
                      <p className="font-medium text-sm">{app.name}</p>
                      <p className="text-xs text-zinc-500">{app.domain}</p>
                      <span className={`badge badge-${app.color} mt-2 text-xs`}>
                        {app.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployed Apps */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Deployed Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
              <a
                key={app.name}
                href={`https://${app.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-[#141414] border-zinc-800 hover:border-zinc-600 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold group-hover:text-blue-400 transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-sm text-zinc-500">{app.domain}</p>
                  </div>
                  <span className={`badge badge-${app.color}`}>{app.type}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div key={tech.category} className="card bg-[#141414] border-zinc-800">
                <h3 className="text-sm text-zinc-500 uppercase tracking-wider mb-2">
                  {tech.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span key={item} className="badge badge-blue">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deployment Flow */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Deployment Flow</h2>
          <div className="card bg-[#141414] border-zinc-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span>1</span>
                </div>
                <p className="text-sm font-medium">Push to GitHub</p>
                <p className="text-xs text-zinc-500">develop branch</p>
              </div>
              <div className="hidden md:block text-zinc-600">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span>2</span>
                </div>
                <p className="text-sm font-medium">GitHub Actions</p>
                <p className="text-xs text-zinc-500">nix build</p>
              </div>
              <div className="hidden md:block text-zinc-600">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span>3</span>
                </div>
                <p className="text-sm font-medium">Push to Cachix</p>
                <p className="text-xs text-zinc-500">binary cache</p>
              </div>
              <div className="hidden md:block text-zinc-600">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span>4</span>
                </div>
                <p className="text-sm font-medium">Server Pull</p>
                <p className="text-xs text-zinc-500">nixos-rebuild</p>
              </div>
              <div className="hidden md:block text-zinc-600">→</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span>✓</span>
                </div>
                <p className="text-sm font-medium">Live</p>
                <p className="text-xs text-zinc-500">Zero downtime</p>
              </div>
            </div>
          </div>
        </section>

        {/* Repositories */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Repositories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://github.com/IMPHNEN/imphnen-frontend-service"
              target="_blank"
              rel="noopener noreferrer"
              className="card bg-[#141414] border-zinc-800 hover:border-zinc-600 transition-colors"
            >
              <h3 className="font-semibold mb-1">imphnen-frontend-service</h3>
              <p className="text-sm text-zinc-400">
                Nx monorepo containing all frontend applications
              </p>
            </a>
            <a
              href="https://github.com/IMPHNEN/imphnen-infrastructure"
              target="_blank"
              rel="noopener noreferrer"
              className="card bg-[#141414] border-zinc-800 hover:border-zinc-600 transition-colors"
            >
              <h3 className="font-semibold mb-1">imphnen-infrastructure</h3>
              <p className="text-sm text-zinc-400">
                NixOS flake configuration for server deployment
              </p>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="container mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          <p>IMPHNEN Infrastructure &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
