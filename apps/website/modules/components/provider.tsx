'use client'

import React, {
    createContext,
    type ReactNode,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useLoginInExt } from 'modules/hooks/useLoginInExt'
import { useLoginOutExt } from 'modules/hooks/useLogoutExt'
import type { User } from '@supabase/supabase-js'
interface UserDataContextType {
    user: User | null
    userDetails: { name: string } | null
    tokens: {
        access_token: string | undefined
        refresh_token: string | undefined
    }
}

export const UserDataContext = createContext<UserDataContextType>({
    user: null,
    userDetails: null,
    tokens: { access_token: undefined, refresh_token: undefined },
})

export const Provider = ({
    children,
    user,
    userDetails,
    tokens,
}: {
    children: ReactNode
    user: User | null
    userDetails: { name: string }
    tokens: {
        access_token: string | undefined
        refresh_token: string | undefined
    }
}) => {
    const [queryClient] = useState(() => new QueryClient())

    useEffect(() => {
        if (!tokens?.access_token) {
            useLoginOutExt()
        }
    }, [tokens])

    return (
        <QueryClientProvider client={queryClient}>
            <UserDataContext.Provider value={{ user, tokens, userDetails }}>
                {children}
            </UserDataContext.Provider>
        </QueryClientProvider>
    )
}
