import { ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ITags } from 'modules/models/folder.interface'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSetSearchParams } from '../../hooks/use-set-search-params'
import Fuse, { FuseResult } from 'fuse.js'

export const LinkFilter = ({
    tags,
    domains,
    type,
}: {
    tags?: ITags[] | null
    domains?: string[] | undefined
    type: 'tag' | 'domain'
}) => {
    const searchParams = useSearchParams()
    const selectedTags =
        searchParams?.get(type)?.split(',')?.filter(Boolean) ?? []
    const createQueryString = useSetSearchParams()
    const [filters, setFilters] = useState(tags || domains)

    const [collapsed, setCollapsed] = useState(
        selectedTags.length ? false : true,
    )
    const route = useRouter()
    const [showMore, setShowMore] = useState(false)

    function searchFilterValue(value: string) {
        if (value.length === 0) {
            return setFilters(domains)
        }
        if (Array.isArray(filters)) {
            const fuse = new Fuse(filters as string[], {
                threshold: 0.6,
                location: 0,
                distance: 100,
                useExtendedSearch: true,
            })

            const filtererd = fuse.search(value).map(({ item }) => item)
            setFilters(filtererd)
        }
    }

    return (
        <fieldset className="overflow-hidden">
            <div className="flex h-8 items-center justify-between">
                <button
                    onClick={() => {
                        setCollapsed(!collapsed)
                    }}
                    className="flex items-center space-x-2"
                >
                    <ChevronRight
                        className={`${collapsed ? '' : 'rotate-90'} h-5 w-5 transition-all`}
                    />
                    <h4 className="font-medium text-gray-900">
                        {type === 'tag' ? 'Tags' : 'Domain'}
                    </h4>
                </button>
            </div>
            <AnimatePresence initial={false}>
                {!collapsed && (
                    <motion.div className="mt-4 grid gap-2">
                        {type === 'domain' && (
                            <Input
                                placeholder="Search..."
                                className="focus:outline-none !ring-0 focus:border-black bg-white"
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                autoCorrect="off"
                                onChange={e =>
                                    searchFilterValue(e.target.value)
                                }
                            />
                        )}
                        {filters ? (
                            filters
                                .slice(0, showMore ? 20 : 5)
                                .map((tag: any) => {
                                    return (
                                        <div
                                            key={tag?.id ?? tag}
                                            className="group relative flex cursor-pointer items-center space-x-3 rounded-md bg-gray-50 transition-all hover:bg-gray-100"
                                        >
                                            <Input
                                                id={tag.id?.toString() ?? tag}
                                                name={tag.id?.toString() ?? tag}
                                                checked={selectedTags.includes(
                                                    tag.category ?? tag,
                                                )}
                                                onChange={() => {
                                                    const url =
                                                        createQueryString(
                                                            type,
                                                            tag.category ?? tag,
                                                        )

                                                    typeof window !==
                                                        'undefined' &&
                                                        window.history.pushState(
                                                            null,
                                                            '',
                                                            url,
                                                        )
                                                }}
                                                type="checkbox"
                                                className="ml-3 h-4 w-4 cursor-pointer rounded-full border-gray-300 text-black focus:outline-none focus:ring-0"
                                            />

                                            <label
                                                htmlFor={
                                                    tag.id?.toString() ?? tag
                                                }
                                                className="flex w-full cursor-pointer items-center justify-between px-3 py-2 pl-0 text-sm font-medium text-gray-700"
                                            >
                                                <p>{tag.category ?? tag}</p>

                                                {tag.times && (
                                                    <p>{tag.times}</p>
                                                )}
                                            </label>
                                        </div>
                                    )
                                })
                        ) : (
                            <p>No tags yet</p>
                        )}
                        {type === 'domain' && !filters?.length && (
                            <p className="text-xs text-gray-400 text-center my-2">
                                No domains found
                            </p>
                        )}
                        {filters && filters.length > 5 && (
                            <Button
                                onClick={() => setShowMore(!showMore)}
                                className="my-2"
                            >
                                {showMore ? 'Show less' : 'Show more'}
                            </Button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </fieldset>
    )
}
