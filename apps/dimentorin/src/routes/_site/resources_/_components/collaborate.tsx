import { MailOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Button } from "@imphnen-frontend-service/ui/atoms";
import { cn } from "@imphnen-frontend-service/utils";
import { FC, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

export const Collaborate: FC = () => {
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
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section ref={ref} className="w-full p-8 md:py-14 md:px-[60px] lg:pt-0 lg:pb-16 lg:px-20">
      <div className="max-w-7xl py-6 mx-auto md:flex md:gap-[60px] md:items-center xl:py-14">
        <div className="relative mb-8 flex items-center justify-center h-[124px] md:mb-0 md:h-[180px] md:w-[202px] xl:h-[380px] xl:w-[428px]">
          <motion.div 
            className="relative"
            variants={containerVariants}
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="size-[104px] bg-primary-200 rounded-full flex justify-between items-center md:size-[148px] xl:size-[304px]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div
                className="size-[88px] rounded-full bg-gradient-to-bl from-primary-500 to-primary-300 mx-auto md:size-[132px] xl:size-[276px]"
              />
            </motion.div>

            <motion.div
              className="absolute bg-white shadow rounded-md -top-3 -right-2 p-1 rotate-6 xl:p-2.5 xl:rounded-lg"
              variants={childVariants}
            >
              <Icon icon="bi:terminal" className="text-primary-500 size-4 md:size-[18px] xl:size-9" />
            </motion.div>

            <motion.div
              className="absolute bg-white shadow rounded-md top-1/3 -left-6 p-1.5 -rotate-10 xl:p-2.5 xl:-left-12"
              variants={childVariants}
            >
              <Icon icon="ion:git-branch-outline" className="text-primary-500 size-6 md:size-[30px] xl:size-14" />
            </motion.div>

            <motion.div
              className="absolute bg-white shadow rounded-md top-3/5 -right-3 p-1 xl:p-2 xl:-right-6"
              variants={childVariants}
            >
              <Icon icon="bi:github" className="size-[18px] md:size-[26px] xl:size-[52px]" />
            </motion.div>
          </motion.div>

          <motion.div
            className="h-full w-auto aspect-3/5 absolute inset-0 mx-auto bg-contain bg-no-repeat"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <img
              src="/image/anime-girl.webp"
              alt="Anime Girl"
              style={{
                opacity: "1",
                maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className={cn(
            "px-6 py-5 rounded-lg bg-white border-2 border-primary-200 text-center text-primary-500 shadow",
            "md:flex-1 md:text-start xl:py-8 xl:px-12"
          )}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-[15px] font-semibold mb-3 md:text-[23px] xl:text-[37px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Let's Collaborate!
          </motion.h1>
          <motion.p
            className="text-xs font-medium leading-tight mb-6 md:text-[15px] xl:text-[19px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Klik tombol di bawah ini untuk mendaftar sebagai partner resource dan bantu membangun dunia IT yang lebih seru!
          </motion.p>

          <motion.div
            className="flex items-center mx-auto md:ms-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button type="button" size="sm" className="flex items-center gap-2">
              <span>Collaboration Now</span>
              <MailOutlined />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
