import type { GlobalConfig } from 'payload';

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Hero Section',
  fields: [
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'badgeText',
      label: 'Badge Text',
      type: 'text',
      required: true,
      defaultValue: 'Komunitas Programmer Indonesia',
    },
    {
      name: 'title',
      label: 'Main Title',
      type: 'text',
      required: true,
      defaultValue: 'Programmer Handal,',
    },
    {
      name: 'highlight',
      label: 'Highlight Text',
      type: 'text',
      required: true,
      defaultValue: 'Tanpa Ribet',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Temukan potensi programming Anda bersama komunitas yang mendukung, tutorial interaktif, dan sumber daya berkualitas tinggi.',
    },
    {
      type: 'group',
      name: 'buttons',
      label: 'Buttons',
      fields: [
        {
          name: 'primaryLabel',
          label: 'Primary Button Label',
          type: 'text',
          required: true,
          defaultValue: 'Mulai Belajar',
        },
        {
          name: 'primaryUrl',
          label: 'Primary Button URL',
          type: 'text',
          required: true,
          defaultValue: 'https://web.facebook.com/groups/1032515944638255',
        },
        {
          name: 'secondaryLabel',
          label: 'Secondary Button Label',
          type: 'text',
          required: true,
          defaultValue: 'Gabung Discord',
        },
        {
          name: 'secondaryUrl',
          label: 'Secondary Button URL',
          type: 'text',
          required: true,
          defaultValue: 'https://discord.com/invite/imphnen',
        },
      ],
    },
    {
      name: 'stats',
      label: 'Statistics',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { value: '180K+', label: 'Member' },
        { value: '500+', label: 'Tutorial' },
        { value: '24/7', label: 'Yapping' },
      ],
    },
  ],
};
