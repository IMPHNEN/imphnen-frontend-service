import { FC, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

export const Contribute: FC = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
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
    <section ref={ref} className="w-full p-8 md:py-14 md:px-[60px] lg:py-16 lg:px-20 xl:py-20">
      <div className="relative max-w-7xl mx-auto xl:py-14">
        <div className="md:max-w-[514px] mx-auto">
          <motion.h1
            className="font-semibold text-[19px] text-primary-500 mb-4 text-center leading-tight md:text-[37px] md:mb-6 xl:text-[46px] xl:font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Want to contribute? <br /> help senpai build the IT ecosystem!
          </motion.h1>
          <motion.p
            className="text-center text-xs text-neutral-500 md:text-[15px] md:font-medium md:w-[395px] md:mx-auto xl:text-[19px] xl:w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Punya platform, artikel, atau tool keren untuk membantu mentee belajar IT? Bergabunglah dengan kami dan jadilah bagian dari ekosistem pembelajaran yang lebih besar!
          </motion.p>
        </div>

        <motion.div
          className="hidden xl:block absolute inset-0 text-neutral-800"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            className="absolute top-0 left-0 text-[23px] font-semibold bg-white border rounded-md px-5 py-2 shadow-lg -rotate-6"
            variants={childVariants}
          >
            Learning Platform
          </motion.div>
          <motion.div
            className="absolute top-0 right-36 text-2xl font-semibold bg-white border rounded-md px-5 py-2 shadow-lg rotate-3"
            variants={childVariants}
          >
            AI Tools
          </motion.div>

          <motion.div
            className="absolute top-1/3 left-24 text-[23px] font-semibold bg-white border rounded-md px-5 py-2 shadow-lg"
            variants={childVariants}
          >
            UI Assets
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-0 text-[27.38px] font-semibold bg-white border rounded-md px-6 py-2 shadow-lg -rotate-3"
            variants={childVariants}
          >
            Refferences
          </motion.div>

          <motion.div
            className="absolute top-2/3 left-4 text-[31.62px] font-semibold bg-white border rounded-md px-6 py-2.5 shadow-lg leading-tight rotate-1"
            variants={childVariants}
          >
            Coding <br />Playground
          </motion.div>
          <motion.div
            className="absolute top-[70%] right-16 text-2xl font-semibold bg-white border rounded-md px-5 py-2.5 shadow-lg leading-tight rotate-6"
            variants={childVariants}
          >
            Challenge <br />Platform
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
