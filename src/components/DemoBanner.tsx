import Link from 'next/link';

export const DemoBanner = () => (
  <div className="sticky top-0 z-50 bg-gray-900 p-4 text-center text-lg font-semibold text-gray-100 [&_a:hover]:text-indigo-500 [&_a]:text-fuchsia-500">
    Welcome to Verified Insurances Website
    {' '}
    <Link href="/sign-up">Click here to Sign Up!</Link>
  </div>
);
