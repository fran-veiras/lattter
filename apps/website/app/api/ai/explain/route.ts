import type { NextRequest } from 'next/server'
import supabaseServer from '../../supabaseServer'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
    const token = request.headers.get('Authorization')
    const requestBodyText = await request.text()

    try {
        const supabase = supabaseServer()

        const {
            data: { user },
        } = await supabase.auth.getUser(token ?? '')

        if (!user) {
            return new Response('Not user founded', {
                status: 500,
            })
        }

        const messages: { role: string; content: string }[] = [
            {
                role: 'system',
                content:
                    'You are an assistant who summarizes in a maximum of 50 words, concrete, does not invent and can complement with knowledge but must clarify it.',
            },
            {
                role: 'user',
                content: requestBodyText,
            },
        ]

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            // @ts-ignore
            messages: messages,
            max_tokens: 300,
        })

        return new Response(
            JSON.stringify(response.choices[0].message.content),
            {
                status: 200,
            },
        )
    } catch (err) {
        if (err instanceof Error) console.error('ERROR:', err.message)
        return new Response('ERROR', { status: 500 })
    }
}
