import { GlobalConfig } from 'payload';

export const FeaturesSection: GlobalConfig = {
  slug: 'features-section',
  label: 'Features Section',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Belajar programming dengan cara yang lebih baik',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue:
        'IMPHNEN hadir dengan berbagai fitur untuk membantu kamu menjadi programmer handal tanpa harus pusing dengan coding.',
    },
    {
      name: 'features',
      type: 'array',
      defaultValue: [
        {
          icon: 'LaptopIcon',
          title: 'Belajar Tanpa Koding',
          description:
            'Pelajari konsep programming dengan cara yang mudah dipahami tanpa harus menulis kode yang rumit.',
        },
        {
          icon: 'UsersIcon',
          title: 'Komunitas Supportif',
          description:
            'Bergabunglah dengan komunitas programmer Indonesia yang siap membantu dan berbagi pengalaman.',
        },
        {
          icon: 'BookOpenIcon',
          title: 'Tutorial Interaktif',
          description:
            'Akses tutorial interaktif yang membuat konsep programming lebih mudah untuk dipahami.',
        },
        {
          icon: 'CodeIcon',
          title: 'Proyek Praktis',
          description:
            'Terapkan pengetahuan Anda dalam proyek nyata dengan panduan langkah demi langkah.',
        },
      ],
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'LaptopIcon', value: 'LaptopIcon' },
            { label: 'UsersIcon', value: 'UsersIcon' },
            { label: 'BookOpenIcon', value: 'BookOpenIcon' },
            { label: 'CodeIcon', value: 'CodeIcon' },
          ],
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
};
