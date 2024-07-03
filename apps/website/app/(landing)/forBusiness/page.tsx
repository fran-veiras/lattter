import { Waitlist } from 'modules/landing/components/waitlist/Waitlist.component';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 's0 - For Business',
  description: 'The new standard for modern marketing ads',
  other: { 'facebook-domain-verification': 'kbhfu70dnpdmb58udnqt1hhekeqsqr' }
};

export default function ForBusiness() {
  return (
    <div className="w-full relative">
      <div className="lights-brand w-full !left-0 top-0" />
      <div className="lights-brand w-full !right-0 bottom-0" />
      <main className="relative flex h-[90vh] m-auto w-full md:w-2/3 lg:w-1/3 xl:w-1/2 flex-col justify-center px-8">
        <link rel="icon" href="/s0-brand.png" sizes="any" />
        <Waitlist />
      </main>
    </div>
  );
}
