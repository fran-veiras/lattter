import OpenAI from 'openai'
import { itemCategories } from './categories'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function categorization(content: string) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const messages: any = [
        {
            role: 'system',
            content: `You are an assistant who selects categories for a tweet, post, or quote. You cannot invent other categories. Here are
            available categories: ${itemCategories}.
Here is an example output Javascript Array, Not string:
['Business', 'Technology', 'Startups']`,
        },
        {
            role: 'user',
            content: content,
        },
    ]

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 300,
    })

    if (response.choices) {
        return response.choices[0].message.content
    }

    return 'None'
}
