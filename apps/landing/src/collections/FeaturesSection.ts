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
          iconName: 'tabler:device-laptop',
          title: 'Belajar Tanpa Koding',
          description:
            'Pelajari konsep programming dengan cara yang mudah dipahami tanpa harus menulis kode yang rumit.',
        },
        {
          iconName: 'tabler:users',
          title: 'Komunitas Supportif',
          description:
            'Bergabunglah dengan komunitas programmer Indonesia yang siap membantu dan berbagi pengalaman.',
        },
        {
          iconName: 'tabler:book',
          title: 'Tutorial Interaktif',
          description:
            'Akses tutorial interaktif yang membuat konsep programming lebih mudah untuk dipahami.',
        },
        {
          iconName: 'tabler:code',
          title: 'Proyek Praktis',
          description:
            'Terapkan pengetahuan Anda dalam proyek nyata dengan panduan langkah demi langkah.',
        },
      ],
      fields: [
        {
          name: 'iconName',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
};
