import { Button } from '@imphnen-frontend-service/ui/atoms';
import { cn } from '@imphnen-frontend-service/utils';
import { FC, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

export const CTASection: FC = () => {
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

  const scaleVariant: Variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const contentVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section ref={ref} className="w-full mx-auto px-8 py-4 md:px-[60px] md:py-8 lg:px-20">
      <motion.div
        className="relative max-w-7xl mx-auto bg-white rounded-lg border-2 border-primary-200 py-20 overflow-hidden md:rounded-3xl lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Background gradients and shapes */}
        <div className="absolute inset-0">
          <motion.div
            className={cn("absolute top-8 -left-14 size-28 bg-gradient-to-tl from-primary-400 to-primary-300 rounded-full",
              "md:size-52 md:-top-20 md:-left-10 lg:size-72 lg:-top-16 lg:-left-14"
            )}
            variants={scaleVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <motion.div
            className={cn(
              "absolute top-24 -right-14 size-[89px] bg-gradient-to-b from-primary-400 to-primary-300 rounded-full blur-[1.8px]",
              "md:size-[182px] md:-right-24 md:blur-[2px] lg:size-[392px] lg:top-16 lg:-right-52 lg:blur-[4px]"
            )}
            variants={scaleVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <motion.div
            variants={scaleVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn(
              "absolute bottom-10 -left-[88px] size-28 bg-primary-200 rounded-full flex justify-center items-center",
              "md:size-56 md:-bottom-28 md:-left-28 lg:size-[274px] lg:-bottom-24 lg:-left-24"
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isInView ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="size-[72px] bg-primary-50 rounded-full md:size-40 lg:size-[200px]"
            />
          </motion.div>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-primary-400 via-primary-200 opacity-90",
              "md:h-[22%] md:opacity-85 lg:h-1/4"
            )}
          />
        </div>

        <motion.img
          src="/logos/logo.svg"
          alt="IMPHNEN Logo"
          className="relative w-28 mx-auto mb-8 md:w-[186px]"
          variants={contentVariant}
        />

        <div className="relative mb-8 max-w-52 mx-auto md:max-w-[446px] lg:max-w-[688px]">
          <motion.h1
            className={cn(
              "mb-3 text-xl text-center font-semibold leading-tight text-primary-500",
              "md:text-4xl md:mb-2 lg:text-5xl lg:font-bold"
            )}
            variants={contentVariant}
          >
            Start Your IT Journey Now!
          </motion.h1>
          <motion.p
            className={cn(
              "mb-6 text-[15px] font-medium text-center leading-tight text-primary-400",
              "md:text-2xl md:mb-8 lg:text-[29px]"
            )}
            variants={contentVariant}
          >
            Jangan biarkan progress mu hanya jadi side story!
          </motion.p>
          <motion.p
            className={cn(
              "text-xs font-semibold text-center leading-tight text-primary-400",
              "md:text-[19px] lg:text-[23px] lg:max-w-[628px] lg:mx-auto"
            )}
            variants={contentVariant}
          >
            Dapatkan mentor terbaik dan gunakan AI untuk belajar lebih cepat. Waktunya jadi protagonist dalam perjalanan IT-mu!
          </motion.p>
        </div>

        <motion.div
          className="relative max-w-52 mx-auto space-y-3 md:max-w-full md:flex md:gap-x-6 md:justify-center md:space-y-0 md:items-center"
          variants={contentVariant}
        >
          <Button
            type="button"
            className="w-full h-auto py-2 text-[10px] font-medium md:w-max md:text-sm md:px-2.5 md:font-semibold lg:text-base"
          >
            Mulai Belajar Dengan AI
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full h-auto py-2 text-[10px] font-medium md:w-max md:text-sm md:px-2.5 md:font-semibold lg:text-base"
          >
            Temukan Mentor
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
