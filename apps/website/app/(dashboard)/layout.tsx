import { NavBar } from 'modules/dashboard/navbar/NavBar'
import '../globals.css'
import { Analytics } from '@vercel/analytics/react'
import supabaseServer from '@/services/supabaseServer'

export const metadata = {
    title: 'Lattter — your research copilot',
    description:
        'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.',
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: userDetails, error } = await supabase
        .from('user_details')
        .select()
        .eq('user_id', user?.id)
        .single()

    return (
        <html lang="en" className="h-full bg-gray-50">
            <link rel="icon" href="/Logo.png" sizes="any" />
            <body>
                <NavBar userDetails={userDetails} />
                {children}
                <Analytics />
            </body>
        </html>
    )
}
