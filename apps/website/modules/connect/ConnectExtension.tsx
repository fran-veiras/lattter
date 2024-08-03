'use client'
import { UserDataContext } from '@/components/provider'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, Loader, LogIn } from 'lucide-react'
import { useLoginInExt } from 'modules/hooks/useLoginInExt'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

export const ConnectExtension = () => {
    const { tokens } = useContext(UserDataContext)
    const route = useRouter()
    const [errorMessage, setErrorMessage] = useState<
        false | { code: string; message: string }
    >(false)

    useEffect(() => {
        const connectExtension = async () => {
            if (tokens.access_token) {
                const connect: { message: string; code: string } =
                    await useLoginInExt({
                        tokens,
                    })

                console.log('res', connect)

                if (connect.message === 'success') {
                    route.push('/dashboard')
                } else {
                    setErrorMessage(connect)
                }
            }
        }

        connectExtension()
    }, [tokens])

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className="lights-brand w-full !left-0 top-0" />
            <div className="lights-brand w-full !right-0 bottom-0" />
            {!errorMessage && (
                <div className="flex flex-row gap-2 items-center">
                    <h1 className="text-3xl font-semibold">
                        Connecting with extension
                    </h1>
                    <Loader
                        strokeWidth="2px"
                        className="mx-2 h-6 w-6 animate-spin"
                    />
                </div>
            )}

            {errorMessage && (
                <div className="w-1/2 flex flex-col gap-4 justify-center">
                    <h1 className="text-3xl font-semibold text-center">
                        {errorMessage.message}
                    </h1>
                    {errorMessage.code === 'NOT_INSTALLED' && (
                        <div className="flex flex-row gap-2 justify-center h-4">
                            <Link
                                className="flex justify-center flex-row gap-2 items-center hover:text-black/50 transition-all"
                                target="_blank"
                                href={
                                    'https://chromewebstore.google.com/detail/lattter-%E2%80%94-your-ai-cross-p/feikcccicoogbafccdjmgdkffhimekek?hl=en-US&utm_source=ext_sidebar'
                                }
                            >
                                <p className="font-medium">Install now</p>
                                <ExternalLink width={18} height={18} />
                            </Link>
                            <Separator orientation="vertical" />
                            <Link
                                className="flex justify-center flex-row gap-2 items-center hover:text-black/50 transition-all"
                                href={'/dashboard'}
                            >
                                <p className="font-medium">Continue anyway</p>
                                <LogIn width={18} height={18} />
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
