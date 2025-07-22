import { For } from "@imphnen-frontend-service/utils"
import { FC } from "react"

const TOPICS = [
  { icon: '💼', name: 'Career & Self Development' },
  { icon: '🏢', name: 'Industry Insight' },
  { icon: '🗂️', name: 'Project Management & IT Tools' },
  { icon: '🖥️', name: 'Basic IT' },
  { icon: '💻', name: 'Programming/Software Dev' },
  { icon: '🗃️', name: 'Data & Database' },
  { icon: <span className="font-bold text-primary-500">AI</span>, name: 'AI Tips' }
]

export const TopicsSection: FC = () => {
  return (
    <div>
      <h2 className="text-xs font-semibold mb-3 md:text-[15px] xl:text-[19px]">Topics</h2>
      <div className="p-5 bg-primary-50 border border-primary-100 rounded-md flex flex-wrap gap-2.5">
        <For data={TOPICS}>
          {(item, index) => (
            <div
              key={index}
              className="px-2.5 py-2 text-neutral-800 bg-white border border-primary-100 rounded-md shadow text-[10px] font-medium"
            >
              <span>{item.icon} </span>
              <span>{item.name}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
