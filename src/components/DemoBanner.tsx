// src/components/DemoBanner.tsx

'use client';

// Example of an elegant font already available in your project, adjust to the one you need
import { Roboto } from 'next/font/google';
import { useTranslations } from 'next-intl';
import React from 'react';

import { AppConfig } from '@/utils/AppConfig';

// Configure the font (replace with your project's font)
const elegantFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-elegant',
});

const DemoBanner = () => {
  const t = useTranslations<'DemoBanner'>('DemoBanner');

  return (
    <div className={`sticky top-0 z-50 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white ${elegantFont.className} animate-pulse`}>
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          {/* Company Name */}
          <div className="text-center">
            <h1 className="bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-5xl font-bold text-transparent drop-shadow-2xl sm:text-6xl">
              {AppConfig.name}
            </h1>
            <p className="mt-2 text-lg text-white drop-shadow-md">
              {t('slogan')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DemoBanner };
