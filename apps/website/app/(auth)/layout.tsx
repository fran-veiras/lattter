import { NavBar } from 'modules/landing/components/navbar/NavBar'
import '../globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
    title: 'Lattter — your research copilot',
    description:
        'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <body>
            <link rel="icon" href="/Logo.png" sizes="any" />
            <NavBar />
            <div className="flex flex-col">{children}</div>
            <Analytics />
        </body>
    )
}
