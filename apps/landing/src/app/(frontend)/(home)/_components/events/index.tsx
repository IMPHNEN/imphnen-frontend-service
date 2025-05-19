'use client';

import { Button } from '@components/atoms';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const events = [
    {
      image: '/images/event-1.jpg',
      title: 'Tech Summit 2024',
      description:
        'Konferensi teknologi terbesar tahun ini dengan pembicara expert dari perusahaan unicorn',
      type: 'offline',
      price: 'berbayar',
      link: '#',
    },
    {
      image: '/images/event-2.jpg',
      title: 'Web Development Bootcamp',
      description:
        'Pelatihan intensif full-stack development selama 2 minggu secara online',
      type: 'online',
      price: 'gratis',
      link: '#',
    },
    {
      image: '/images/event-3.jpg',
      title: 'UI/UX Workshop',
      description:
        'Workshop praktis membuat prototype aplikasi dengan Figma dan Framer',
      type: 'hybrid',
      price: 'berbayar',
      link: '#',
    },
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

  return (
    <section
      id="events"
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tighter md:text-5xl/tight lg:text-6xl mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Event Terbaru
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-center md:text-xl text-balance">
            Lihat dan ikuti event terbaru dari IMPHNEN
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border bg-background hover:shadow-xl transition-shadow h-full"
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="h-48 bg-muted/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.type === 'online'
                          ? 'bg-green-500/10 text-green-500'
                          : event.type === 'offline'
                          ? 'bg-purple-500/10 text-purple-500'
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}
                    >
                      {event.type === 'hybrid'
                        ? 'Hybrid'
                        : event.type.toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.price === 'gratis'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-orange-500/10 text-orange-500'
                      }`}
                    >
                      {event.price.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {event.description}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300 hover:scale-[1.02] border-primary/10 text-base h-12"
                    onClick={() => window.open(event.link, '_blank')}
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>

              <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-20 group-hover:-translate-x-20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
