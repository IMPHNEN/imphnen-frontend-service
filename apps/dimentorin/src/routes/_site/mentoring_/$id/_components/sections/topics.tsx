import { For } from "@imphnen-frontend-service/utils"
import { FC } from "react"
import type { MentorDetailResponseDto } from "@imphnen-frontend-service/service"

export const TOPICS = [
  { id: 1, icon: '💼', name: 'Career & Self Development' },
  { id: 2, icon: '🏢', name: 'Industry Insight' },
  { id: 3, icon: '🗂️', name: 'Project Management & IT Tools' },
  { id: 4, icon: '🖥️', name: 'Basic IT' },
  { id: 5, icon: '💻', name: 'Programming/Software Dev' },
  { id: 6, icon: '🗃️', name: 'Data & Database' },
  { id: 7, icon: <span className="font-bold text-primary-500">AI</span>, name: 'AI Tips' }
]

type Props = {
  mentor?: MentorDetailResponseDto
}

export const TopicsSection: FC<Props> = ({ mentor }) => {
  const mentorTopics = mentor?.topics_of_interest ?? []

  return (
    <div>
      <h2 className="text-xs font-semibold mb-3 md:text-[15px] xl:text-[19px]">Topics</h2>
      <div className="p-5 bg-primary-50 border border-primary-100 rounded-md flex flex-wrap gap-2.5">
        {mentorTopics.length > 0 ? (
          <For data={mentorTopics}>
            {(topic, index) => (
              <div
                key={index}
                className="px-2.5 py-2 text-neutral-800 bg-white border border-primary-100 rounded-md shadow text-[10px] font-medium"
              >
                {topic}
              </div>
            )}
          </For>
        ) : (
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
        )}
      </div>
    </div>
  )
}
