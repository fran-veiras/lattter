import type { NextRequest } from 'next/server'
import supabaseServer from '../../supabaseServer'

export async function POST(request: NextRequest) {
    const requestBodyText = await request.text()

    try {
        const folderData = JSON.parse(requestBodyText)

        const supabase = supabaseServer()

        const { data, error } = await supabase
            .from('folders')
            .insert([folderData])
            .select('id')

        if (error) {
            console.error('Error to insert row', error.message)
            return new Response('Server error', { status: 500 })
        }

        return new Response(JSON.stringify(data[0].id), {
            status: 200,
        })
    } catch (err: any) {
        console.error('ERROR:', err.message)
        return new Response('ERROR', { status: 500 })
    }
}
