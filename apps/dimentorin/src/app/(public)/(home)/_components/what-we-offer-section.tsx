import { Button } from "@imphnen-frontend-service/ui/atoms";
import { For } from "@imphnen-frontend-service/utils";
import { FC, useRef } from "react";
import { motion, useInView, Variants } from 'framer-motion'

const OFFERS: { title: string; description: string; image: string }[] = [
  { title: "AI-Powered Learning", description: "Level Up Instantly!", image: "/image/what-we-offer/ai-powered-learning.webp" },
  { title: "1-on-1 Mentoring", description: "Sensei dari Dunia Nyata!", image: "/image/what-we-offer/1-on-1-mentoring.webp" },
  { title: "Community & Resources", description: "Connect dengan Fellow Devs!", image: "/image/what-we-offer/community.webp" },
]

export const WhatWeOfferSection: FC = () => {
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
    <section ref={ref} className="w-full mx-auto px-8 pb-4 md:px-[60px] lg:px-20 lg:pt-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-6 flex justify-center lg:mb-10"
      >
        <Button
          type="button"
          size="sm"
          variant="bordered"
          className="h-auto px-3 py-2 font-semibold bg-primary-100 md:text-base md:px-5 md:py-2.5 lg:text-2xl lg:px-6 lg:py-3"
        >
          Apa yang Kami Tawarkan
        </Button>
      </motion.div>

      <motion.div
        className="grid gap-6 max-w-7xl mx-auto md:grid-cols-3" 
        variants={containerVariants}
        initial="hidden" 
        animate={isInView ? "visible" : "hidden"}
      >
        <For data={OFFERS}>
          {(offer) => (
            <motion.div
              key={offer.title}
              className="relative aspect-[3/2] overflow-hidden rounded-2xl md:aspect-[3/4] lg:aspect-[5/6]"
              variants={childVariants}
            >
              <img src={offer.image} alt={offer.title} className="size-full object-cover" />
              <div
                className="absolute bottom-0 inset-x-0 p-4 h-1/2 text-primary-50 bg-gradient-to-t from-primary-500 via-primary-500/80 flex flex-col items-center justify-end gap-y-1 md:items-start lg:px-6 lg:pb-8"
              >
                <p className="font-semibold lg:text-[26px] lg:font-bold">{offer.title}</p>
                <p className="text-xs lg:text-[22px] lg:font-medium">{offer.description}</p>
              </div>
            </motion.div>
          )}
        </For>
      </motion.div>
    </section>
  )
}