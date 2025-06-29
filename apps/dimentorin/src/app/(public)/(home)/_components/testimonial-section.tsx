import { Button } from '@imphnen-frontend-service/ui/atoms'
import { For } from '@imphnen-frontend-service/utils'
import { FC, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { StarFilled } from '@ant-design/icons'

export const TestimonialSection: FC = () => {
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
    <section ref={ref} className="mx-auto py-4 md:py-8 xl:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <Button
          type="button"
          size="sm"
          variant="bordered"
          className="h-auto px-3 py-2 font-semibold bg-primary-100 md:text-base md:px-5 md:py-2.5 lg:text-2xl lg:px-6 lg:py-3"
        >
          Testimonial
        </Button>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="my-6 text-lg font-semibold mx-auto text-center text-primary-500 md:text-2xl lg:my-10 lg:text-4xl"
      >
        Words from our dellow devs
      </motion.h1>

      <div className="scrollbar-hide w-full mx-auto max-w-7xl px-8 overflow-auto md:px-[60px] xl:px-0">
        <motion.div
          className="mb-2 flex gap-x-5 min-w-max w-auto md:gap-x-6 xl:min-w-full xl:max-w-7xl xl:grid xl:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <For data={Array.from({ length: 2 })}>
            {(_, index) => (
              <motion.div
                key={index}
                variants={childVariants}
                className="flex flex-col gap-6 p-6 w-52 bg-white rounded-2xl shadow-md md:w-xl md:flex-row md:gap-8 xl:w-full"
              >
                <div className="w-full aspect-[8/7] rounded-lg overflow-hidden md:w-40 md:aspect-[7/6] lg:aspect-square">
                  <img
                    src="/image/testimonial.webp"
                    alt="Testimonial"
                    className="w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 font-semibold text-primary-500 md:text-lg lg:text-2xl">
                    Riko, Junior Web Developer
                  </h3>
                  <p className="mb-6 text-[10px] text-neutral-500 font-medium md:text-sm lg:text-base">
                    Rasanya seperti punya AI waifu yang ngajarin ngoding! Mentoringnya juga super insightful. Thanks, Dimentorin!
                  </p>
                  <motion.div className="w-max" whileHover={{ scale: 1.1, rotate: -3 }}>
                    <Button
                      type="button"
                      size="sm"
                      variant="bordered"
                      className="bg-primary-50 flex items-center gap-x-2 h-auto px-2 py-1 hover:bg-primary-50"
                    >
                      <StarFilled className="md:text-lg" />
                      <span>
                        <span className="text-sm font-medium md:text-lg md:font-semibold lg:text-xl">4.8</span>
                        <span className="text-[10px] text-primary-300 md:text-sm md:font-medium lg:text-base">/5.0</span>
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </For>
        </motion.div>
      </div>
    </section>
  )
}
