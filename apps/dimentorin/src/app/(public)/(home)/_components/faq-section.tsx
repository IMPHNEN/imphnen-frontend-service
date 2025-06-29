import { Button } from '@imphnen-frontend-service/ui/atoms'
import { Accordion, AccordionOptions } from '@imphnen-frontend-service/ui/molecules'
import { FC, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { cn, For } from '@imphnen-frontend-service/utils'

const FAQ_DATA: AccordionOptions[] = [
  { title: 'Apakah saya bisa memilih mentor sendiri?', description: 'Tentu! Kamu bisa memilih mentor yang sesuai dengan kebutuhan dan level skill kamu.' },
  { title: 'Apakah mentoring ini cocok untuk pemula?', description: 'Yap! Baik newbie maupun seasoned dev bisa menemukan mentor yang pas untuk mempercepat progres belajarnya.' },
  { title: 'Apakah ini seperti sekolah coding biasa?', description: 'Nope! Ini lebih dari sekadar kursus-kursus AI guide dan mentor berpengalaman, kamu mendapatkan pengalaman belajar yang jauh lebih personal dan efektif.' },
]

export const FAQSection: FC = () => {
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
    <section ref={ref} className="relative mx-auto py-4 px-8 overflow-x-clip md:py-8 md:px-[60px] lg:px-20 md:pb-8">
      {/* Background shapes */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "absolute -top-10 -right-14 size-60 bg-primary-200 rounded-full justify-center items-center hidden",
            "md:flex lg:size-[344px] lg:top-48 lg:-right-[88px]"
          )}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="size-[168px] bg-primary-50 rounded-full lg:size-64"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative mb-6 flex justify-center md:mb-10"
      >
        <Button
          type="button"
          size="sm"
          variant="bordered"
          className="h-auto px-3 py-2 font-semibold bg-primary-100 md:text-base md:px-5 md:py-2.5 lg:text-2xl lg:px-6 lg:py-3"
        >
          Frequently Ask Question
        </Button>
      </motion.div>

      <div
        className={cn(
          "relative grid max-w-7xl mx-auto gap-y-7 divide-y-2 divide-primary-200",
          "md:grid-cols-11 md:gap-x-10 md:divide-y-0 md:divide-x-2 lg:grid-cols-7 lg:gap-x-[72px]"
        )}
      >
        <motion.h1
          className={cn(
            "pb-7 text-2xl font-semibold text-primary-500 text-center leading-none",
            "md:pe-10 md:pb-0 md:text-start md:col-span-5 lg:text-4xl lg:col-span-3 lg:pe-[72px]"
          )}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Console log for new developers
        </motion.h1>

        <motion.div
          className="flex flex-col gap-4 md:col-span-6 lg:col-span-4"
          variants={containerVariants}
          animate={isInView ? "visible" : "hidden"}
        >
          <For data={FAQ_DATA}>
            {(props) => (
              <motion.div key={props.title} variants={childVariants}>
                <Accordion {...props} />
              </motion.div>
            )}
          </For>
        </motion.div>
      </div>
    </section>
  )
}
