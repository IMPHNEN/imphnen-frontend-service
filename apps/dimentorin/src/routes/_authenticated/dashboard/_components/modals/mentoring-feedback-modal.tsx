import { FC, useState } from 'react'
import { Icon } from '@iconify/react'

interface MentoringFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  mentorName: string
}

export const MentoringFeedbackModal: FC<MentoringFeedbackModalProps> = ({ isOpen, onClose, mentorName }) => {
  const [step, setStep] = useState(1)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  if (!isOpen) return null

  const handleNext = () => setStep(2)
  const handleBack = () => setStep(1)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[440px] overflow-hidden flex flex-col relative p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#888888] hover:text-[#454545] cursor-pointer z-10"
        >
          <Icon icon="mdi:close" width="24" />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-[23px] font-bold text-[#23A1EB] mb-2">Beri Feedback</h2>
          <p className="text-[15px] font-medium text-[#888888] mb-8">
            Bagaimana sesi mentoring kamu bersama {mentorName}?
          </p>

          {step === 1 ? (
            <div className="w-full">
              <div className="flex justify-center gap-2 mb-10">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onMouseEnter={() => setHoveredRating(s)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(s)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <Icon
                      icon={s <= (hoveredRating || rating) ? 'mdi:star' : 'mdi:star-outline'}
                      width="48"
                      className={s <= (hoveredRating || rating) ? 'text-[#FFB810]' : 'text-[#D1D1D1]'}
                    />
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 h-[43px] rounded-lg border border-[#D1D1D1] text-[#6D6D6D] font-bold text-[15px] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleNext}
                  disabled={rating === 0}
                  className="flex-1 h-[43px] rounded-lg bg-[#23A1EB] text-white font-bold text-[15px] hover:bg-[#1e88c7] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Lanjut
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <textarea
                placeholder="Tulis pesan untuk mentor kamu..."
                className="w-full h-[160px] p-5 border border-[#D1D1D1] rounded-lg mb-8 resize-none outline-none focus:border-[#23A1EB] text-[15px] text-[#454545] placeholder:text-[#BBBBBB] font-medium"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 h-[43px] rounded-lg border border-[#D1D1D1] text-[#6D6D6D] font-bold text-[15px] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 h-[43px] rounded-lg bg-[#23A1EB] text-white font-bold text-[15px] hover:bg-[#1e88c7] transition-colors cursor-pointer"
                >
                  Kirim
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
