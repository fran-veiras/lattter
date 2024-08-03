'use client'

import Image from 'next/image'
import { type FormEvent, useRef, useState } from 'react'
import { Info, Loader } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import LogoLanding from 'public/LogoLanding.component'
import { Dancing_Script } from 'next/font/google'
import LogoComponent from 'public/Logo.component'
const dancingScript = Dancing_Script({ subsets: ['latin'] })

interface WaitlistInfo {
    email: string
    company: string
}

export const Waitlist = () => {
    const [waitlistInfo, setWaitlistInfo] = useState<WaitlistInfo>({
        email: '',
        company: '',
    })
    const [isSent, setIsSent] = useState<boolean | undefined>(false)

    const formRef = useRef<HTMLFormElement | null>(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target

        setWaitlistInfo(prevInfo => ({
            ...prevInfo,
            [name]: value,
        }))
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSent(undefined)

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/sendWaitlist`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(waitlistInfo),
                },
            )

            if (!response.ok) {
                setIsSent(false)
            }

            setIsSent(true)
        } catch (err) {
            setIsSent(false)
        }
    }

    return (
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row w-full h-full items-center">
            <div className="relative w-full flex flex-col items-center justify-center md:w-1/2 lg:w-1/2 xl:w-1/2 h-[300px] md:h-[500px] lg:h-[500px] xl:h-[500px]">
                <div className="flex flex-row items-center gap-2">
                    <LogoLanding />
                    <h1
                        style={{
                            fontFamily: `${dancingScript.style.fontFamily}`,
                        }}
                        className="!text-primary font-extrabold text-6xl"
                    >
                        Lattter
                    </h1>
                </div>
                <h1 className="!text-primary font-medium text-4xl">
                    For Business
                </h1>
            </div>
            {isSent && (
                <div className="fade-in w-11/12 md:w-1/2 lg:w-1/4 xl:w-1/4 flex m-auto justify-center items-center flex-col">
                    <p className="text-center">
                        You're on the list. We'll contact you soon with updates.
                        Follow us
                        <b> @lattter</b> to stay updated.{' '}
                    </p>
                </div>
            )}
            {!isSent && (
                <form
                    ref={formRef}
                    onSubmit={event => handleSubmit(event)}
                    className="h-full w-11/12 md:w-1/2 lg:w-1/2 xl:w-1/2 flex m-auto justify-center items-center flex-col"
                >
                    <div className="relative !z-20 my-4 flex w-full justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-300 shadow-md">
                            <LogoComponent />
                            <p className="text-center">
                                Your team enhanced with{' '}
                                <p
                                    className="inline-flex text-xl font-bold"
                                    style={{
                                        fontFamily: `${dancingScript.style.fontFamily}`,
                                    }}
                                >
                                    Lattter
                                </p>{' '}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <h1 className="text-2xl font-bold">
                            Join our waiting list
                        </h1>
                        <Popover>
                            <PopoverTrigger>
                                <Info
                                    strokeWidth="2px"
                                    className="cursor-pointer"
                                />
                            </PopoverTrigger>
                            <PopoverContent>
                                <b>Lattter For Business</b> is currently by
                                invitation only ● Sign up for the waitlist
                                below.
                            </PopoverContent>
                        </Popover>
                    </div>

                    <p className="my-4 text-center">
                        For Business has features such as custom AI models,
                        teams, shared goals and more.
                    </p>

                    <Input
                        value={waitlistInfo.email}
                        onChange={handleChange}
                        placeholder="Email"
                        name="email"
                        type="email"
                        className="my-1"
                    />
                    <Input
                        type="text"
                        onChange={handleChange}
                        value={waitlistInfo.company}
                        placeholder="Company name"
                        name="company"
                        className="my-1"
                    />
                    {isSent === false && (
                        <Button
                            className="rounded-md my-1 xl:text-sm h-12 w-full"
                            type="submit"
                            disabled={
                                !(
                                    waitlistInfo.email.length > 0 &&
                                    waitlistInfo.company.length > 0
                                )
                            }
                        >
                            Request access →
                        </Button>
                    )}
                    {isSent === undefined && (
                        <Button className="rounded-md xl:text-sm h-12 w-full">
                            <Loader
                                strokeWidth="1px"
                                className="mr-2 h-4 w-4 animate-spin text-white"
                            />
                            Request access
                        </Button>
                    )}
                </form>
            )}
            <style jsx>{`
                .fade-in {
                    animation: fadeIn 1s ease-in-out;
                }

                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}
