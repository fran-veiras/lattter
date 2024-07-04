import type { NextRequest } from 'next/server'
import supabaseServer from '../../supabaseServer'
import { categorization } from './categorization/categorizationAi'
import { tweetCategories } from './categorization/categories'
import { createItem } from '@/lib/zod/schemas/items'
import { LattterApiError } from '@/api/errors'

export async function POST(request: NextRequest) {
    const requestBodyText = await request.text()
    const token = request.headers.get('Authorization')

    try {
        const item = JSON.parse(requestBodyText)
        const supabase = supabaseServer()

        if (!item.folderName) {
            return new Response('Folder ID is required', { status: 400 })
        }

        const {
            data: { user },
        } = await supabase.auth.getUser(token ?? '')

        if (!user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const { data: folderId, error: folderError } = await supabase
            .from('folders')
            .upsert({ name: item.folderName, user_id: user.id })
            .select('id')
            .single()

        const categories = await categorization(item?.content)

        const formattedString = categories && categories.replace(/'/g, '"')
        const category = formattedString && JSON.parse(formattedString)

        const itemData = createItem.parse({
            folder_id: folderId,
            link: item.link,
            user_id: user?.id,
            content: [item?.content],
            category: category.filter((cat: string) =>
                tweetCategories.includes(cat),
            ),
            type: item.type,
        })

        const { data, error } = await supabase
            .from('items')
            .select()
            .eq('user_id', user?.id)
            .eq('link', item.link)
            .single()

        if (error) {
            throw new LattterApiError({
                code: error.code,
                message: error.message,
            })
        }

        if (!data) {
            const { error } = await supabase.from('items').insert([itemData])

            if (error) {
                console.error('Error data', error.message)
                return new Response('Server error', { status: 500 })
            }
        }

        if (item.type === 'QUOTE' && data) {
            const { error } = await supabase
                .from('items')
                .update({
                    content: [...data.content, item.content],
                })
                .eq('user_id', user?.id)
                .eq('link', item.link)
        }

        if (Array.isArray(category)) {
            category.forEach(async cat => {
                const categoryData = {
                    category: cat,
                    user_id: user.id,
                }

                const { data: existingCategory } = await supabase
                    .from('categories')
                    .select('*')
                    .eq('category', categoryData.category)
                    .eq('user_id', user.id)
                    .single()

                if (existingCategory) {
                    const { error: updateError } = await supabase
                        .from('categories')
                        .update({
                            times: existingCategory.times + 1,
                        })
                        .eq('id', existingCategory.id)

                    if (updateError) {
                        console.error('Error updating category:', updateError)
                    } else {
                        console.log('Category times incremented successfully')
                    }
                } else {
                    if (tweetCategories.includes(categoryData.category)) {
                        const { error: insertError, data } = await supabase
                            .from('categories')
                            .insert([categoryData])

                        if (insertError) {
                            console.error(
                                'Error inserting category:',
                                insertError,
                            )
                        } else {
                            console.log('Category inserted successfully:', data)
                        }
                    }
                }
            })
        }

        return new Response('Item created', {
            status: 200,
        })
    } catch (err: any) {
        console.error('ERROR:', err.message)
        return new Response('ERROR', { status: 500 })
    }
}
