import { Button } from '@components';
import Link from 'next/link';
import { BsChatLeftQuote } from 'react-icons/bs';

const testimonials = [
  {
    id: 1,
    name: 'User 1',
    date: 'April 2025',
    text: 'Bergabung dengan komunitas ini memberikan saya banyak inspirasi. Saya belajar banyak hal baru dan bertemu dengan orang-orang yang luar biasa.',
  },
  {
    id: 2,
    name: 'User 2',
    date: 'Maret 2025',
    text: 'Pengalaman yang sangat berharga. Saya mendapatkan banyak wawasan baru dan dapat mengembangkan keterampilan menulis saya dengan lebih baik.',
  },
  {
    id: 3,
    name: 'User 3',
    date: 'Maret 2025',
    text: 'Komunitas ini sangat mendukung dan memotivasi. Saya senang bisa menjadi bagian dari perjalanan ini dan berbagi pengalaman dengan sesama anggota.',
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="py-16 px-4 text-center border-b border-border">
        <BsChatLeftQuote className="size-14 mx-auto my-4 text-foreground" />
        <h1 className="text-4xl font-bold mb-4 text-foreground">Testimonial</h1>
        <p className="max-w-2xl mx-auto text-lg mb-8 text-balance text-muted-foreground">
          Menampilkan pengalaman dan cerita para member yang telah join ke dalam
          komunitas kami
        </p>
        <Link href="/testimonial/submit">
          <Button>Tulis Testimonialmu</Button>
        </Link>
      </div>

      {/* Testimonial Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border rounded-lg p-6 shadow-sm bg-card border-border"
            >
              <div className="flex items-center mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Lulus: {testimonial.date}
                  </p>
                </div>
              </div>
              <p className="text-foreground/80 italic">
                &quot;{testimonial.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
