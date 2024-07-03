'use server'
import supabaseServer from './services/supabaseServer'

export async function deleteUser(userId: number) {
    // Uncomment this to enable deletion
    // await deleteUserById(userId);
    // revalidatePath('/');
}
export async function seenItem(id: number, seen: number) {
    'use server'
    const supabase = supabaseServer()

    const { data: item, error } = await supabase
        .from('items')
        .update({ seen: seen + 1 })
        .eq('id', id)

    if (error) {
        console.error('Error updating item:', error)
        return false
    } else {
        return true
    }
}

export async function finishItem(id: number, finished: boolean) {
    'use server'
    const supabase = supabaseServer()

    const { data: item, error } = await supabase
        .from('items')
        .update({ finished })
        .eq('id', id)

    if (error) {
        console.error('Error updating item:', error)
        return false
    } else {
        return true
    }
}

export async function showArchivedItems(showArchived: boolean) {
    'use server'
    const supabase = supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: userDetails, error } = await supabase
        .from('user_details')
        .update({ show_archived_items: showArchived })
        .eq('user_id', user?.id)

    if (error) {
        console.error('Error updating user:', error)
        return false
    } else {
        return true
    }
}
