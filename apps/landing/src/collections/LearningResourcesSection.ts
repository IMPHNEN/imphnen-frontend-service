// payload config
import { GlobalConfig } from 'payload';

export const LearningResourcesSection: GlobalConfig = {
  slug: 'learning-resources-section',
  label: 'Learning Resources Section',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Sumber Belajar',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Akses berbagai materi belajar yang akan membantu kamu menguasai konsep programming dengan cara yang menyenangkan.',
    },
    {
      name: 'resources',
      type: 'array',
      required: true,
      fields: [
        { name: 'icon', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'buttonText', type: 'text', required: true },
        { name: 'buttonLink', type: 'text', required: true },
      ],
      defaultValue: [
        {
          icon: 'tabler:video',
          title: 'Video Tutorial',
          description:
            'Belajar melalui tutorial video dari langkah awal hingga mahir.',
          buttonText: 'Lihat Semua Video',
          buttonLink: '#',
        },
        {
          icon: 'tabler:article',
          title: 'Artikel & Tutorial',
          description:
            'Pelajari konsep programming melalui artikel yang disusun secara terstruktur.',
          buttonText: 'Baca Artikel',
          buttonLink: '#',
        },
        {
          icon: 'tabler:brand-vscode',
          title: 'Tantangan Koding',
          description:
            'Uji kemampuan koding kamu dengan tantangan yang menyenangkan dan menantang.',
          buttonText: 'Mulai Tantangan',
          buttonLink: '#',
        },
        {
          icon: 'tabler:device-desktop-share',
          title: 'Sharing Session',
          description:
            'Ikuti sesi berbagi pengalaman dari programmer berpengalaman dan belajar dari pengalaman mereka.',
          buttonText: 'Jadwal Session',
          buttonLink: '#',
        },
      ],
    },
    {
      name: 'featured',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Rekomendasi Terbaik',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Kursus Lengkap Web Development',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Pelajari HTML, CSS, JavaScript, React, dan Node.js dalam satu kursus komprehensif yang dirancang untuk pemula hingga tingkat menengah.',
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          required: true,
          defaultValue: 'Mulai Kursus',
        },
        {
          name: 'primaryButtonLink',
          type: 'text',
          required: true,
          defaultValue: '#',
        },
        {
          name: 'secondaryButtonText',
          type: 'text',
          required: true,
          defaultValue: 'Lihat Silabus',
        },
        {
          name: 'secondaryButtonLink',
          type: 'text',
          required: true,
          defaultValue: '#',
        },
      ],
    },
  ],
};
