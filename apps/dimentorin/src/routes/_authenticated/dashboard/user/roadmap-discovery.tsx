import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { Button, Card, Input, NativeSelect } from '@imphnen-frontend-service/ui/atoms'

export const Route = createFileRoute('/_authenticated/dashboard/user/roadmap-discovery')({
  component: RoadmapDiscoveryPage,
})

function RoadmapDiscoveryPage() {
  const navigate = useNavigate()

  const handleGenerate = () => {
    navigate({ to: '/dashboard/user/learning-path' })
  }

  return (
    <section className="flex flex-col items-center pt-10 min-h-screen bg-linear-to-t from-bg-light-blue via-bg-light-blue to-white">
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
          className="w-36.5 h-36.5 object-contain"
        />

        <Card className="relative p-6 max-w-95">
          {/* Speech bubble arrow */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
          <p className="text-[19px] leading-[1.3] text-text-secondary">
            Lagi pengen belajar apa? Ketik aja di sini,
            <br />
            biar AI bantuin bikin roadmap-nya.
          </p>
        </Card>
      </div>

      <div className="w-full max-w-183">
        <div className="flex gap-4 mb-12">
          <Input type="text" size="lg" placeholder="Mau belajar roadmap apa?" />
          <div className="relative w-62">
            <NativeSelect size="lg" defaultValue="">
              <option value="" disabled>
                Tingkat Belajar
              </option>
              <option value="pemula">Pemula</option>
              <option value="menengah">Menengah</option>
              <option value="lanjutan">Lanjutan</option>
            </NativeSelect>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              width="20"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleGenerate}
          >
            <Icon icon="mdi:sparkles" width="16" />
            Generate
          </Button>
        </div>
      </div>
    </section>
  )
}
