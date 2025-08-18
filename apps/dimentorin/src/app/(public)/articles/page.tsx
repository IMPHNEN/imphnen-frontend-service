import { ReactElement, useRef, useState } from "react";
import { ArticleCard } from "./_components/card/article";
import { cn, For } from "@imphnen-frontend-service/utils";
import { Button } from "@imphnen-frontend-service/ui/atoms";
import { motion, useInView, Variants } from "framer-motion";

const CATEGORIES = ['UI/UX Design', 'Software/Web Dev', 'Data & AI', 'Cloud & DevOps', 'Cybersecurity', 'IT & Network', 'Project Management', 'QA & Testing'] as const
type Category = typeof CATEGORIES[number]

export default function Components(): ReactElement {
  const [activeTab, setActiveTab] = useState<Category>('UI/UX Design')

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <main ref={ref}>
      <motion.section
        className="w-full p-8 md:py-14 md:px-[60px] lg:py-16 lg:px-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto mb-8 md:mb-20">
          <motion.h1
            className="text-[23px] font-semibold text-neutral-800 mb-9 md:text-[29px] xl:text-[46px] xl:font-bold"
            variants={childVariants}
          >
            Featuring Articles
          </motion.h1>

          <div className="grid gap-12 xl:grid-cols-2">
            <motion.div variants={childVariants}>
              <ArticleCard variant="featured" />
            </motion.div>

            <div>
              <motion.h1
                className="text-[19px] text-neutral-800 font-semibold mb-10 md:text-[29px] xl:text-[37px] xl:mb-12"
                variants={childVariants}
              >
                Recent Articles
              </motion.h1>
              <div className="grid gap-10">
                <For data={Array.from({ length: 3 })}>
                  {(_, index) => (
                    <motion.div key={index} variants={childVariants}>
                      <ArticleCard variant="recent" />
                    </motion.div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-[19px] text-neutral-800 font-semibold mb-4 md:text-[23px] xl:text-[29px]"
            variants={childVariants}
          >
            Category
          </motion.h1>
          <div className="scrollbar-hide mb-8 w-full overflow-auto mx-auto">
            <motion.div className="min-w-max w-auto flex gap-x-3" variants={childVariants}>
              <For data={CATEGORIES}>
                {(category) => (
                  <Button
                    key={category}
                    type="button"
                    variant="text"
                    onClick={() => setActiveTab(category)}
                    className={cn(
                      "relative text-[10px] text-neutral-400 font-medium px-3 py-2 rounded-4xl md:text-xs md:font-semibold xl:text-[15px]",
                      "before:w-0 before:absolute before:h-0.5 before:mx-auto before:inset-x-0 before:bg-primary-500 hover:before:w-full before:bottom-0 before:left-0 before:transition-all before:duration-300",
                      activeTab === category && "text-primary-500 before:w-full"
                    )}
                  >
                    {category}
                  </Button>
                )}
              </For>
            </motion.div>
          </div>

          <div className="grid gap-8 xl:grid-cols-3">
            <For data={Array.from({ length: 3 })}>
              {(_, index) => (
                <motion.div key={index} variants={childVariants}>
                  <ArticleCard />
                </motion.div>
              )}
            </For>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
