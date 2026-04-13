import { FC } from 'react'
import { Icon } from '@iconify/react'

interface MentoringDetailModalProps {
  isOpen: boolean
  onClose: () => void
  onContactMentor: () => void
  mentor: {
    name: string
    title: string
    topics: string[]
    image: string
  }
  session: {
    date: string
    time: string
    location: string
    link: string
  }
}

export const MentoringDetailModal: FC<MentoringDetailModalProps> = ({
  isOpen,
  onClose,
  onContactMentor,
  mentor,
  session,
}) => {
  if (!isOpen) return null

  const handleCopyLink = () => {
    navigator.clipboard.writeText(session.link)
    // You could add a toast here if you have a toast library
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[840px] overflow-hidden flex flex-col relative p-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[23px] font-bold text-[#23A1EB] tracking-tight">Detail Sesi Mentoring</h2>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-[#454545] transition-colors cursor-pointer p-1"
          >
            <Icon icon="mdi:close" width="28" />
          </button>
        </div>

        <div className="grid grid-cols-[306px_1fr] gap-[64px]">
          {/* Left Column: Mentor Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-[23px] font-bold text-[#23A1EB] mb-8 w-full">Your Senpai</h3>
            <div className="flex flex-col items-center text-center">
              <div className="w-[180px] h-[217px] mb-8 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                <img
                  src={mentor.image || '/image/mascot-character.webp'}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[19px] font-bold text-[#454545] leading-[1.2] mb-1">
                {mentor.name}
              </p>
              <p className="text-[15px] font-medium text-[#888888]">
                {mentor.title}
              </p>
            </div>
          </div>

          {/* Right Column: Session Info */}
          <div className="flex flex-col pt-1">
            <div className="mb-6">
              <p className="text-[15px] font-bold text-[#454545] mb-3">Topik</p>
              <div className="flex flex-wrap gap-2">
                {mentor.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="h-[31px] px-5 rounded-full bg-[#F3F4F6] text-[10px] font-bold text-[#888888] inline-flex items-center uppercase tracking-wider"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-4">
              <div>
                <p className="text-[15px] font-bold text-[#454545] mb-2">Tanggal</p>
                <div className="w-full h-[43px] rounded-lg border border-[#D1D1D1] px-5 flex items-center text-[15px] text-[#888888] font-medium bg-white">
                  {session.date}
                </div>
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#454545] mb-2">Waktu</p>
                <div className="w-full h-[43px] rounded-lg border border-[#D1D1D1] px-5 flex items-center text-[15px] text-[#888888] font-medium bg-white">
                  {session.time}
                </div>
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#454545] mb-2">Lokasi</p>
                <div className="w-full h-[43px] rounded-lg border border-[#D1D1D1] px-5 flex items-center text-[15px] text-[#888888] font-medium bg-white">
                  {session.location}
                </div>
              </div>
            </div>

            <div className="mb-10">
              <p className="text-[15px] font-bold text-[#454545] mb-2">Link Sesi Mentoring</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[43px] rounded-lg border border-[#D1D1D1] px-5 flex items-center text-[15px] text-[#23A1EB] font-bold underline truncate bg-white">
                  {session.link}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="h-[43px] px-6 bg-[#23A1EB] text-white rounded-lg text-[15px] font-bold cursor-pointer hover:bg-[#1e88c7] transition-colors"
                >
                  Salin Link
                </button>
              </div>
            </div>

            <button
              onClick={onContactMentor}
              className="w-full h-[43px] rounded-lg bg-[#23A1EB] text-white text-[15px] font-bold cursor-pointer flex items-center justify-center gap-2 hover:bg-[#1e88c7] transition-colors shadow-sm"
            >
              <Icon icon="mdi:message-outline" width="20" />
              Hubungi Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
