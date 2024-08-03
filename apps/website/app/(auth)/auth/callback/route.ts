import type { NextRequest } from 'next/server'

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient({
            cookies: () => cookieStore,
        })
        const session = await supabase.auth.exchangeCodeForSession(code)

        const {
            data: { user },
        } = await supabase.auth.getUser(
            session.data.session?.access_token ?? '',
        )

        const user_details = await supabase
            .from('user_details')
            .select()
            .eq('user_id', user?.id)

        if (user_details?.data?.length === 0) {
            const userDetails = {
                user_id: user?.id,
                name: user?.user_metadata?.name ?? '',
            }

            await supabase.from('user_details').insert([userDetails])
        }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${requestUrl.origin}/connect`)
}
