'use client';

import { buttonVariants } from '@components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('https://api.imphnen.dev/v1/landing/cms/testimonials')
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((json) => {
        setTestimonials(
          (json.data as ApiTestimonial[])
            .filter((t) => !t.is_deleted)
            .slice(0, 6)
            .map((t) => ({ id: t.id, name: t.user_fullname, role: t.role, text: t.content }))
        );
      })
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <section className="w-full py-20 md:py-28 bg-gray-50">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl animate-[fadeInUp_0.4s_ease-out]">
            Apa Kata Mereka Tentang
            <span className="block mt-2 text-primary-500">Komunitas Kami?</span>
          </h2>
        </div>

        <div className="grid gap-8 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-[fadeInUp_0.4s_ease-out]"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${getAvatarColor(index)}`}>
                    {getInitial(testimonial.name)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-gray-600 relative">
                  <FaQuoteLeft className="text-primary-500/30 w-6 h-6 mb-2" />
                  <p className="text-sm/relaxed">{testimonial.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/testimonials" className={buttonVariants({ size: 'lg' })}>
            Tulis Testimonimu
          </Link>
        </div>
      </div>
    </section>
  );
}
