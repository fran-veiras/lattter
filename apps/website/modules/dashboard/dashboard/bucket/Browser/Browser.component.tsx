'use client'

import { Dispatch, SetStateAction } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LinkFilter } from './LinkFilter.component'
import { ITags } from 'modules/models/folder.interface'
import { Switch } from '@/components/ui/switch'
import { showArchivedItems } from 'app/actions'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const defaultFilters = [
    {
        value: 'hide_suggestion',
        label: 'Hide suggestions',
    },
    {
        value: 'hide_quotes',
        label: 'Hide quotes',
    },
    {
        value: 'show_archived',
        label: 'Show archived items',
    },
]

export const Browser = ({
    filters,
    setFilters,
    setInputValue,
    tags,
}: {
    filters: string[]
    setFilters: Dispatch<SetStateAction<string[]>>
    setInputValue: Dispatch<SetStateAction<string | false>>
    tags: ITags[] | null
}) => {
    const route = useRouter()
    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters))
    }, [filters])

    return (
        <Card className="flex-[1] h-fit p-4 flex flex-col gap-2">
            <CardHeader className="!p-0">
                <p>Filter items</p>
            </CardHeader>
            <div className="relative flex flex-col w-full overflow-hidden sm:rounded-md">
                <Input
                    placeholder="Search..."
                    className="focus:outline-none !ring-0 focus:border-black bg-white"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={e => setInputValue(e.target.value)}
                />
            </div>
            <Separator className="my-2" />
            <div>
                <LinkFilter tags={tags} />
            </div>
            <Separator className="my-2" />
            <div className="flex flex-col gap-6">
                {defaultFilters.map(filter => (
                    <div
                        onClick={async () => {
                            if (!filters.includes(filter.value)) {
                                setFilters([...filters, filter.value])
                                if (filter.value === 'show_archived') {
                                    const archive =
                                        await showArchivedItems(true)
                                    if (archive) {
                                        route.refresh()
                                    }
                                }
                            } else {
                                const removeValue = filters.filter(
                                    val => val !== filter.value,
                                )
                                setFilters(removeValue)
                                if (filter.value === 'show_archived') {
                                    const archive =
                                        await showArchivedItems(false)
                                    if (archive) {
                                        route.refresh()
                                    }
                                }
                            }
                        }}
                        key={filter.value}
                        className="flex flex-row justify-between items-center"
                    >
                        <p>{filter.label}</p>
                        <Switch
                            checked={filters && filters.includes(filter.value)}
                        />
                    </div>
                ))}
            </div>
        </Card>
    )
}
