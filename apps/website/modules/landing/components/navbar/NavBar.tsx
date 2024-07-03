'use client'

import { useRouter } from 'next/navigation'

import './styles.css'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Indicator } from './Indicator.component'
import { Button } from '@/components/ui/buttonAnimated'
import { UserMenu } from './UserMenu.component'
import { SignIn } from './SignIn.component'
import { useContext } from 'react'
import { UserDataContext } from '@/components/provider'

export const NavBar = () => {
    const route = useRouter()
    const { user } = useContext(UserDataContext)

    return (
        <nav className="navbar w-full z-50 h-12 bg-black left-0 top-0 fixed shadow-border flex justify-center items-center">
            <div className="relative h-full flex items-center gap-8">
                <div className="flex flex-row gap-6">
                    <Link href="/">
                        <p>Home</p>
                    </Link>
                    <Link href="/forBusiness">
                        <p>For business</p>
                    </Link>
                </div>
                <Indicator />
            </div>
            <div className="absolute right-2 !px-0 !py-0">
                {!user?.id && <SignIn />}
                {user?.id && (
                    <div className="flex flex-row gap-2">
                        <Button
                            onClick={() => route.push('/dashboard')}
                            gradient_blur
                            variant={'outline'}
                            className={cn(
                                '!h-7 !w-32 !rounded-full cursor-pointer hover:bg-gray-100',
                            )}
                        >
                            <p>Dashboard</p>
                        </Button>
                        <UserMenu privateRoute={false} />
                    </div>
                )}
            </div>
        </nav>
    )
}
