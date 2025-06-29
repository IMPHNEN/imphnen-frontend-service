import { cn, Show } from "@imphnen-frontend-service/utils"
import { DetailedHTMLProps, FC, HTMLAttributes, useState } from "react"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"

export type AccordionOptions = {
  title: string
  description: string
}

export type AccordionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & AccordionOptions & {
  titleClassName?: string
  contentClassName?: string
}

export const Accordion: FC<AccordionProps> = ({ title, description, className, titleClassName, contentClassName, ...rest }) => {
  const [expand, setExpand] = useState(false)

  const variants: Variants = {
    expand: { opacity: 1, y: 0, marginBottom: 16, height: 'auto' },
    collapse: { opacity: 0, y: -10, marginBottom: 0, height: 0 },
  }

  return (
    <div className={cn("bg-white rounded-lg shadow cursor-pointer", className)} {...rest}>
      <div className="px-5 py-4 select-none flex justify-between items-center gap-x-2" onClick={() => setExpand(prev => !prev)}>
        <h4 className={cn("text-primary-500 font-semibold text-lg leading-tight md:text-xl", titleClassName)}>{title}</h4>
        <div className={cn("text-primary-500 transition-all duration-300", expand && "rotate-90")}>
          <Show condition={expand} fallback={<PlusOutlined />}>
            <MinusOutlined className="rotate-90" />
          </Show>
        </div>
      </div>
      <AnimatePresence>
        {expand && (
          <motion.p
            className={cn("px-5 text-neutral-500 text-sm font-medium cursor-text md:text-base", contentClassName)}
            variants={variants}
            initial="collapse"
            animate="expand"
            exit="collapse"
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
