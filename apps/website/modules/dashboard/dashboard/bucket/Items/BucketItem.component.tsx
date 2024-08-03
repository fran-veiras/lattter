import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { finishItem, seenItem } from 'app/actions'
import {
    Archive,
    CheckCheck,
    Eye,
    Globe,
    Quote,
    SquareArrowOutUpRight,
} from 'lucide-react'
import type { IItem } from 'modules/models/folder.interface'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import XIcon from 'public/icons/XIcon'
import React, { useState } from 'react'
import { QuoteBlock } from './quote/QuoteBlock.component'
import Image from 'next/image'

export const BucketItem = ({ item }: { item: IItem }) => {
    const [selected, setSelected] = useState(false)
    const route = useRouter()

    async function openItem() {
        const seen = await seenItem(item.id, item.seen)

        if (seen) route.refresh()
    }

    async function archiveItem() {
        const finish = await finishItem(item.id, !item.finished)

        if (finish) route.refresh()
    }

    const itemIcon = {
        POST: <XIcon />,
        PAGE: <Globe width={18} height={18} />,
        QUOTE: <Quote width={18} height={18} />,
    }

    const favicon =
        item?.link &&
        `https://www.google.com/s2/favicons?sz=32&domain_url=${new URL(item?.link).origin}`

    return (
        <Card
            onClick={() => {
                setSelected(!selected)
            }}
            style={{ wordBreak: 'break-word' }}
            className="relative flex flex-row gap-4 break-words flex-grow !border-none !bg-transparent !shadow-none transition-all cursor-pointer"
        >
            <div className="flex flex-col gap-2 bg-white border relative overflow-hidden border-gray-200 min-w-[80%] rounded-lg p-2">
                {selected && (
                    <div className="absolute left-0 top-0 z-10 w-full h-full items-center justify-center p-4">
                        <div className="relative flex flex-col gap-2 h-full items-center justify-center">
                            <Link
                                onClick={() => openItem()}
                                className={cn(
                                    'flex flex-row gap-2 items-center hover:opacity-60',
                                )}
                                target="_blank"
                                href={item.link ?? ''}
                            >
                                {item.link?.slice(0, 30)}
                                <SquareArrowOutUpRight width={16} height={16} />
                            </Link>
                            <div
                                onClick={() => archiveItem()}
                                className={cn(
                                    'absolute hover:text-red-400 transition-all flex items-center gap-2 flex-row right-0 bottom-[-4px]',
                                    {
                                        'hover:!text-green-300': item.finished,
                                    },
                                )}
                            >
                                <p className="text-sm font-medium">
                                    {item.finished ? 'Recover' : 'Archive'}
                                </p>
                                <Archive
                                    strokeWidth={2}
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {item.seen > 0 && !selected && (
                    <div className="absolute right-4 bottom-2 flex flex-row items-center gap-1">
                        <Eye
                            className="text-green-400"
                            width={18}
                            height={18}
                        />
                        <p className="text-xs text-green-400">{item.seen}</p>
                    </div>
                )}
                <CardHeader
                    className={cn(
                        'flex flex-row relative items-center gap-2 !p-0 ',
                        {
                            'blur-lg': selected,
                        },
                    )}
                >
                    <div className="flex flex-row gap-2 !m-0 items-center">
                        <div>
                            {favicon ? (
                                <Image
                                    className="rounded-full"
                                    alt=""
                                    src={favicon}
                                    width={24}
                                    height={24}
                                />
                            ) : (
                                itemIcon[item.type]
                            )}
                        </div>
                        {item.category.map(category => (
                            <div
                                key={category}
                                className="p-1 bg-green-200 !m-0 rounded-md"
                            >
                                <p className="text-xs">{category}</p>
                            </div>
                        ))}
                        {!item.category.length && (
                            <div className="p-1 bg-green-200 !m-0 rounded-md">
                                <p className="text-xs">Website</p>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent
                    className={cn('!p-0', {
                        'blur-lg': selected,
                    })}
                >
                    {item.type === 'QUOTE' ? (
                        <QuoteBlock content={item.content} />
                    ) : item?.content && item?.content?.[0].length > 1 ? (
                        <CardDescription className="break-words">
                            {item.content}
                        </CardDescription>
                    ) : (
                        <CardDescription className="break-words">
                            {item.link}
                        </CardDescription>
                    )}
                </CardContent>
            </div>
        </Card>
    )
}
