import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const serverComponentClient = () => {
    cookies().getAll()
    return createServerComponentClient({ cookies })
}

export default serverComponentClient
