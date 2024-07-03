import type { NextRequest } from 'next/server'
import supabaseServer from '../../supabaseServer'
import { categorization } from './categorization/categorizationAi'
import { tweetCategories } from './categorization/categories'

export async function POST(request: NextRequest) {
    const requestBodyText = await request.text()
    const token = request.headers.get('Authorization')

    try {
        const item = JSON.parse(requestBodyText)
        const supabase = supabaseServer()

        const {
            data: { user },
        } = await supabase.auth.getUser(token ?? '')

        if (user) {
            const categories = await categorization(item?.content)

            const formattedString = categories && categories.replace(/'/g, '"')
            const category = formattedString && JSON.parse(formattedString)

            console.log('hey!', category, Array.isArray(category))

            const itemData = {
                folder_id: item.folder_id,
                link: item.link,
                user_id: user?.id,
                content: [item?.content],
                category: category.filter((cat: string) =>
                    tweetCategories.includes(cat),
                ),
                type: item.type,
            }

            const { data, error } = await supabase
                .from('items')
                .select()
                .eq('user_id', user?.id)
                .eq('link', item.link)
                .single()

            if (!data) {
                const { error } = await supabase
                    .from('items')
                    .insert([itemData])

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
                            console.error(
                                'Error updating category:',
                                updateError,
                            )
                        } else {
                            console.log(
                                'Category times incremented successfully',
                            )
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
                                console.log(
                                    'Category inserted successfully:',
                                    data,
                                )
                            }
                        }
                    }
                })
            }

            return new Response('Item created', {
                status: 200,
            })
        } else {
            return new Response('User not found', { status: 500 })
        }
    } catch (err: any) {
        console.error('ERROR:', err.message)
        return new Response('ERROR', { status: 500 })
    }
}
