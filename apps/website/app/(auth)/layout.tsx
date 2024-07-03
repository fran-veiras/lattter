import { NavBar } from 'modules/landing/components/navbar/NavBar';
import '../globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Lattter — your research copilot',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <link rel="icon" href="/Logo.png" sizes="any" />
      <body>
        <NavBar />
        <div className="flex flex-col">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
