import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { Provider } from 'modules/components/provider'
import supabaseServer from '@/api/supabaseServer'

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
    const supabase = supabaseServer()
    const session = await supabase.auth.getSession()

    const {
        data: { user },
    } = await supabase.auth.getUser(session.data.session?.access_token ?? '')

    const { data: userDetails } = await supabase
        .from('user_details')
        .select()
        .eq('user_id', user?.id)
        .single()

    const tokens = {
        access_token: session.data.session?.access_token,
        refresh_token: session.data.session?.refresh_token,
    }

    return (
        <body>
            <Provider user={user} userDetails={userDetails} tokens={tokens}>
                <div className="flex flex-col">{children}</div>
            </Provider>
            <Analytics />
        </body>
    )
}
