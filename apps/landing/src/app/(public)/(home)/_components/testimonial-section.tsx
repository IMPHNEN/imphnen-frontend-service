'use client';

import { buttonVariants } from '@components';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

interface ApiTestimonial {
  id: number;
  user_id: number;
  user_fullname: string;
  role: string;
  content: string;
  created_at: string;
  is_deleted: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

const AVATAR_COLORS = [
  'bg-primary-500 text-white',
  'bg-blue-500 text-white',
  'bg-green-500 text-white',
  'bg-purple-500 text-white',
  'bg-orange-500 text-white',
  'bg-pink-500 text-white',
];

function getAvatarColor(index: number) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

function getInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

export function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('https://api.imphnen.dev/v1/landing/cms/testimonials')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((json) => {
        const items: Testimonial[] = (json.data as ApiTestimonial[])
          .filter((t) => !t.is_deleted)
          .slice(0, 6)
          .map((t) => ({
            id: t.id,
            name: t.user_fullname,
            role: t.role,
            text: t.content,
          }));
        setTestimonials(items);
      })
      .catch(() => {
        setTestimonials([]);
      });
  }, []);

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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${getAvatarColor(index)}`}
                  >
                    {getInitial(testimonial.name)}
                  </div>
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
