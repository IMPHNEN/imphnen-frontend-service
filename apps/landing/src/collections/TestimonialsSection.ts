import { GlobalConfig } from 'payload';

export const TestimonialsSection: GlobalConfig = {
  slug: 'testimonials-section',
  label: 'Testimonials Section',
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Testimoni Member',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Section Subtitle',
      type: 'textarea',
      defaultValue:
        'Apa kata mereka yang telah bergabung dengan komunitas IMPHNEN?',
      required: true,
    },
    {
      name: 'items',
      label: 'Testimonials Items',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea', label: 'Quote', required: true },
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'role', type: 'text', label: 'Role', required: true },
        {
          name: 'avatar',
          type: 'upload',
          label: 'Avatar',
          relationTo: 'media',
          required: true,
        },
      ],
      defaultValue: [
        {
          quote:
            'Saya yang tadinya tidak mengerti apa-apa tentang programming, sekarang bisa membuat website sendiri dengan mudah. Terima kasih IMPHNEN!',
          name: 'Budi Santoso',
          role: 'Web Developer Pemula',
          avatar: { id: '', relationTo: 'media' },
        },
        {
          quote:
            'Komunitas yang sangat supportif! Setiap pertanyaan selalu dijawab dengan cepat dan jelas. Diskusi programnya mudah dipahami.',
          name: 'Anita Ratna',
          role: 'Mobile App Developer',
          avatar: { id: '', relationTo: 'media' },
        },
        {
          quote:
            'Server Discord IMPHNEN adalah tempat belajar terbaik untuk programmer pemula seperti saya. Materinya lengkap dan komunitasnya sangat membantu!',
          name: 'Dedi Permana',
          role: 'Data Scientist',
          avatar: { id: '', relationTo: 'media' },
        },
      ],
    },
    {
      name: 'stats',
      label: 'Statistics',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', label: 'Value', required: true },
        { name: 'label', type: 'text', label: 'Label', required: true },
      ],
      defaultValue: [
        { value: '98%', label: 'Tingkat Kemalasan' },
        { value: '4.9/5', label: 'Rating Drama' },
        { value: '85%', label: 'Mendapat Pekerjaan' },
        { value: '24/7', label: 'Yapping' },
      ],
    },
    {
      name: 'joinTitle',
      label: 'Join Section Title',
      type: 'text',
      defaultValue: 'Bergabunglah dengan 10,000+ programmer Indonesia lainnya',
      required: true,
    },
    {
      name: 'joinText',
      label: 'Join Section Text',
      type: 'textarea',
      defaultValue:
        'Komunitas kami terus berkembang dengan programmer dari berbagai latar belakang dan tingkat keahlian. Bersama-sama, kita belajar, berbagi, dan tumbuh sebagai profesional.',
      required: true,
    },
  ],
};
