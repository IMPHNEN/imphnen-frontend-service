import { cn, For } from "@imphnen-frontend-service/utils"
import { FC } from "react"
import type { MentorDetailResponseDto } from "@imphnen-frontend-service/service"

type Props = {
  mentor?: MentorDetailResponseDto
}

export const EducationSection: FC<Props> = ({ mentor }) => {
  const education = mentor?.education ?? []

  if (education.length === 0) return null

  return (
    <div className="px-7 py-8 rounded-md shadow-md">
      <h2 className="text-xs font-semibold mb-5 md:text-[15px] xl:text-[19px]">Education</h2>
      <div className="space-y-4 divide-y">
        <For data={education}>
          {(item, index) => (
            <div key={item.id ?? index} className={cn("flex items-center gap-x-4", index !== education.length - 1 && "pb-4")}>
              <div className="rounded-full size-6 bg-neutral-200 md:size-7 xl:size-8"></div>
              <div className='flex-1 text-[10px] font-medium'>
                <p className="text-neutral-800 md:text-xs xl:text-[15px]">{item.institution}</p>
                <p>
                  <span className="text-neutral-600 xl:text-xs">{item.degree} - {item.field}</span>
                  <span className="text-neutral-300"> · </span>
                  <span className="text-neutral-400 font-normal xl:font-medium">{item.period}</span>
                </p>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
