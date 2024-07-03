import { IFeedItem } from 'modules/models/feed.interface'
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import XIcon from 'public/icons/XIcon'
import { Logo } from '@/components/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { SquareArrowOutUpRight } from 'lucide-react'

export const SuggestedItem = ({ item }: { item: IFeedItem }) => {
    const [selected, setSelected] = useState(false)
    const route = useRouter()

    return (
        <Card
            onClick={() => {
                setSelected(!selected)
            }}
            className={cn(
                'relative flex flex-row gap-4 flex-grow !border-none !bg-transparent !shadow-none transition-all cursor-pointer',
            )}
        >
            <div className="p-2">
                {item.url?.includes('x.com') ||
                item.url?.includes('twitter.com') ? (
                    <XIcon />
                ) : (
                    <Logo />
                )}
            </div>
            <div className="flex flex-col gap-2 bg-white border relative overflow-hidden border-gray-200 rounded-lg p-2">
                {selected && (
                    <div className="absolute left-0 top-0 z-10 w-full h-full items-center justify-center p-4">
                        <div className="flex flex-col gap-2 h-full items-center justify-center">
                            <Link
                                className={cn(
                                    'flex flex-row gap-2 items-center hover:opacity-60',
                                )}
                                target="_blank"
                                href={item.url ?? ''}
                            >
                                {item.url?.slice(0, 30)}
                                <SquareArrowOutUpRight width={16} height={16} />
                            </Link>
                        </div>
                    </div>
                )}
                {/* {item.seen > 0 && (
                    <div className="absolute right-4 bottom-2 flex flex-row items-center gap-1">
                        <Eye
                            className="text-green-400"
                            width={18}
                            height={18}
                        />
                        <p className="text-xs text-green-400">{item.seen}</p>
                    </div>
                )} */}
                <CardHeader
                    className={cn(
                        'flex flex-row relative items-center gap-2 !p-0 ',
                        {
                            'blur-lg': selected,
                        },
                    )}
                >
                    <div className="flex flex-row justify-between items-center w-full !m-0">
                        <div className="flex flex-row gap-2 items-center">
                            {item.categories.map(category => (
                                <div className="p-1 bg-black !m-0 rounded-md">
                                    <p className="text-xs text-white">
                                        {category}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="p-1 bg-black !m-0 rounded-md">
                            <p className="text-xs text-white">
                                AI suggestion ✨
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent
                    className={cn('!p-0', {
                        'blur-lg': selected,
                    })}
                >
                    <CardDescription className="break-words">
                        {item.text === 'No text content'
                            ? item.url
                            : item.highlights[0].split('| created_at')[0]}
                    </CardDescription>
                </CardContent>
            </div>
        </Card>
    )
}
