import { Button } from "@imphnen-frontend-service/ui/atoms"
import { cn, For } from "@imphnen-frontend-service/utils"
import { FC } from "react"

const SCHEDULES = [
  {
    date: "Kamis, 20 Maret 2025",
    availableCount: 10,
    schedule: [
      { time: "19:00 WIB", available: true },
      { time: "20:00 WIB", available: true },
      { time: "21:00 WIB", available: true },
      { time: "22:00 WIB", available: true },
    ]
  },
  {
    date: "Jumat, 21 Maret 2025",
    availableCount: 1,
    schedule: [
      { time: "19:00 WIB", available: true },
      { time: "20:00 WIB", available: true },
      { time: "21:00 WIB", available: false },
      { time: "22:00 WIB", available: true },
    ]
  }
]

export const SenpaiScheduleSection: FC = () => {
  return (
    <div>
      <h2 className="text-xs font-semibold mb-3 md:text-[15px] xl:text-[19px]">Senpai Schedule</h2>
      <div className="p-4 bg-primary-50 border border-primary-100 rounded-md space-y-5">
        <For data={SCHEDULES}>
          {(item) => (
            <div key={item.date}>
              <div className="flex justify-between items-center mb-4">
                <p className="text-[15px] font-medium">{item.date}</p>
                <p
                  className={cn(
                    "rounded-4xl py-1 px-2.5 text-xs font-medium",
                    item.availableCount > 5 ? "bg-primary-200 text-primary-500" : "bg-danger-100 text-danger-600"
                  )}
                >
                  {item.availableCount} slot tersisa
                </p>
              </div>
              <div className="flex gap-x-3">
                <For data={item.schedule}>
                  {(schedule, index) => (
                    <div
                      key={index}
                      className="bg-primary-300 text-primary-600 px-3 py-2 text-xs rounded-md font-semibold"
                    >
                      {schedule.time}
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>

        <hr className="border-primary-200" />

        <Button type="button" size="sm" className="w-full">
          Book Your Senpai!
        </Button>
      </div>
    </div>
  )
}