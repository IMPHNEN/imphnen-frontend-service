import { StarFilled } from "@ant-design/icons"
import { Button } from "@imphnen-frontend-service/ui/atoms"
import { cn, For } from "@imphnen-frontend-service/utils"

type Props = {
  onBook: () => void
}

export const ProfileSection: React.FC<Props> = ({ onBook }) => {
  return (
    <div className="bg-white px-4 py-5 space-y-6 md:px-8 md:pt-6 md:pb-0 xl:space-y-0 xl:py-[30px] xl:flex xl:gap-x-9 xl:justify-between">
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          "md:flex-row md:justify-start md:gap-x-8 md:items-start",
          "xl:items-center xl:gap-x-10",
        )}
      >
        <div
          className={cn(
            "mb-5 h-20 w-auto aspect-4/5 rounded-sm overflow-hidden",
            "md:aspect-33/40 md:h-40 md:rounded-md md:border md:border-primary-50 md:mb-0",
            "xl:aspect-5/6 md:h-60 md:rounded-lg"
          )}
        >
          <img src="/image/testimonial.webp" alt="Mentor" className="w-full object-cover" />
        </div>

        <div className="md:max-w-[242px] xl:max-w-[306px]">
          <h1
            className={cn(
              "mb-1 text-[15px] font-semibold text-center leading-snug",
              "md:text-[19px] md:mb-2 md:text-start xl:text-[23px]",
            )}
          >
            Muhammad Firdaus Oi Oi Oi, S.H., M.H.
          </h1>
          <p className="text-xs mb-4 text-neutral-600 md:mb-5 md:text-[15px] xl:text-[19px] xl:mb-5">
            UI Designer at Oray orayan Studios
          </p>
          <div className="flex items-center gap-x-2.5 w-full max-w-max border border-primary-50 p-1.5 rounded-md mx-auto md:ms-0">
            <div
              className="bg-gradient-to-tr from-primary-500 to-primary-200 rounded-sm text-white size-5 flex justify-center items-center xl:size-[29.4px]"
            >
              <StarFilled className="text-xs xl:text-sm" />
            </div>
            <div>
              <p className="text-[10px] font-medium mb-1 text-neutral-800 xl:text-xs">Excelent Sensei</p>
              <p className="text-[8px] text-neutral-600 xl:text-[10px]">4.8/5.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-3 xl:gap-y-4 xl:max-w-[402px]">
        <div>
          <h2 className="text-xs font-semibold mb-3 md:text-[15px] xl:text-[19px]">Expertise</h2>
          <div className="p-4 bg-primary-50 border border-primary-100 rounded-md flex flex-wrap gap-3">
            <For data={['UI Design', 'UX Reseacrh']}>
              {(item) => (
                <div key={item} className="bg-primary-300 text-primary-600 px-3 py-2 rounded-md text-[10px] md:font-medium xl:text-xs xl:font-semibold">
                  {item}
                </div>
              )}
            </For>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold mb-3 md:text-[15px] xl:text-[19px]">Soft Skills</h2>
          <div className="p-4 bg-primary-50 border border-primary-100 rounded-md flex flex-wrap gap-3">
            <For data={['Design Thinking', 'Communication', 'Problem Solving', '19:00 WIB']}>
              {(item) => (
                <div key={item} className="bg-primary-300 text-primary-600 px-3 py-2 rounded-md text-[10px] md:font-medium xl:text-xs xl:font-semibold">
                  {item}
                </div>
              )}
            </For>
          </div>
        </div>
      </div>

      <div className="hidden md:flex xl:hidden justify-between">
        <div>
          <p className="text-primary-500 text-[15px] font-semibold">Jum, 4 April 2025</p>
          <p className="text-neutral-500 text-xs font-medium">Jum, 4 April 2025</p>
        </div>
        <Button type="button" size="sm" onClick={onBook}>
          Book Your Senpai!
        </Button>
      </div>
    </div>
  )
}
