import { cn } from '@imphnen-frontend-service/utils';
import { FC, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

export const BannerSection: FC = () => {
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
    <section ref={ref} className="w-full p-8 md:py-14 md:px-[60px] lg:py-16 lg:px-20">
      <motion.div
        className={cn(
          "relative max-w-7xl mx-auto bg-white p-6 rounded-lg overflow-hidden shadow-md",
          "md:flex md:justify-between md:items-center md:px-5 md:rounded-xl lg:px-16 lg:py-10",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="hidden absolute -left-9 -top-24 w-[17rem] md:block lg:w-[28rem] lg:-left-14 lg:-top-52"
          initial={{ x: -120, opacity: 0, rotate: -6 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img src="/image/mentoring-banner.webp" alt="" className="w-full" />
        </motion.div>
        <motion.div
          className="text-center md:text-start md:max-w-[calc(100%-14rem)] md:ms-auto lg:max-w-[calc(100%-20rem)]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          viewport={{ once: true }}
        >
          <motion.h1 className="mb-4 text-xl font-semibold text-primary-500 leading-tight md:text-2xl lg:text-5xl lg:font-bold lg:mb-6" variants={childVariants}>
            Find your perfect sensei
          </motion.h1>
          <motion.p className="text-xs font-semibold text-neutral-500 md:text-[15px] md:font-medium lg:text-xl" variants={childVariants}>
            Di sini, kamu nggak cuma grinding sendirian—sensei dari dunia nyata siap membimbingmu, dan AI mentor bakal jadi support system terbaikmu. Saatnya jadi protagonist dalam perjalanan karier IT-mu!
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}
