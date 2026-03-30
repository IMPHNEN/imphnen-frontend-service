import { DiscordOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons';
import { cn, For } from '@imphnen-frontend-service/utils';
import React, { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, Variants } from 'framer-motion';
import { SteamIcon } from '../../_components/icons';

const PAGES: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: 'Mentoring', href: '/mentoring' },
  { label: 'Resources', href: '/resources' },
  { label: 'Articles', href: '/articles' },
]

const COMMUNITY: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: 'Discord', href: 'https://discord.gg/imphnen', icon: <DiscordOutlined /> },
  { label: 'Steam', href: 'https://steamcommunity.com/groups/IMPHNEN', icon: <SteamIcon /> },
  { label: 'Github', href: 'https://github.com/IMPHNEN', icon: <GithubOutlined /> },
  { label: 'Instagram', href: 'https://www.instagram.com/imphnen.dev', icon: <InstagramOutlined /> },
]

export const Footer: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const childVariants: Variants = {
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

  const mascotVariants: Variants = {
    hidden: { opacity: 0, y: 20, rotate: -12 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const mascotTextVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <footer ref={ref} className="w-full mx-auto px-8 py-4 md:px-[60px] md:pt-8 md:pb-16 lg:px-20 lg:pb-20">
      <motion.div
        className={cn(
          "relative max-w-7xl mx-auto px-10 py-8 bg-primary-500 text-primary-50 grid gap-10 rounded-lg",
          "lg:grid-cols-3 lg:rounded-xl"
        )}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >

        <motion.div
          className="hidden absolute bottom-0 right-0 size-40 md:block lg:size-72"
          variants={mascotVariants}
        >
          <motion.img
            src="/image/mascot-character.webp"
            alt="IMPHNEN Mascot"
            className="w-full h-auto absolute inset-x-0 bottom-0"
          />
          <motion.img
            src="/image/mascot-text.webp"
            alt="IMPHNEN Mascot"
            className="w-4/6 absolute top-0 left-0"
            variants={mascotTextVariants}
          />
        </motion.div>

        <div className="relative">
          <div className="text-center lg:text-start lg:mb-16">
            <motion.img
              src="/logos/logo.svg"
              alt="IMPHNEN Logo"
              className="w-[84px] mb-6 mx-auto md:w-32 lg:w-40 lg:ms-0"
              variants={childVariants}
            />

            <motion.h4 className="mb-2 font-semibold text-[15px] md:mb-2.5 md:text-xl" variants={childVariants}>
              Dimentorin by IMPHNEN
            </motion.h4>
            <motion.p className="font-medium text-xs md:text-[15px] md:max-w-[232px] md:mx-auto lg:ms-0" variants={childVariants}>
              Karena Belajar IT Itu Harusnya Se-Seru Anime Favoritmu!
            </motion.p>
          </div>

          <motion.p className="relative hidden text-xs font-medium text-[15px] lg:block" variants={childVariants}>
            &copy; IMPHNEN {new Date().getFullYear()} All Rights Reserved
          </motion.p>
        </div>

        <motion.div className="relative grid gap-10 md:flex md:justify-center lg:gap-x-20" variants={childVariants}>
          <div className="text-center text-xs md:text-[15px] lg:text-start">
            <h4 className="mb-5 font-medium md:mb-7 lg:text-xl">Pages</h4>
            <ul className="font-semibold space-y-5">
              <For data={PAGES}>
                {({ label, href }) => (
                  <li key={label}>
                    <Link to={href}>{label}</Link>
                  </li>
                )}
              </For>
            </ul>
          </div>

          <div className="text-center text-xs md:text-[15px] lg:text-start">
            <h4 className="mb-5 font-medium md:mb-7 lg:text-xl">Join Our Community</h4>
            <ul className="font-semibold space-y-5">
              <For data={COMMUNITY}>
                {({ label, href, icon }) => (
                  <li key={label}>
                    <Link to={href} target="_blank" className="flex items-center justify-center gap-x-3 lg:justify-start">
                      <span className="text-primary-900">{icon}</span>
                      <span>{label}</span>
                    </Link>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </motion.div>

        <motion.p className="relative text-center text-xs font-medium md:text-[15px] lg:hidden" variants={childVariants}>
          &copy; IMPHNEN {new Date().getFullYear()} All Rights Reserved
        </motion.p>
      </motion.div>
    </footer>
  )
}
