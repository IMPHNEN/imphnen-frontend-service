import { createFileRoute } from '@tanstack/react-router'
import { FC, useState } from 'react'
import { ProfileSection } from './$id/_components/sections/profile'
import { StatisticsSection } from './$id/_components/sections/senpai-statistics'
import { TopicsSection } from './$id/_components/sections/topics'
import { ExperienceSection } from './$id/_components/sections/experience'
import { EducationSection } from './$id/_components/sections/education'
import { SenpaiScheduleSection } from './$id/_components/sections/senpai-schedule'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { AppointmentModal } from './$id/_components/modals/appointment'
import { useMentorById } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_site/mentoring_/$id')({
  component: MentorDetailPage,
})

function MentorDetailPage() {
  const [open, setOpen] = useState(false)
  const { id } = Route.useParams()
  const mentorId = id ?? ''
  const { data: mentor, isLoading } = useMentorById(mentorId)

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center text-neutral-400">Loading mentor profile...</div>
      </main>
    )
  }

  return (
    <main>
      <section className="w-full p-8 md:py-14 md:px-[60px] lg:py-16 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-8 md:bg-white xl:bg-transparent">
          <ProfileSection mentor={mentor} onBook={() => setOpen(true)} />

          <Button type="button" size="sm" className="w-full md:hidden" onClick={() => setOpen(true)}>
            Book Your Senpai!
          </Button>

          <div className="bg-white px-4 py-5 md:px-8 md:pb-6 md:pt-0 xl:py-7 xl:flex xl:gap-x-10">
            <div className="space-y-10 md:space-y-7 xl:flex-1">
              <StatisticsSection mentor={mentor} />
              <TopicsSection mentor={mentor} />

              {mentor?.bio && (
                <div className="px-6 py-8 rounded-md shadow-md">
                  <h2 className="text-xs text-neutral-800 font-semibold mb-5 md:text-[15px] xl:text-[19px]">Senpai Resume</h2>
                  <p className="text-[10px] font-medium text-neutral-600 text-pretty md:text-[15px]">
                    {mentor.bio}
                  </p>
                </div>
              )}

              <ExperienceSection mentor={mentor} />
              <EducationSection mentor={mentor} />
            </div>

            <div className="hidden xl:block xl:w-[400px]">
              <SenpaiScheduleSection onBook={() => setOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      <AppointmentModal open={open} setOpen={setOpen} mentorId={mentorId} />
    </main>
  )
}
