import '../globals.css'

import { Analytics } from '@vercel/analytics/react'
import supabaseServer from '../api/supabaseServer'
import { Provider } from '@/components/provider'
import { NavBar } from 'modules/landing/components/navbar/NavBar'

export const metadata = {
    title: 'Lattter — your research copilot',
    description:
        'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <body>
            <NavBar />
            <div className="flex flex-col">{children}</div>
            <Analytics />
        </body>
    )
}
