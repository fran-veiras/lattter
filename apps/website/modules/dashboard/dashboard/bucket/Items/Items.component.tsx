'use client'
import Fuse, { FuseResult } from 'fuse.js'
import { IItem, ITags } from 'modules/models/folder.interface'
import React, { Suspense, useEffect, useState } from 'react'
import { BucketItem } from './BucketItem.component'
import { Browser } from '../Browser/Browser.component'
import { IFeedItem } from 'modules/models/feed.interface'
import { SuggestedItem } from './SuggestedItem.component'
import { useSearchParams } from 'next/navigation'
import Loading from 'app/(dashboard)/dashboard/loading'
import { Separator } from '@/components/ui/separator'

interface IFilteredItems {
    bucket: FuseResult<IItem>[]
    suggested?: FuseResult<IFeedItem>[] | undefined | false
}

export const Items = ({
    items,
    feed,
    tags,
}: {
    items: IItem[] | null
    feed: IFeedItem[] | null
    tags: ITags[] | null
}) => {
    const [filteredItems, setFilteredItems] = useState<IFilteredItems>({
        bucket: [],
        suggested: [],
    })
    const defaultSearchValue = useSearchParams().get('search')
    const [inputValue, setInputValue] = useState<false | string>(false)
    const getInitialFilters =
        typeof window !== 'undefined' && localStorage.getItem('filters')
    const filtersParsed = getInitialFilters && JSON.parse(getInitialFilters)

    const [filters, setFilters] = useState<string[]>(filtersParsed ?? [])

    useEffect(() => {
        if (items && inputValue && inputValue.length) {
            const itemsToSearch =
                filters && filters?.includes('hide_quotes')
                    ? items.filter(item => item.type !== 'QUOTE')
                    : items

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
    }, [inputValue, items, filters])

    function getInitialItems() {
        if (defaultSearchValue) {
            const defaultItem = items?.filter(
                item => item.link === defaultSearchValue,
            )

            return { bucketItem: defaultItem }
        }

        const itemsToSearch =
            items && filters && filters?.includes('hide_quotes')
                ? items.filter(item => item.type !== 'QUOTE')
                : items

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

    return (
        <div className="relative flex flex-row gap-4 w-full m-0">
            <Browser
                tags={tags}
                setInputValue={setInputValue}
                filters={filters}
                setFilters={setFilters}
            />
            <Suspense fallback={<Loading />}>
                <div className="flex flex-[3] flex-col h-fit gap-2 mx-auto">
                    {!inputValue &&
                        initialItems.feedItem &&
                        initialItems.feedItem.map(item => (
                            <SuggestedItem key={item.id} item={item} />
                        ))}
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
                    {filteredItems &&
                        inputValue &&
                        filteredItems?.suggested && (
                            <>
                                <p className="mt-4">Based on your interests</p>
                                {filteredItems?.suggested?.map(({ item }) => (
                                    <SuggestedItem key={item.id} item={item} />
                                ))}
                            </>
                        )}
                </div>
            </Suspense>
            <div className="fixed bottom-0 w-full z-10 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>
    )
}
