import { GlobalConfig } from 'payload';

export const CommunitiesSection: GlobalConfig = {
  slug: 'communities-section',
  label: 'Communities Section',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      defaultValue: [
        {
          iconName: 'FacebookIcon',
          title: 'Facebook Group',
          description:
            'Bergabunglah dengan grup Facebook kami untuk diskusi santai dan berbagi artikel menarik.',
          buttonText: 'Gabung Sekarang',
          buttonLink: 'https://facebook.com/groups/1032515944638255',
        },
        {
          iconName: 'InstagramIcon',
          title: 'Instagram',
          description:
            'Ikuti kami di Instagram untuk tips programming, konten inspiratif, dan info event terbaru.',
          buttonText: 'Follow Kami',
          buttonLink: 'https://www.instagram.com/imphnen.dev',
        },
        {
          iconName: 'MessageCircleIcon',
          title: 'Discord Server',
          description:
            'Diskusikan langsung dengan sesama programmer dan dapatkan bantuan langsung dari para ahli.',
          buttonText: 'Join Server',
          buttonLink: 'https://discord.com/invite/imphnen',
        },
      ],
      fields: [
        {
          name: 'iconName',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'FacebookIcon' },
            { label: 'Instagram', value: 'InstagramIcon' },
            { label: 'Discord', value: 'MessageCircleIcon' },
          ],
          required: true,
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'buttonText', type: 'text', required: true },
        { name: 'buttonLink', type: 'text', required: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      defaultValue: [
        { value: '100K+', label: 'Member Aktif' },
        { value: '50+', label: 'Event Bulanan' },
        { value: '100+', label: 'Mentor Profesional' },
        { value: '5K+', label: 'Diskusi Mingguan' },
      ],
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};
