'use client';

import TESTIMONIALS from '@/data/testimonials.json';
import { buttonVariants } from '@components';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

export function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  return (
    <section className="w-full py-20 md:py-28 bg-gray-50">
      <div className="container" ref={ref}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Apa Kata Mereka Tentang
              <span className="block mt-2 text-primary-500">
                Komunitas Kami?
              </span>
            </h2>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-8 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                    unoptimized
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-gray-600 relative">
                  <FaQuoteLeft className="text-primary-500/30 w-6 h-6 mb-2" />
                  <p className="text-sm/relaxed">{testimonial.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Link href="/testimonials" className={buttonVariants({ size: 'lg' })}>
            Tulis Testimonimu
          </Link>
        </div>
      </div>
    </section>
  );
}
