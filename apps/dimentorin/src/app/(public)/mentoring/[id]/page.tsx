import { FC, useState } from 'react'
import { ProfileSection } from './_components/sections/profile'
import { StatisticsSection } from './_components/sections/senpai-statistics'
import { TopicsSection } from './_components/sections/topics'
import { ExperienceSection } from './_components/sections/experience'
import { EducationSection } from './_components/sections/education'
import { SenpaiScheduleSection } from './_components/sections/senpai-schedule'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { AppointmentModal } from './_components/modals/appointment'

export const Components: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <main>
      <section className="w-full p-8 md:py-14 md:px-[60px] lg:py-16 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-8 md:bg-white xl:bg-transparent">
          <ProfileSection onBook={() => setOpen(true)} />

          <Button type="button" size="sm" className="w-full md:hidden" onClick={() => setOpen(true)}>
            Book Your Senpai!
          </Button>

          <div className="bg-white px-4 py-5 md:px-8 md:pb-6 md:pt-0 xl:py-7 xl:flex xl:gap-x-10">
            <div className="space-y-10 md:space-y-7 xl:flex-1">
              <StatisticsSection />
              <TopicsSection />

              <div className="px-6 py-8 rounded-md shadow-md">
                <h2 className="text-xs text-neutral-800 font-semibold mb-5 md:text-[15px] xl:text-[19px]">Senpai Resume</h2>
                <p className="text-[10px] font-medium text-neutral-600 text-pretty md:text-[15px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.
                </p>
              </div>

              <ExperienceSection />
              <EducationSection />
            </div>

            <div className="hidden xl:block xl:w-[400px]">
              <SenpaiScheduleSection onBook={() => setOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      <AppointmentModal open={open} setOpen={setOpen} />
    </main>
  )
}

export default Components
