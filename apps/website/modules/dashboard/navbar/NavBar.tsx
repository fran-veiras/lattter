'use client'
import React, { useContext } from 'react'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuContent,
    DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { UserDataContext } from '@/components/provider'
import { usePathname } from 'next/navigation'
import { UserMenu } from 'modules/landing/components/navbar/UserMenu.component'
import { Home, Settings } from 'lucide-react'

function Team({ name }: { name: string }) {
    return (
        <div className="flex items-center gap-2">
            <UserMenu privateRoute />

            <span className="ml-1 text-lg font-medium">{name}</span>
            <Badge className="text-sm font-medium" variant="secondary">
                Pro (beta)
            </Badge>
        </div>
    )
}

export const NavBar = ({ userDetails }: { userDetails: any }) => {
    const { user } = useContext(UserDataContext)
    const path = usePathname()

    return (
        <nav className="bg-white shadow sticky left-0 top-0 z-30 w-full">
            <div className="w-full px-4 md:px-6">
                <div className="flex h-14">
                    <div className="flex-[1] flex items-center gap-4">
                        <div className="flex-shrink-0 flex items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Team
                                        name={
                                            userDetails?.name ??
                                            user?.user_metadata?.name ??
                                            ''
                                        }
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        Select Team
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <Link href="/rauchg">
                                            <DropdownMenuItem
                                                className={cn('cursor-pointer')}
                                            >
                                                rauchg
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href="/shadcn">
                                            <DropdownMenuItem
                                                className={cn('cursor-pointer')}
                                            >
                                                shadcn
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href="/leerob">
                                            <DropdownMenuItem
                                                className={cn('cursor-pointer')}
                                            >
                                                leerob
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Link href={'/dashboard'}>
                            <Home
                                className="text-gray-400 transition-all"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link href={'/dashboard/settings'}>
                            <Settings
                                className="text-gray-400 hover:rotate-45 transition-all"
                                width={20}
                                height={20}
                            />
                        </Link>
                    </div>

                    <div className="flex items-center flex-[1] justify-end">
                        <Link
                            href={'https://twitter.com/fveiras_'}
                            target="_blank"
                        >
                            <Button
                                className="justify-start gap-2"
                                size="sm"
                                variant="outline"
                            >
                                Feedback
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
