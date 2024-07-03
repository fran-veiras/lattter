import type { NextRequest } from 'next/server'
import supabaseServer from '../supabaseServer'

export async function POST(request: NextRequest) {
    const refresh_token = request.headers.get('Authorization')

    console.log('entrandoooo', refresh_token)
    try {
        if (refresh_token) {
            const supabase = supabaseServer()

            const {
                data: { session, user },
                error: refreshError,
            } = await supabase.auth.refreshSession({
                refresh_token: refresh_token,
            })

            if (refreshError) {
                console.error('Error to refresh token', refreshError.message)
                return new Response('Server error', { status: 500 })
            }

            if (user) {
                return new Response(JSON.stringify({ ...session, user }), {
                    status: 200,
                })
            }
        } else {
            return new Response('ERROR: need refresh token', { status: 500 })
        }
    } catch (err: any) {
        console.error('ERROR:', err.message)
        return new Response('ERROR', { status: 500 })
    }
}
