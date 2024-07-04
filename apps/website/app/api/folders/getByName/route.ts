import type { NextRequest } from 'next/server'
import supabaseServer from '../../supabaseServer'

export async function GET(request: NextRequest) {
    const token = request.headers.get('Authorization')
    const url = new URL(request.url)
    const folderName = url.searchParams.get('name')

    if (!folderName) {
        return new Response('Folder ID is required', { status: 400 })
    }

    try {
        const supabase = supabaseServer()

        const {
            data: { user },
        } = await supabase.auth.getUser(token ?? '')

        if (!user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const { data: folder, error } = await supabase
            .from('folders')
            .select()
            .eq('name', folderName)
            .eq('user_id', user.id)
            .single()

        if (error) {
            console.error('Error to get data', error.message)
            return new Response('Server error', { status: 500 })
        }

        if (!folder) {
            return new Response('Folder not found', { status: 404 })
        }

        const responseData = JSON.stringify(folder?.id)

        return new Response(responseData, {
            status: 200,
        })
    } catch (err: any) {
        console.error('ERROR:', err.message)
        return new Response('ERROR', { status: 500 })
    }
}
