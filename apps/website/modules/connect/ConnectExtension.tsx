'use client'
import { UserDataContext } from '@/components/provider'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, Loader, LogIn } from 'lucide-react'
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
        const handleExtensionResponse = (event: {
            data: { direction: string; message: { message: string } }
        }) => {
            if (event.data && event.data.direction === 'from-extension') {
                if (event.data.message.message === 'success') {
                    route.push('/dashboard')
                } else {
                    setErrorMessage({
                        code: '500',
                        message: 'Unexpected error',
                    })
                }
            }
        }

        window.addEventListener('message', handleExtensionResponse)

        const connectExtension = async () => {
            // biome-ignore lint/style/useConst:
            let timeoutHandler: NodeJS.Timeout

            timeoutHandler = setTimeout(() => {
                setErrorMessage({
                    code: 'NOT_INSTALLED',
                    message:
                        'Make sure you have the extension installed correctly.',
                })
            }, 10000)

            if (tokens.access_token) {
                console.log('sending message')
                window.postMessage(
                    {
                        direction: 'from-page-script',
                        message: tokens,
                    },
                    '*',
                )
            }
        }

        connectExtension()

        return () => {
            window.removeEventListener('message', handleExtensionResponse)
        }
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
