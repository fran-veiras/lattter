import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { EPrivateRoutes } from 'modules/models/routes.model'
import { parseEnumToArray } from 'modules/utilities/parse.utility'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const { data: userDetails } = await supabase
        .from('user_details')
        .select()
        .eq('user_id', session?.user.id)
        .single()

    const private_routes = parseEnumToArray(EPrivateRoutes)

    // beta
    if (!session || !userDetails || userDetails.plan !== 'PRO') {
        if (
            private_routes.some((route: string) =>
                req.nextUrl.pathname.includes(route),
            )
        ) {
            return Response.redirect(new URL('/', req.url))
        }
    }

    return res
}
