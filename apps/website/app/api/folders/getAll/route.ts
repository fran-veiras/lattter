import type { NextRequest } from 'next/server'
import supabaseServer from '../../supabaseServer'

export async function GET(request: NextRequest) {
    const token = request.headers.get('Authorization')

    try {
        const supabase = supabaseServer()

        const {
            data: { user },
        } = await supabase.auth.getUser(token ?? '')

        const { data: folders, error } = await supabase
            .from('folders')
            .select()
            .eq('user_id', user?.id ?? false)

        if (error) {
            console.error('Error to get data', error.message)
            return new Response('Server error', { status: 500 })
        }

        const responseData = JSON.stringify(folders)

        return new Response(responseData, {
            status: 200,
        })
    } catch (err) {
        if (err instanceof Error) console.error('ERROR:', err.message)
        return new Response('ERROR', { status: 500 })
    }
}
