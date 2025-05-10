import { GlobalConfig } from 'payload';

export const CallToActionSection: GlobalConfig = {
  slug: 'call-to-action-section',
  label: 'Call To Action Section',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Siap Menjadi',
    },
    {
      name: 'highlightedTitle',
      type: 'text',
      required: true,
      defaultValue: 'Programmer Handal?',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        'Bergabunglah dengan komunitas IMPHNEN sekarang dan mulai perjalanan programming mu dengan cara yang menyenangkan!',
    },
    {
      name: 'primaryButtonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Gabung Discord',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
      required: true,
      defaultValue: 'https://discord.gg/imphnen',
    },
    {
      name: 'secondaryButtonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Join Facebook Group',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      required: true,
      defaultValue: 'https://facebook.com/groups/programmerhandal',
    },
  ],
};
