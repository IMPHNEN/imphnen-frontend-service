import { FC, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

export const WorkWithUs: FC = () => {
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
    <section ref={ref} className="w-full px-8 md:px-[60px] lg:py-16 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-[19px] font-semibold text-primary-500 mb-5 text-center md:text-[23px] md:mb-7 xl:text-[37px] xl:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Work with Us
        </motion.h1>

        <motion.div
          className="grid gap-4 md:grid-cols-3 md:gap-5 xl:grid-flow-col xl:grid-cols-2 xl:grid-rows-2 xl:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            className="px-5 py-6 bg-white rounded-lg shadow md:px-0 md:py-8 xl:row-span-2 xl:px-6 xl:flex xl:flex-col xl:justify-end"
            variants={childVariants}
          >
            <div className="h-[60px] w-full mb-6 xl:h-auto xl:w-full xl:mb-8">
              <img src="/image/work-with-us/exposure.webp" alt="Exposure" className="h-full w-auto object-scale-down mx-auto" />
            </div>
            <div className="text-center md:px-6 xl:text-start xl:px-0">
              <h1 className="text-primary-500 text-[15px] mb-2 font-semibold leading-tight md:text-[19px] md:px-4 xl:px-0">
                Exposure Luas
              </h1>
              <p className="text-[10px] text-neutral-500 leading-tight md:text-[15px] md:px-1 xl:px-0">
                Web kamu akan tampil di halaman resource kami!
              </p>
            </div>
          </motion.div>

          <motion.div
            className="px-5 py-6 bg-white rounded-lg shadow md:px-0 md:py-8 xl:flex xl:items-center xl:px-6 xl:py-2 xl:gap-8"
            variants={childVariants}
          >
            <div className="h-[60px] w-full mb-6 xl:w-auto xl:h-[124px] xl:mb-0">
              <img src="/image/work-with-us/handshake.webp" alt="Handshake" className="h-full w-auto object-scale-down mx-auto" />
            </div>
            <div className="text-center md:px-6 xl:text-start">
              <h1 className="text-primary-500 text-[15px] mb-2 font-semibold leading-tight md:text-[19px]">
                Bantu Generasi Baru
              </h1>
              <p className="text-[10px] text-neutral-500 leading-tight md:text-[15px]">
                Bagikan ilmu dan bantu lebih banyak orang berkembang!
              </p>
            </div>
          </motion.div>

          <motion.div
            className="px-5 py-6 bg-white rounded-lg shadow md:px-0 xl:flex xl:items-center xl:px-6 xl:py-2 xl:gap-8"
            variants={childVariants}
          >
            <div className="h-[60px] w-full mb-6 xl:w-auto xl:h-[124px] xl:mb-0">
              <img src="/image/work-with-us/networking.webp" alt="Networking" className="h-full w-auto object-scale-down mx-auto" />
            </div>
            <div className="text-center md:px-6 xl:text-start">
              <h1 className="text-primary-500 text-[15px] mb-2 font-semibold leading-tight md:text-[19px] md:px-4 xl:px-0">
                Networking Komunitas
              </h1>
              <p className="text-[10px] text-neutral-500 leading-tight md:text-[15px] md:px-1 xl:px-0">
                Bertemu dengan para developer, mentor, dan inovator lainnya!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
