import { CloseOutlined } from "@ant-design/icons"
import { Button } from "@imphnen-frontend-service/ui/atoms"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback, useEffect, useState } from "react"
import { TopicStep } from "./steps/topic"
import { cn, Show } from "@imphnen-frontend-service/utils"
import { ScheduleStep } from "./steps/schedule"
import { ProfileStep } from "./steps/profile"
import { QrisPaymentStep } from "./steps/qris-payement"
import { VAPaymentStep } from "./steps/va-payment"
import { SuccessStep } from "./steps/success"
import { PaymentStep } from "./steps/payment"
import { useBookSession } from "@imphnen-frontend-service/service"
import { TOPICS } from "../../sections/topics"
import { toast } from "sonner"

const STEPS = ['topic', 'schedule', 'profile', 'payment', 'qr-payment', 'va-payment', 'success'] as const
type Step = typeof STEPS[number]

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  mentorId?: string
}

export const AppointmentModal: FC<Props> = ({ open, setOpen, mentorId }) => {
  const [step, setStep] = useState<Step>('topic')
  const [selectedTopics, setSelectedTopics] = useState<number[]>([])
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [description, setDescription] = useState('')
  const [sessionType, setSessionType] = useState('online')
  const [isBooking, setIsBooking] = useState(false)

  const bookSession = useBookSession(mentorId ?? '')

  const handleStep = async (action: 'next' | 'prev') => {
    if (action === 'next' && step === 'success') {
      setOpen(false)
    } else if (action === 'next' && step === 'payment' && mentorId) {
      const topicNames = selectedTopics
        .map((id) => TOPICS.find((t) => t.id === id)?.name)
        .filter(Boolean)
        .join(', ')

      const scheduledAt =
        scheduledDate && scheduledTime
          ? new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
          : new Date().toISOString()

      setIsBooking(true)
      try {
        await bookSession.mutateAsync({
          topic: topicNames || 'General Mentoring',
          description: description || undefined,
          scheduled_at: scheduledAt,
          session_type: sessionType,
        })
        setStep('qr-payment')
      } catch {
        toast.error('Gagal membuat sesi. Silakan coba lagi.')
      } finally {
        setIsBooking(false)
      }
    } else if (action === 'next') {
      setStep(STEPS[STEPS.indexOf(step) + 1])
    } else if (action === 'prev' && step !== 'topic') {
      setStep(STEPS[STEPS.indexOf(step) - 1])
    }
  }

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false)
    },
    [open, setOpen]
  )

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleEscapeKey)
    } else {
      document.body.style.overflow = ""
      setStep('topic')
      setSelectedTopics([])
      setScheduledDate('')
      setScheduledTime('')
      setDescription('')
      setSessionType('online')
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscapeKey)
    }
  }, [handleEscapeKey, open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, top: "50%" }}
          animate={{ opacity: 1, top: 0 }}
          exit={{ opacity: 0, top: "50%" }}
          className="fixed inset-0 z-100 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-primary-900/30" onClick={() => setOpen(false)} />

          <div
            className={cn(
              "relative bg-primary-50 px-5 py-6 w-full max-w-[280px] mx-4 rounded-lg md:max-w-[627px] md:py-10 md:px-[60px] md:rounded-xl xl:max-w-[668px]",
              step === 'success' && 'md:max-w-[400px] md:p-10 xl:max-w-[400px]',
            )}
          >
            <Show condition={step !== 'success'}>
              <Button
                type="button"
                size="sm"
                variant="text"
                className="absolute top-3 right-3 bg-primary-200 p-1 shadow md:bg-white md:p-2 md:top-8 md:right-10"
                onClick={() => setOpen(false)}
              >
                <CloseOutlined className="md:text-lg" />
              </Button>
            </Show>

            <div>
              {step !== 'success' && (
                <img
                  src="/logos/simple.svg"
                  alt="IMPHNEN Logo"
                  className="mb-6 h-8 w-auto mx-auto md:h-12 xl:h-[60px]"
                />
              )}

              <div className="scrollbar-hide max-h-[50dvh] overflow-y-auto">
                {step !== 'success' && (
                  <div className="relative mb-7 bg-primary-500 p-4 overflow-hidden rounded-md md:px-7 md:py-5 md:flex md:justify-between md:gap-x-6">
                    <p className="text-xs font-semibold text-primary-50 md:text-[19px] md:w-[290px] xl:text-[23px]">
                      <Show
                        condition={step !== 'qr-payment' && step !== 'va-payment'}
                        fallback="Yosha~! Saatnya Membayar :)"
                      >
                        Yosha~! Saatnya Level Up dengan Sesi Mentoring bersama Senpai!
                      </Show>
                    </p>

                    <img
                      src="/image/mascot-character.webp"
                      alt="IMPHNEN Mascot"
                      className="hidden w-[166px] h-auto absolute right-0 -bottom-3 md:block xl:w-[207px] xl:-bottom-5"
                    />
                  </div>
                )}

                <AnimatePresence>
                  {step === 'topic' && <TopicStep selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} />}
                  {step === 'schedule' && (
                    <ScheduleStep
                      scheduledDate={scheduledDate}
                      scheduledTime={scheduledTime}
                      description={description}
                      sessionType={sessionType}
                      onDateChange={setScheduledDate}
                      onTimeChange={setScheduledTime}
                      onDescriptionChange={setDescription}
                      onSessionTypeChange={setSessionType}
                    />
                  )}
                  {step === 'profile' && <ProfileStep />}
                  {step === 'payment' && <PaymentStep selectedTopics={selectedTopics} />}
                  {step === 'qr-payment' && <QrisPaymentStep />}
                  {step === 'va-payment' && <VAPaymentStep />}
                  {step === 'success' && <SuccessStep />}
                </AnimatePresence>
              </div>

              <Show condition={step !== 'success'}>
                <hr className="my-6 border-primary-300" />
              </Show>

              <div className="flex justify-between">
                <Button
                  type="button"
                  size="sm"
                  variant="text"
                  className={cn((step === 'topic' || step === 'success') && 'hidden')}
                  onClick={() => handleStep('prev')}
                >
                  Kembali
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  className={cn((step === 'topic' || step === 'success') && 'w-full')}
                  disabled={(selectedTopics.length === 0 && step === 'topic') || isBooking}
                  onClick={() => handleStep('next')}
                >
                  <Show
                    condition={step !== 'success'}
                    fallback="Halman Booking"
                  >
                    <Show condition={step !== 'payment'} fallback={isBooking ? 'Memproses...' : 'Bayar Sekarang'}>
                      Selanjutnya
                    </Show>
                  </Show>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
