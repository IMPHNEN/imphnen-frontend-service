import { FC, useState } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@imphnen-frontend-service/ui/atoms'

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
    link?: string
  }
}

export const MentoringDetailModal: FC<MentoringDetailModalProps> = ({
  isOpen,
  onClose,
  onContactMentor,
  mentor,
  session,
}) => {
  const [pertanyaan, setPertanyaan] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col relative p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-primary-600">Detail Sesi Mentoring</h2>
          <Button
            variant="text"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon icon="mdi:close" width="24" />
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-[280px_1fr] gap-12">
          {/* Left Column: Mentor Card */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-primary-600 mb-6 w-full text-center">Your Senpai</h3>
            <div className="flex flex-col items-center text-center w-full bg-gray-50 rounded-xl p-6">
              <div className="w-40 h-48 mb-6 overflow-hidden rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <img
                  src={mentor.image || '/image/mascot-character.webp'}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg font-bold text-gray-900 leading-tight mb-1">
                {mentor.name}
              </p>
              <p className="text-sm text-gray-600">
                {mentor.title}
              </p>
            </div>
          </div>

          {/* Right Column: Session Details */}
          <div className="flex flex-col gap-6">
            {/* Topics */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Topics</label>
              <div className="flex flex-wrap gap-2 bg-gray-50 p-4 rounded-lg">
                {mentor.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 inline-flex items-center"
                  >
                    ▪ {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal</label>
                <div className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 font-medium">
                  {session.date}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Waktu</label>
                <div className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 font-medium">
                  {session.time}
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Lokasi</label>
              <div className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 font-medium">
                {session.location}
              </div>
            </div>

            {/* Pertanyaan Untuk Senpai */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Pertanyaan Untuk Senpai</label>
              <textarea
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
                placeholder="Hi [Nama Mentor], Saya [Nama Kamu] & saya berharap dapat memiliki sesi mentoring dengan Anda.

Saat ini, saya tertarik untuk mengejar _____. Tujuan saya untuk sesi ini adalah _____.

Saya ingin tahu secara khusus tentang _____:
1. Pertanyaan Anda
2. ...
3. ..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                rows={6}
              />
            </div>

            {/* Contact Button */}
            <Button
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
              onClick={onContactMentor}
            >
              <Icon icon="mdi:phone-outline" width="18" />
              Hubungi Senpai
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
