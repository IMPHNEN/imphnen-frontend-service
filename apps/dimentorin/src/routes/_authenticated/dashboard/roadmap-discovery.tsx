import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '@iconify/react'

export const Route = createFileRoute('/_authenticated/dashboard/roadmap-discovery')({
  component: RoadmapDiscoveryPage,
})

function RoadmapDiscoveryPage() {
  return (
    <section className="w-[972px] h-[438px]">
      <div className="w-full h-full">
        <div className="w-[421px] mx-auto text-center">
          <h2 className="text-[23px] font-normal leading-[1.2] text-[#6d6d6d]">Welcome to Roadmap Discovery</h2>
          <h1 className="text-[46px] font-bold leading-[1.2] text-[#5d5d5d] mt-[12px]">Start your Journey</h1>
        </div>

        <div className="w-[528px] h-[146px] mx-auto mt-10 flex items-start">
          <img
            src="/image/mascot-1.png"
            alt="Mascot"
            className="w-[146px] h-[146px] object-cover"
          />

          <div className="w-[381px] h-[78px] bg-white mt-0">
            <p className="text-[19px] leading-[1.2] text-[#6d6d6d] px-5 py-4">
              Lagi pengen belajar apa? Ketik aja di sini,
              <br />
              biar AI bantuin bikin roadmap-nya.
            </p>
          </div>
        </div>

        <div className="w-[732px] h-[43px] mx-auto mt-10">
          <div className="w-full h-[34px] flex items-center gap-4">
            <input
              type="text"
              placeholder="Mau belajar roadmap apa?"
              className="w-[468px] h-[34px] border border-[#d1d1d1] rounded-sm px-3 text-[15px] text-[#6d6d6d] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#23a1eb]"
            />

            <select
              className="w-[248px] h-[34px] border border-[#d1d1d1] rounded-sm px-3 text-[15px] text-[#6d6d6d] bg-white focus:outline-none focus:border-[#23a1eb]"
              defaultValue="Tingkat Belajar"
            >
              <option disabled>Tingkat Belajar</option>
              <option>Pemula</option>
              <option>Menengah</option>
              <option>Lanjutan</option>
            </select>
          </div>

          <button className="w-[140px] h-[34px] mt-[49px] mx-auto flex items-center justify-center gap-2 bg-[#23a1eb] text-[#f6f6f6] rounded-sm text-[15px] font-semibold hover:bg-[#1d8fd3] transition-colors cursor-pointer">
            <Icon icon="mdi:star-four-points" width="12" />
            Generate
          </button>
        </div>
      </div>
    </section>
  )
}
