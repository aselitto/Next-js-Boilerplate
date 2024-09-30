// src/components/DemoBanner.tsx

'use client';

import { Inter } from 'next/font/google';
import { useTranslations } from 'next-intl';
import React from 'react';

import { AppConfig } from '@/utils/AppConfig';

// Using Inter, a modern and elegant sans-serif font.
const modernFont = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
});

const DemoBanner = () => {
  const t = useTranslations<'DemoBanner'>('DemoBanner');

  return (
    <div className={`bg-dark-gradient relative z-50 text-white ${modernFont.className}`}>
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            {/* Neumorphic-style Company Name */}
            <h1 className="neumorphic-text bg-gradient-to-r from-blue-300 via-teal-500 to-indigo-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              {AppConfig.name}
            </h1>
            <p className="text-md neumorphic-text mt-2 text-gray-300">
              {t('slogan')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DemoBanner };
