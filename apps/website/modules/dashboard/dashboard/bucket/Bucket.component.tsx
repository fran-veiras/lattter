import React, { Suspense } from 'react'
import supabaseServer from '../../../../app/api/supabaseServer'
import { Items } from './Items/Items.component'

export const Bucket = async () => {
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

    return (
        <div className="h-full">
            <Items items={items} feed={feed} />
        </div>
    )
}
