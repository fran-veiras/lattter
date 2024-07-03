'use client'

import { UserDataContext } from '@/components/provider'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Avatar from 'boring-avatars'
import { HelpCircle, LogOut, UserCog } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LogoComponent from 'public/Logo.component'
import { useContext } from 'react'

export const UserMenu = ({ privateRoute }: { privateRoute: boolean }) => {
    const supabase = createClientComponentClient<any>()
    const { user } = useContext(UserDataContext)
    const route = useRouter()

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()

            if (privateRoute) {
                route.refresh()
            } else {
                route.refresh()
            }
        } catch (error) {
            console.error('Error during sign-out:', error)
        }
    }

    return (
        <>
            {user?.id && (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="cursor-pointer !outline-none focus:!outline-none active:!outline-none"
                        asChild
                    >
                        <div className="flex m-auto">
                            <LogoComponent />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="m-4">
                        <DropdownMenuLabel>
                            {user?.email ?? ''}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="!bg-gray-200" />
                        <DropdownMenuItem className="cursor-pointer">
                            <UserCog
                                strokeWidth="1px"
                                className="mr-4 w-4 h-4"
                            />
                            Settings
                        </DropdownMenuItem>
                        <Link
                            href="https://twitter.com/fveiras_"
                            target="_blank"
                        >
                            <DropdownMenuItem className="cursor-pointer hover:!bg-grey-hover">
                                <HelpCircle
                                    strokeWidth="1px"
                                    className="mr-4 w-4 h-4"
                                />
                                Help
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator className="!bg-gray-200" />
                        <DropdownMenuItem
                            onClick={() => handleSignOut()}
                            className="cursor-pointer hover:!bg-grey-hover text-red-500 hover:!text-red-500"
                        >
                            <LogOut
                                strokeWidth="1px"
                                className="mr-4 w-4 h-4"
                            />
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    )
}
