'use server'
import supabaseServer from '@/services/supabaseServer'

export async function submitData(data: { name: string }) {
    'use server'

    const supabase = supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (data.name && data.name.length > 0 && data.name.length < 40) {
        const { data: userDetails, error } = await supabase
            .from('user_details')
            .update({ name: data.name })
            .eq('user_id', user?.id)

        if (!error) {
            return true
        } else {
            return false
        }
    }
}
