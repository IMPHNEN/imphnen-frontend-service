'use client';

import { Button } from '@components/atoms';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';

export function Communities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const communities = [
    {
      icon: FaFacebook,
      title: 'Facebook Group',
      description:
        'Bergabung dengan 180.000+ anggota dalam diskusi harian seputar karir IT dan code review',
      buttonText: 'Join Sekarang',
      buttonLink: 'https://web.facebook.com/groups/programmerhandal',
    },
    {
      icon: FaInstagram,
      title: 'Instagram',
      description:
        'Temukan tutorial visual menarik untuk 10.000+ followers setiap minggunya',
      buttonText: 'Follow Kami',
      buttonLink: 'https://www.instagram.com/imphnen.dev',
    },
    {
      icon: FaTiktok,
      title: 'TikTok',
      description:
        'Tonton video pendek berisi tips coding untuk 10.000+ viewers harian',
      buttonText: 'Follow Sekarang',
      buttonLink: 'https://www.tiktok.com/@imphnen',
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn',
      description:
        'Bangun jaringan profesional dengan perusahaan teknologi terkemuka',
      buttonText: 'Segera Hadir',
      buttonLink: '#',
    },
  ];

  const stats = [
    { value: '180K+', label: 'Anggota Facebook' },
    { value: '10K+', label: 'Followers TikTok' },
    { value: '10K+', label: 'Followers Instagram' },
    { value: '99%', label: 'Kepuasan Anggota' },
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
      className="w-full py-20 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="container px-4 md:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl text-center mb-4">
            Komunitas{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Kami
            </span>
          </h2>
          <p className="max-w-[800px] mx-auto text-muted-foreground text-center md:text-lg">
            Bergabunglah dengan jaringan developer terbesar di Indonesia untuk
            belajar, berbagi, dan berkembang bersama.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3 lg:grid-cols-4 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {communities.map((community, index) => {
            const Icon = community.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-lg transition-shadow"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/50 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mb-2 text-xl font-bold">{community.title}</h3>
                  <p className="mb-6 text-muted-foreground">
                    {community.description}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300 hover:scale-[1.02] border-primary/10"
                    onClick={() => window.open(community.buttonLink, '_blank')}
                    disabled={community.title === 'LinkedIn'}
                  >
                    {community.buttonText}
                  </Button>
                </div>

                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-10 group-hover:-translate-x-10" />
              </motion.div>
            );
          })}
        </motion.div>

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
              className="space-y-2"
            >
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
