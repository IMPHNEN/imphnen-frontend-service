import localFont from 'next/font/local';

export const baiJamjureeFont = localFont({
  src: [
    { path: '../../public/fonts/BaiJamjuree-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/BaiJamjuree-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/BaiJamjuree-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/BaiJamjuree-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/BaiJamjuree-Bold.ttf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
});

export const poppinsFont = localFont({
  src: [
    { path: '../../public/fonts/Poppins-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Poppins-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Poppins-Bold.ttf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
});
