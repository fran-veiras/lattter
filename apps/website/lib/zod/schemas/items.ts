import z from '@/lib/zod'

export const createItem = z.object({
    folder_id: z.number().describe('The folder unique ID.'),
    link: z.string().describe('The URL to save'),
    user_id: z.string().describe('The user unique id'),
    content: z
        .string()
        .array()
        .describe('The content that is related to the link'),
    category: z.string().array().describe('The categories allowed for links.'),
    type: z.enum(['PAGE', 'POST', 'QUOTE']),
})
