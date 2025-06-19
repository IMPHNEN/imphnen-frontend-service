import TESTIMONIALS from '@/data/testimonials.json';
import Image from 'next/image';
import { BsChatLeftQuote } from 'react-icons/bs';
import { FaQuoteLeft } from 'react-icons/fa';
import { TestimonialPopup } from './_components/testimonials-popup';

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="py-6 px-4 text-center border-b border-border">
        <BsChatLeftQuote className="size-14 mx-auto my-4 text-foreground" />
        <h1 className="text-4xl font-bold mb-4 text-foreground">Testimonial</h1>
        <p className="max-w-2xl mx-auto text-lg mb-4 text-balance text-muted-foreground">
          Menampilkan pengalaman dan cerita para member yang telah join ke dalam
          komunitas kami
        </p>
        <TestimonialPopup />
      </div>

      <div className="grid gap-8 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-16 container">
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
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
          </div>
        ))}
      </div>
    </div>
  );
}
