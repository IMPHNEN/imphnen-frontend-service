import { Button } from '@components';
import Link from 'next/link';
import { BsChatLeftQuote } from 'react-icons/bs';
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

interface ApiResponse {
  data: ApiTestimonial[];
  meta: Record<string, unknown>;
  version: string;
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

async function fetchTestimonials() {
  const res = await fetch(
    'https://api.imphnen.dev/v1/landing/cms/testimonials',
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return [];
  }

  const json: ApiResponse = await res.json();
  return json.data.filter((t) => !t.is_deleted);
}

export default async function Page() {
  const testimonials = await fetchTestimonials();

  return (
    <div className="min-h-screen">
      <div className="py-16 px-4 text-center border-b border-border">
        <BsChatLeftQuote className="size-14 mx-auto my-4 text-foreground" />
        <h1 className="text-4xl font-bold mb-4 text-foreground">Testimonial</h1>
        <p className="max-w-2xl mx-auto text-lg mb-8 text-balance text-muted-foreground">
          Menampilkan pengalaman dan cerita para member yang telah join ke dalam
          komunitas kami
        </p>
        <Link href="/testimonials/submit">
          <Button>Tulis Testimonialmu</Button>
        </Link>
      </div>

      <div className="grid gap-8 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-16 container">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${getAvatarColor(index)}`}
                >
                  {getInitial(testimonial.user_fullname)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.user_fullname}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="text-gray-600 relative">
                <FaQuoteLeft className="text-primary-500/30 w-6 h-6 mb-2" />
                <p className="text-sm/relaxed">{testimonial.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
