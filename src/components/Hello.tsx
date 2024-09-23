import { currentUser } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';

const Hello = async () => {
  const t = await getTranslations('Dashboard');
  const user = await currentUser();

  return (
    <>
      <p>
        {`👋 `}
        {t('hello_message', { email: user?.emailAddresses[0]?.emailAddress })}
      </p>
      <p>
        Let’s scan your insurance cards!&nbsp;
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://google.com"
        >
          Click here!
        </a>
        &nbsp;For more accurate insurance validation.
      </p>
    </>
  );
};

export { Hello };
