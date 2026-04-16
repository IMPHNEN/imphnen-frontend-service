import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { Button, Switch, Badge } from '@imphnen-frontend-service/ui/atoms'

/**
 * Mentoring setup page route.
 * Renders mentor topics and weekly mentoring session availability.
 */
export const Route = createFileRoute('/_authenticated/dashboard/mentor/mentoring-setup')({
  component: MentoringSetupPage,
})

type MentoringTopic = {
  id: string
  label: string
  icon: string
}

type SessionDay = {
  day: string
  isActive: boolean
  slots: string[]
  helperText?: string
  canAddSession?: boolean
}

const mentoringTopics: MentoringTopic[] = [
  { id: 'career', label: 'Career & Self Development', icon: 'mdi:briefcase-outline' },
  { id: 'industry', label: 'Industry Insight', icon: 'mdi:office-building-outline' },
  { id: 'pm', label: 'Project Management & IT Tools', icon: 'mdi:clipboard-text-outline' },
  { id: 'basic-it', label: 'Basic IT', icon: 'mdi:laptop' },
  { id: 'programming', label: 'Programming/Software Dev', icon: 'mdi:console' },
  { id: 'database', label: 'Data & Database', icon: 'mdi:database-outline' },
  { id: 'ai', label: 'AI Tips', icon: 'mdi:robot-outline' },
]

const sessionDays: SessionDay[] = [
  { day: 'Senin', isActive: true, slots: ['17:00', '19:00'], canAddSession: true },
  { day: 'Selasa', isActive: false, slots: [], helperText: 'Tidak ada sesi hari ini' },
  { day: 'Rabu', isActive: false, slots: [] },
  { day: 'Kamis', isActive: false, slots: [] },
  { day: "Jum'at", isActive: false, slots: [] },
  { day: 'Sabtu', isActive: false, slots: [] },
  { day: 'Minggu', isActive: false, slots: [] },
]

/**
 * Mentoring setup page.
 * @returns JSX element for mentor mentoring setup route content.
 */
export function MentoringSetupPage() {
  const [days, setDays] = useState<SessionDay[]>(sessionDays)

  const toggleDay = (dayName: string) => {
    setDays((prev) =>
      prev.map((d) => (d.day === dayName ? { ...d, isActive: !d.isActive } : d))
    )
  }

  return (
    <section className="w-243">
      <div className="rounded-sm border border-border-light bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <article className="space-y-6">
            <header className="flex items-center justify-between gap-3">
              <h1 className="text-[35px] font-semibold leading-none text-text-label">
                Topics
              </h1>
              <Button
                variant="primary"
                size="sm"
              >
                <Icon icon="mdi:plus" width="14" />
                Tambah Topik
              </Button>
            </header>

            <div className="min-h-116 rounded-sm border border-primary-100 bg-primary-50 p-6">
              <div className="flex flex-wrap gap-2">
                {mentoringTopics.map((topic) => (
                  <Badge
                    key={topic.id}
                    variant="outline"
                  >
                    <Icon
                      icon={topic.icon}
                      width="14"
                      className="text-[#6c7a89]"
                    />
                    {topic.label}
                  </Badge>
                ))}
              </div>
            </div>
          </article>

          <article className="space-y-6">
            <header className="flex items-center justify-between gap-3">
              <h2 className="text-[35px] font-semibold leading-none text-text-label">
                Mentoring Session
              </h2>
              <Button
                variant="primary"
                size="sm"
              >
                <Icon icon="mdi:plus" width="14" />
                Tambah Sesi
              </Button>
            </header>

            <div className="min-h-116 rounded-sm border border-primary-100 bg-primary-50 px-6 py-4">
              <div className="divide-y divide-primary-100/50">
                {days.map((sessionDay) => (
                  <div
                    key={sessionDay.day}
                    className="flex items-center justify-between py-5 first:pt-2 last:pb-2"
                  >
                    <div className="space-y-2">
                      <p className="text-[31px] font-semibold leading-tight text-text-label">
                        {sessionDay.day}
                      </p>

                      {sessionDay.isActive ? (
                        <div className="space-y-2">
                          {sessionDay.slots.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              {sessionDay.slots.map((slot) => (
                                <Badge
                                  key={slot}
                                  variant="outline"
                                >
                                  {slot}
                                </Badge>
                              ))}
                              <button
                                type="button"
                                className="text-xs font-medium text-primary-accent"
                              >
                                Tambah Sesi
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-text-muted">
                          {sessionDay.helperText || 'Tidak ada sesi hari ini'}
                        </p>
                      )}
                    </div>

                    <Switch
                      checked={sessionDay.isActive}
                      onCheckedChange={() => toggleDay(sessionDay.day)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
