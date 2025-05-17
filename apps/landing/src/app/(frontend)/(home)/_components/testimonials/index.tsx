'use client';

import { Button } from '@components/atoms';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { ImPencil2 } from 'react-icons/im';

const testimonials = [
  {
    author: {
      name: 'Ega',
      role: 'Backend Engineer',
      avatar: '/ega.webp',
    },
    quote:
      'Tralalero Tralala, IMPHENOTRUNASA merupakan anomali yang sering datang ketika melihat orang ngoding',
  },
  {
    author: {
      name: 'Rasyid',
      role: 'Fullsnack Engineer',
      avatar: '/rasyid.webp',
    },
    quote:
      'Dapet job dari meme yang di-share disini. Gak nyangka yapping random bisa jadi koneksi kerja akwokaowkoak',
  },
  {
    author: {
      name: 'Maulana Sodiqin',
      role: 'Backend Engineer',
      avatar: '/maulana.webp',
    },
    quote: 'Anjay aku bohong? Admin yang bohong',
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Double the testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimoni"
      className="w-full py-20 md:py-32 bg-muted relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary)/0.1),transparent_50%)]" />
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              Testimoni{' '}
            </span>
            Member
          </h2>
          <p className="max-w-[800px] mx-auto text-muted-foreground md:text-lg">
            Apa kata mereka yang telah bergabung dengan komunitas IMPHNEN?
          </p>
        </motion.div>

        {/* Infinite Marquee Section */}
        <div className="relative w-full overflow-hidden py-4 marquee-container">
          <motion.div
            className="flex"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 40,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {duplicatedTestimonials.map((testimonial, i) => (
              <div
                key={i}
                className="w-[300px] md:w-[400px] shrink-0 mx-4 p-6 rounded-xl bg-background border border-border/20 hover:border-primary/30 transition-colors group flex flex-col"
                style={{ minHeight: '200px' }} // Set a fixed minimum height
              >
                <div className="flex flex-col gap-4 flex-grow">
                  <p className="text-muted-foreground italic leading-relaxed line-clamp-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-auto">
                    {' '}
                    {/* This pushes the author info to the bottom */}
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                        <Image
                          src={testimonial.author.avatar}
                          alt={testimonial.author.name}
                          width={48}
                          height={48}
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.author.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.author.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <Button
            size="lg"
            className="group relative w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 font-bold text-white hover:text-white/90 shadow-lg"
          >
            <ImPencil2 className="size-5" />
            Tulis Testimonial Kamu
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
