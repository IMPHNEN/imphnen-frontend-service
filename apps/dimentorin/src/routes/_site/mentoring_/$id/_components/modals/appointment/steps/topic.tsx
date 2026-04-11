import { CheckOutlined } from "@ant-design/icons"
import { cn, For, Show } from "@imphnen-frontend-service/utils"
import { FC } from "react"
import { motion } from "framer-motion"
import { TOPICS } from "../../../sections/topics"

type Props = {
  selectedTopics: number[]
  setSelectedTopics: (topics: number[]) => void
}

export const TopicStep: FC<Props> = ({ selectedTopics, setSelectedTopics }) => {
  const handleSelectTopic = (topicId: number) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter((id) => id !== topicId))
    } else {
      setSelectedTopics([...selectedTopics, topicId])
    }
  }

  return (
    <>
      <motion.div
        className="mb-6 flex items-center gap-x-4 bg-white rounded-md overflow-hidden shadow/5 md:gap-x-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="w-16 aspect-4/5 overflow-hidden md:w-[134px] xl:w-[140px]">
          <img src="/image/testimonial.webp" alt="Mentor" className="w-full object-cover" />
        </div>
        <div className="flex-1 pe-4">
          <h3 className="text-xs font-semibold mb-1 line-clamp-2 md:text-[19px] md:mb-2 xl:text-[23px]">
            Muhammad Firdaus Oi Oi Oi, S.H., M.H.
          </h3>
          <p className="text-[10px] line-clamp-2 text-neutral-600 md:text-[15px] xl:text-[19px]">
            UI Designer at Oray orayan Studios
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-white p-5 rounded-md shadow/5 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <h3 className="text-xs font-semibold mb-1.5 md:text-[15px] md:mb-2 xl:text-[19px]">
          Langkah 1 dari 3
        </h3>
        <p className="text-[10px] text-neutral-600 mb-5 md:text-xs xl:text-[15px]">
          Pilih topik yang ingin kamu diskusikan dengan Senpai kamu~
        </p>

        <div className="grid gap-3 md:grid-cols-2 md:content-center">
          <For data={TOPICS}>
            {(topic) => (
              <div
                key={topic.id}
                className={cn(
                  "relative px-2.5 py-2 text-neutral-800 bg-white border border-primary-100 rounded-md shadow text-[10px] font-medium cursor-pointer",
                  "md:text-xs xl:text-xs xl:font-semibold",
                  selectedTopics.includes(topic.id) && "bg-primary-50 border-primary-200"
                )}
                onClick={() => handleSelectTopic(topic.id)}
              >
                <span>{topic.icon} </span>
                <span>{topic.name}</span>

                <Show condition={selectedTopics.includes(topic.id)}>
                  <div className="absolute top-2 right-2 bg-primary-500 size-[14px] rounded-sm flex justify-center items-center text-white">
                    <CheckOutlined />
                  </div>
                </Show>
              </div>
            )}
          </For>
        </div>
      </motion.div>
    </>
  )
}
