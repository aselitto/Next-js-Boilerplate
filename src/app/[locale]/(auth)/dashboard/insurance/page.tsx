// app/[locale]/(auth)/dashboard/insurance/page.tsx

import { getTranslations } from 'next-intl/server';
import { useSelector } from 'react-redux';

import InsuranceForm from '@/components/Forms/InsuranceForm';
import OcrScanner from '@/components/OcrScanner';
import type { RootState } from '@/store/store'; // Adjust the path as necessary

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'InsurancePage',
  });

  return {
    title: t('meta_title'), // Ensure 'meta_title' exists in your translation files 1 1
  };
}

const InsurancePage = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="space-y-8 p-6">
      <OcrScanner />
      <InsuranceForm initialData={user} />
    </div>
  );
};

export default InsurancePage;
