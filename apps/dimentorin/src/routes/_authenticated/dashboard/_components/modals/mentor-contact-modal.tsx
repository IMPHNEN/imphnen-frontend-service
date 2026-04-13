import { FC } from 'react'
import { Icon } from '@iconify/react'

interface MentorContactModalProps {
  isOpen: boolean
  onClose: () => void
  mentor: {
    name: string
    topics: string[]
  } | null
}

export const MentorContactModal: FC<MentorContactModalProps> = ({ isOpen, onClose, mentor }) => {
  if (!isOpen || !mentor) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
        >
          <Icon icon="mdi:close" width="24" />
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-bg-placeholder rounded-full mx-auto mb-4 overflow-hidden">
             <img src="/image/mascot-character.webp" alt="Mentor" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{mentor.name}</h3>
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {mentor.topics.map((t, i) => (
              <span key={i} className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-[10px] font-bold rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hubungi mentor melalui platform berikut:</p>
          
          <a
            href="https://wa.me/628123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl hover:bg-green-100 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Icon icon="mdi:whatsapp" width="24" className="text-green-600" />
              <div className="text-left">
                <p className="font-bold text-green-900 dark:text-green-400">WhatsApp</p>
                <p className="text-xs text-green-700 dark:text-green-500">Respon cepat (24 Jam)</p>
              </div>
            </div>
            <Icon icon="mdi:chevron-right" width="20" className="text-green-400 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="mailto:mentor@dimentorin.dev"
            className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Icon icon="mdi:email-outline" width="24" className="text-blue-600" />
              <div className="text-left">
                <p className="font-bold text-blue-900 dark:text-blue-400">Email</p>
                <p className="text-xs text-blue-700 dark:text-blue-500">Respon dalam 1-2 hari kerja</p>
              </div>
            </div>
            <Icon icon="mdi:chevron-right" width="20" className="text-blue-400 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://discord.gg/dimentorin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Icon icon="mdi:discord" width="24" className="text-indigo-600" />
              <div className="text-left">
                <p className="font-bold text-indigo-900 dark:text-indigo-400">Discord</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-500">Komunitas & Sesi Live</p>
              </div>
            </div>
            <Icon icon="mdi:chevron-right" width="20" className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Tutup
        </button>
      </div>
    </div>
  )
}
