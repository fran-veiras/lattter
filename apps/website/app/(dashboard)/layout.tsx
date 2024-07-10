import { NavBar } from 'modules/dashboard/navbar/NavBar'
import '../globals.css'
import { Analytics } from '@vercel/analytics/react'
import supabaseServer from '@/api/supabaseServer'

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
        <body>
            <link rel="icon" href="/Logo.png" sizes="any" />

            <NavBar userDetails={userDetails} />
            {children}
            <Analytics />
        </body>
    )
}
