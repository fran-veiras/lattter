'use client'
import Fuse, { FuseResult } from 'fuse.js'
import { IFolder, IItem, ITags } from 'modules/models/folder.interface'
import React, { useContext, useEffect, useState, Suspense } from 'react'
import { BucketItem } from './BucketItem.component'
import { Browser } from '../Browser/Browser.component'
import { IFeedItem } from 'modules/models/feed.interface'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import NotFound from 'public/icons/NotFound'
import { UserDataContext } from '@/components/provider'
import { LinksSkeleton } from 'app/(dashboard)/dashboard/loading'

interface IFilteredItems {
    bucket: FuseResult<IItem>[]
    suggested?: FuseResult<IFeedItem>[] | undefined | false
}

export const Items = ({
    items,
    feed,
    tags,
    folders,
}: {
    items: IItem[] | null
    feed: IFeedItem[] | null
    tags: ITags[] | null
    folders: IFolder[] | null
}) => {
    const [filteredItems, setFilteredItems] = useState<IFilteredItems>({
        bucket: [],
        suggested: [],
    })
    const searchParams = useSearchParams()
    const { tokens } = useContext(UserDataContext)
    const defaultSearchValue = useSearchParams().get('search')
    const [inputValue, setInputValue] = useState<false | string>(false)
    const getInitialFilters =
        typeof window !== 'undefined' && localStorage.getItem('filters')
    const filtersParsed = getInitialFilters && JSON.parse(getInitialFilters)
    const [itemsData, setItemsData] = useState(items)
    const [filters, setFilters] = useState<string[]>(filtersParsed ?? [])
    const [isLoading, setIsLoading] = useState(false)

    // need refactor
    useEffect(() => {
        if (itemsData && inputValue && inputValue.length) {
            const itemsToSearch =
                filters && filters?.includes('hide_quotes')
                    ? itemsData.filter(item => item.type !== 'QUOTE')
                    : itemsData

            const fuse = new Fuse(itemsToSearch, {
                keys: ['content', 'link', 'category'],
                threshold: 0.6,
                location: 0,
                distance: 100,
                includeMatches: true,
                includeScore: true,
                useExtendedSearch: true,
            })

            const filtererd = fuse.search(inputValue)

            const fuseSuggested =
                feed &&
                new Fuse(feed, {
                    keys: ['text', 'link', 'highlights', 'categories'],
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    includeMatches: true,
                    includeScore: true,
                    useExtendedSearch: true,
                })

            const suggestedItems =
                !filters?.includes('hide_suggestion') &&
                fuseSuggested?.search(inputValue)

            setFilteredItems({ bucket: filtererd, suggested: suggestedItems })
        }
    }, [inputValue, itemsData, filters])

    function getInitialItems() {
        if (defaultSearchValue) {
            const defaultItem = itemsData?.filter(
                item => item.link === defaultSearchValue,
            )

            return { bucketItem: defaultItem }
        }

        const itemsToSearch =
            itemsData && filters && filters?.includes('hide_quotes')
                ? itemsData.filter(item => item.type !== 'QUOTE')
                : itemsData

        const bucketItem =
            itemsToSearch &&
            itemsToSearch
                .sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime(),
                )
                .slice(0, 5)

        const feedItem =
            Array.isArray(filters) &&
            !filters?.includes('hide_suggestion') &&
            feed &&
            feed.slice(0, 3)

        return { bucketItem, feedItem }
    }

    const initialItems = getInitialItems()
    const domains = folders?.map(item => `${item.name}`)

    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/folders/getItemByFilter?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${tokens.access_token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setItemsData(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error:', error)
                setIsLoading(false)
            })
    }, [searchParams])

    return (
        <div className="relative flex flex-row gap-4 w-full m-0">
            <Browser
                tags={tags}
                setInputValue={setInputValue}
                filters={filters}
                setFilters={setFilters}
                domains={domains}
            />
            {isLoading ? (
                <LinksSkeleton />
            ) : (
                <div className="flex flex-[3] flex-col h-fit gap-2 mx-auto">
                    {!inputValue &&
                        initialItems.bucketItem &&
                        initialItems.bucketItem.map(item => (
                            <BucketItem key={item.id} item={item} />
                        ))}
                    {filteredItems &&
                        inputValue &&
                        filteredItems.bucket.map(({ item }) => (
                            <BucketItem key={item.id} item={item} />
                        ))}
                    {!itemsData?.length && (
                        <Card className="w-full h-[420px] p-4 flex items-center justify-center flex-col gap-8">
                            <h1 className="text-lg font-bold">
                                No items found.
                            </h1>
                            <NotFound />
                        </Card>
                    )}
                </div>
            )}
            <div className="fixed bottom-0 w-full z-10 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>
    )
}
