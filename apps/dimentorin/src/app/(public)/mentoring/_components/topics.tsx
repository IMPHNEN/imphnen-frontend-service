import { CloudServerOutlined, CodeOutlined, DatabaseOutlined, ProjectOutlined, TabletOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { For } from '@imphnen-frontend-service/utils'
import { FC, ReactElement, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

const TOPICS: {
  name: string
  icon: React.ReactNode
}[] = [
  { name: 'UI/UX & Design', icon: <TabletOutlined /> },
  { name: 'Software/Web Dev', icon: <CodeOutlined /> },
  { name: 'Data & AI', icon: <DatabaseOutlined /> },
  { name: 'Cloud & DevOps', icon: <CloudServerOutlined /> },
  { name: 'Cybersecurity', icon: <Icon icon="mage:security-shield" /> },
  { name: 'IT & Networking', icon: <Icon icon="carbon:data-structured" /> },
  { name: 'Project Management', icon: <ProjectOutlined /> },
  { name: 'QA & Testing', icon: <Icon icon="carbon:exam-mode" /> }
]

export const Topics: FC = (): ReactElement => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        delay: 0.4,
      },
    },
  }

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <div ref={ref}>
      <motion.div
        className="grid grid-cols-4 gap-6 px-3 md:px-12 md:gap-x-10 md:gap-y-14 lg:grid-cols-8 lg:px-0"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <For data={TOPICS}>
          {(topic) => (
            <motion.div key={topic.name} className="flex flex-col items-center" variants={childVariants}>
              <Button variant="secondary" size='sm' className="size-7 mb-3 p-0 md:mb-4 md:size-8 md:text-base lg:size-10 lg:text-lg">
                {topic.icon}
              </Button>
              <p className="text-[8px] text-neutral-700 text-center break-words md:text-xs md:font-medium lg:text-[15px]">
                {topic.name}
              </p>
            </motion.div>
          )}
        </For>
      </motion.div>
    </div>
  )
}
