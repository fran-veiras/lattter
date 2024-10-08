import supabaseServer from '@/api/supabaseServer'
import { Items } from 'modules/dashboard/dashboard/bucket/Items/Items.component'
import { Suspense } from 'react'
import Loading from './loading'

interface IDashboardParams {
    searchParams: {
        tag?: string
        domain?: string
    }
}

export default async function Dashboard() {
    const supabase = supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

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

    if (!userDetails.show_archived_items) {
        query = query.eq('finished', false)
    }

    const { data: items, error } = await query

    const { data: feed } = await supabase
        .from('feed')
        .select('*')
        .eq('user_id', user?.id)
        .order('score', { ascending: false })
        .limit(10)

    const { data: tags } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user?.id)
        .order('times', { ascending: false })

    const { data: folders } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', user?.id)

    return (
        <main className="flex flex-row flex-1 p-4 gap-4 relative">
            <Suspense fallback={<Loading />}>
                <div className="mx-auto my-10 w-11/12 xl:w-4/5 2xl:w-3/5">
                    <Items
                        items={items}
                        feed={feed}
                        tags={tags}
                        folders={folders}
                    />
                </div>
            </Suspense>
        </main>
    )
}
