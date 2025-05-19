'use client';

import { Button } from '@components/atoms';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from 'react-icons/fa';

export function Communities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const communities = [
    {
      icon: FaFacebook,
      title: 'Facebook Group',
      description:
        'Komunitas aktif dengan 180K+ anggota berdiskusi seputar programming dan sharing meme',
      buttonText: 'Gabung Sekarang',
      buttonLink: 'https://facebook.com/groups/programmerhandal',
    },
    {
      icon: FaDiscord,
      title: 'Discord Server',
      description:
        'Diskusi real-time dengan  developer berbagai level, mulai dari pemula sampai expert!',
      buttonText: 'Join Server',
      buttonLink: 'https://discord.com/invite/imphnen',
    },
    {
      icon: FaInstagram,
      title: 'Instagram',
      description:
        'Temukan visual tutorial coding & tech trends terkini setiap harinya',
      buttonText: 'Follow Kami',
      buttonLink: 'https://www.instagram.com/imphnen.dev',
    },
    {
      icon: FaTiktok,
      title: 'TikTok',
      description:
        'Tips coding singkat & trik development praktis dalam 60 detik',
      buttonText: 'Follow Sekarang',
      buttonLink: 'https://www.tiktok.com/@imphnen',
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn',
      description:
        'Bangun jaringan profesional dengan perusahaan teknologi ternama & recruiter IT',
      buttonText: 'Segera Hadir',
      buttonLink: '#',
    },
  ];

  const stats = [
    { value: '180K+', label: 'Komunitas Aktif' },
    { value: '25K+', label: 'Postingan/Bulan' },
    { value: '95%', label: 'Respon Cepat' },
    { value: '10K+', label: 'Problem Solved' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.5,
        duration: 0.6,
      },
    }),
  };

  return (
    <section
      id="community"
      className="w-full py-20 md:py-32 relative overflow-hidden container"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="w-full px-4 md:px-6 lg:px-0" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold tracking-tighter md:text-5xl/tight lg:text-6xl text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Komunitas Programmer
            </span>{' '}
            <br className="hidden md:block" />
            Terbesar di Indonesia
          </h2>
          <p className="max-w-4xl mx-auto text-muted-foreground text-center md:text-xl text-balance">
            Bergabung dengan jaringan developer profesional untuk berkolaborasi,
            belajar, dan berkembang bersama komunitas yang aktif dan suportif
          </p>
        </motion.div>

        {/* First Row - Facebook & Discord */}
        <motion.div
          className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {communities.slice(0, 2).map((community, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border bg-background p-8 hover:shadow-xl transition-shadow h-full"
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <community.icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="mb-4 text-2xl font-bold">{community.title}</h3>
                <p className="mb-8 text-muted-foreground text-lg">
                  {community.description}
                </p>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300 hover:scale-[1.02] border-primary/10 text-base h-12"
                  onClick={() => window.open(community.buttonLink, '_blank')}
                >
                  {community.buttonText}
                </Button>
              </div>

              <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-20 group-hover:-translate-x-20" />
            </motion.div>
          ))}
        </motion.div>

        {/* Second Row - Instagram, TikTok, LinkedIn */}
        <motion.div
          className="grid gap-4 grid-cols-1 md:grid-cols-3 w-full mt-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {communities.slice(2).map((community, index) => (
            <motion.div
              key={index + 2}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-xl transition-shadow h-full"
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary/50 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <community.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mb-3 text-xl font-bold">{community.title}</h3>
                <p className="mb-6 text-muted-foreground">
                  {community.description}
                </p>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300 hover:scale-[1.02] border-primary/10 h-11"
                  onClick={() => window.open(community.buttonLink, '_blank')}
                  disabled={community.title === 'LinkedIn'}
                >
                  {community.buttonText}
                </Button>
              </div>

              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-10 group-hover:-translate-x-10" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              custom={index}
              className="space-y-3 p-6 rounded-xl bg-background border"
            >
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
