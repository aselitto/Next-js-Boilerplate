import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  // const t = useTranslations('Index');

  return (
    <>
      <p>
        {`Follow `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://twitter.com/aselitto"
          target="_blank"
          rel="noreferrer noopener"
        >
          @Verified-Insurances on Twitter
        </a>
        {` for updates and more information.`}
      </p>
      <h2 className="mt-5 text-2xl font-bold">
        Insurance validation for your next medical office visit.
      </h2>
      <p className="text-base">
        Find a doctor
        {' '}
        <span role="img" aria-label="zap">
          ⚡️
        </span>
        {' '}
        Quickly book and office visit based on next available opening
      </p>
      <ul className="mt-3 text-base">
        <li>🚀 speed through checkin by scanning this app</li>
        <li>🔥 quickly transfer your patient identity and insurance verification</li>
        <li>💎 securly and seamlessly</li>
        <li>
          🔒 we use secure Authentication with
          {' '}
          <a
            className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
            href="https://clerk.com?utm_source=github&amp;utm_medium=sponsorship&amp;utm_campaign=nextjs-boilerplate"
          >
            Clerk
          </a>
          {' '}
          (includes passwordless, social, and multi-factor auth)
        </li>
        <li>📦 all of your details for all healthcare from the same place</li>
        <li>
          🌐 we use Multi-language support (i18n) with next-intl and
          {' '}
          <a
            className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
            href="https://l.crowdin.com/next-js"
          >
            Crowdin
          </a>
        </li>
        <li>🔴 Complete the Forms here for all office visits</li>
        <li>🤖 Insurance Card Scanning optimization</li>
        <li>⚙️ Continiously developing more tools for your healthcare needs.</li>
      </ul>
    </>
  );
}
