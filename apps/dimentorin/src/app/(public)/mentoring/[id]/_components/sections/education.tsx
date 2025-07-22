import { cn, For } from "@imphnen-frontend-service/utils"

const EDUCATION = [
  { name: 'Universitas Widyabakti', major: 'Intern Front End', duration: '2 Months', range: 'Oct 2024 - Present' },
  { name: 'SMKN 99 Banjaran', major: 'Rekayasa Perangkat Lunak', duration: '6 Months', range: 'May 2024 - Oct 2024' },
]

export const EducationSection = () => {
  return (
    <div className="px-7 py-8 rounded-md shadow-md">
      <h2 className="text-xs font-semibold mb-5 md:text-[15px] xl:text-[19px]">Education</h2>
      <div className="space-y-4 divide-y">
        <For data={EDUCATION}>
          {(item, index) => (
            <div key={index} className={cn("flex items-center gap-x-4", index !== EDUCATION.length - 1 && "pb-4")}>
              <div className="rounded-full size-6 bg-neutral-200 md:size-7 xl:size-8"></div>
              <div className='flex-1 text-[10px] font-medium'>
                <p className="text-neutral-800 md:text-xs xl:text-[15px]">{item.name}</p>
                <p>
                  <span className="text-neutral-600 xl:text-xs">{item.major}</span>
                  <span className="text-neutral-300"> · </span>
                  <span className="text-neutral-400 font-normal">{item.duration}</span>
                  <span className="text-neutral-300"> · </span>
                  <span className="text-neutral-400 font-normal xl:font-medium">{item.range}</span>
                </p>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
