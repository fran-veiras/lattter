import '../globals.css'

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
        <html lang="en" className="h-full bg-gray-50">
            <body>
                <NavBar />
                <div className="flex flex-col">{children}</div>
            </body>
        </html>
    )
}
