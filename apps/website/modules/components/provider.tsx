'use client'

import { ISupabaseSession } from 'modules/models/session.model'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useLoginInExt } from 'modules/hooks/useLoginInExt'
import { useLoginOutExt } from 'modules/hooks/useLogoutExt'
interface UserDataContextType {
    user: ISupabaseSession | null
    userDetails: any | null
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
    user: any
    userDetails: any
    tokens: {
        access_token: string | undefined
        refresh_token: string | undefined
    }
}) => {
    const [queryClient] = useState(() => new QueryClient())

    useEffect(() => {
        if (tokens.access_token) {
            useLoginInExt({ tokens })
        } else {
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
