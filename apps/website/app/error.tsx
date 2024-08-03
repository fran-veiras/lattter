'use client'

import { useEffect } from 'react'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="p-4 md:p-6">
            <div className="mb-8 space-y-4">
                <h1 className="font-semibold text-lg md:text-2xl">Error</h1>
                <p>{`${error}`}</p>
            </div>
        </main>
    )
}
