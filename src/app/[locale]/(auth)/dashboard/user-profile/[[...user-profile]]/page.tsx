import { UserProfile } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

import { getI18nPath } from '@/utils/Helpers';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'UserProfile',
  });

  return {
    title: t('meta_title'),
  };
}

const UserProfilePage = (props: { params: { locale: string } }) => (
  <div className="mx-auto my-6 w-full max-w-md px-2 md:max-w-lg md:px-4 lg:max-w-xl">
    <UserProfile
      path={getI18nPath('/dashboard/user-profile', props.params.locale)}
    />
  </div>
);

export default UserProfilePage;
