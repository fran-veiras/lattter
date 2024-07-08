import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { useCallback } from 'react'

export const useSetSearchParams = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const selectedTags =
                searchParams?.get(name)?.split(',')?.filter(Boolean) ?? []
            const params = new URLSearchParams(searchParams.toString())

            if (selectedTags.includes(value)) {
                const tags = selectedTags.filter(tag => tag !== value)
                params.set(name, `${tags}`)
                return pathname + '?' + params.toString()
            }

            if (selectedTags.length) {
                const prev = selectedTags.toString()
                params.set(name, `${prev},${value}`)
                return pathname + '?' + params.toString()
            }

            params.set(name, value)
            return pathname + '?' + params.toString()
        },
        [searchParams],
    )

    return createQueryString
}
