// app/[locale]/(auth)/dashboard/ocr/page.tsx
import { getTranslations } from 'next-intl/server';

import OcrScanner from '@/components/OcrScanner';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'OcrScanner',
  });

  return {
    title: t('meta_title'), // Ensure 'meta_title' exists in your translation files
  };
}

const OcrPage = () => (
  <div className="p-6">
    <OcrScanner />
  </div>
);

export default OcrPage;
