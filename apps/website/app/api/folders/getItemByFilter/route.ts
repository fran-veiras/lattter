import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import supabaseServer from '@/api/supabaseServer'
import { handleAndReturnErrorResponse, LattterApiError } from '@/api/errors'

export async function GET(request: NextRequest) {
    const token = request.headers.get('Authorization')
    const searchParams = request.nextUrl.searchParams
    const params = {
        tag: searchParams.get('tag'),
        domain: searchParams.get('domain'),
    }
    try {
        const supabase = supabaseServer()

        const {
            data: { user },
        } = await supabase.auth.getUser(token ?? '')

        if (!user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const { data: userDetails } = await supabase
            .from('user_details')
            .select()
            .eq('user_id', user?.id)
            .single()

        let query = supabase
            .from('items')
            .select('*')
            .eq('user_id', user?.id)
            .order('created_at', { ascending: false })

        if (params.tag && params.tag.length > 0) {
            const tags = params.tag.split(',')
            const orFilter = tags
                .map((tag: any) => `category.cs.{${tag}}`)
                .join(',')

            query = query.or(orFilter)
        }

        if (params.domain && params.domain.length > 0) {
            const domains = params.domain.split(',')
            console.log('aaa', domains)
            const orFilter = domains
                .map((domain: any) => `link.ilike.%${domain}%`)
                .join(',')

            query = query.or(orFilter)
        }

        if (!userDetails.show_archived_items) {
            query = query.eq('finished', false)
        }

        const { data: items, error } = await query

        return NextResponse.json(items, { status: 200 })
    } catch (err: any) {
        return handleAndReturnErrorResponse(err)
    }
}
