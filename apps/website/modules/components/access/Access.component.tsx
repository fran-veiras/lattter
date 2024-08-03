'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { Logo } from '../ui/Logo'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import GoogleIcon from 'public/icons/GoogleIcon'
import { Facebook } from 'lucide-react'

interface IProps {
    type_of_mode: 'signup' | 'signin'
}

export const AccessToApp = ({ type_of_mode }: IProps) => {
    const router = useRouter()

    const supabase = createClientComponentClient()
    const accessWithFacebook = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
            },
        })

        router.refresh()
    }

    const accessWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
            },
        })

        router.refresh()
    }

    return (
        <main className="flex h-[100vh] m-auto w-full md:w-2/3 lg:w-1/3 xl:w-1/4 flex-col justify-center px-8">
            <div>
                <div className="relative h-1/6 mb-10">
                    <div className="flex scale-150 items-center justify-center w-full h-full absolute left-0 z-10">
                        <Logo />
                    </div>
                </div>
                <div className="mb-[43px] text-center">
                    <h1 className="font-medium text-2xl leading-[26px]">
                        {type_of_mode === 'signup' ? 'Sign Up' : 'Log In'} to
                        Lattter
                    </h1>
                    {type_of_mode === 'signup' ? (
                        <p className="text-xs mt-2 text-dark-muted text-gray-400">
                            Have an account?{' '}
                            <Link
                                className="underline transition-colors"
                                href={'/signIn'}
                            >
                                Log In
                            </Link>
                            .
                        </p>
                    ) : (
                        <p className="text-xs mt-2 text-dark-muted text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                className="underline transition-colors"
                                href={'/signUp'}
                            >
                                Sign Up
                            </Link>
                            .
                        </p>
                    )}
                </div>
                <div className="space-y-4">
                    <Button
                        onClick={() => accessWithFacebook()}
                        className="relative rounded-md border border-gray-300 text-dark-bright w-full shadow-lg !bg-gray-100 hover:!bg-gray-200 p-7"
                        type="submit"
                    >
                        <Facebook
                            strokeWidth="2px"
                            className="w-6 h-6 text-black absolute left-4"
                        />
                        Continue with Facebook
                    </Button>
                    <Button
                        onClick={() => accessWithGoogle()}
                        className="relative rounded-md border border-gray-300 text-dark-bright w-full shadow-lg !bg-gray-100 hover:!bg-gray-200 p-7"
                        type="submit"
                    >
                        <div className="absolute left-4">
                            <GoogleIcon />
                        </div>
                        Continue with Google
                    </Button>
                </div>
            </div>
        </main>
    )
}
