import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Icon } from '@iconify/react'

export const Route = createFileRoute('/_authenticated/dashboard/roadmap-discovery')({
  component: RoadmapDiscoveryPage,
})

function RoadmapDiscoveryPage() {
  const navigate = useNavigate()

  const handleGenerate = () => {
    navigate({ to: '/dashboard/learning-path' })
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-t from-bg-light-blue via-bg-light-blue to-white">
      <div className="text-center mb-12">
        <h2 className="text-[23px] font-normal text-text-secondary mb-2">
          Welcome to <span className="text-primary-accent">Roadmap Discovery</span>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-[46px] font-bold text-neutral-600">
            Start your <span className="text-primary-accent">Journey</span>
          </h1>
          <Icon icon="mdi:sparkles" className="text-primary-accent text-4xl" />
        </div>
      </div>

      <div className="flex items-center gap-8 mb-12">
        <img
          src="/image/mascot-1.png"
          alt="Mascot"
          className="w-[146px] h-[146px] object-contain"
        />

        <div className="relative bg-white rounded-xl shadow-sm p-6 border border-neutral-100 max-w-[380px]">
          {/* Speech bubble arrow */}
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-white border-b-[8px] border-b-transparent" />
          <p className="text-[19px] leading-[1.3] text-text-secondary">
            Lagi pengen belajar apa? Ketik aja di sini,
            <br />
            biar AI bantuin bikin roadmap-nya.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[732px]">
        <div className="flex gap-4 mb-12">
          <input
            type="text"
            placeholder="Mau belajar roadmap apa?"
            className="flex-1 h-[43px] border border-neutral-200 rounded-sm px-4 text-[15px] text-text-label placeholder:text-placeholder focus:outline-none focus:border-primary-accent transition-all bg-white"
          />
          <div className="relative w-[248px]">
            <select
              className="w-full h-[43px] border border-neutral-200 rounded-sm px-4 text-[15px] text-text-label bg-white focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>
                Tingkat Belajar
              </option>
              <option value="pemula">Pemula</option>
              <option value="menengah">Menengah</option>
              <option value="lanjutan">Lanjutan</option>
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              width="20"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            className="h-[43px] px-10 bg-primary-accent text-white rounded-sm text-[15px] font-semibold hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <Icon icon="mdi:sparkles" width="16" />
            Generate
          </button>
        </div>
      </div>
    </section>
  )
}
