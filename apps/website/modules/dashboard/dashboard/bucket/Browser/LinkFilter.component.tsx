import { ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ITags } from 'modules/models/folder.interface'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const LinkFilter = ({ tags }: { tags: ITags[] | null }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams],
    )

    const [collapsed, setCollapsed] = useState(true)
    const [showMore, setShowMore] = useState(false)

    console.log(tags)

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
                    <h4 className="font-medium text-gray-900">Tags</h4>
                </button>
            </div>
            <AnimatePresence initial={false}>
                {!collapsed && (
                    <motion.div className="mt-4 grid gap-2">
                        {tags ? (
                            tags
                                .slice(0, showMore ? 20 : 5)
                                .map((tag: ITags) => (
                                    <div
                                        key={tag.id}
                                        onClick={() => {
                                            router.push(
                                                pathname +
                                                    '?' +
                                                    createQueryString(
                                                        'tag',
                                                        tag.category,
                                                    ),
                                            )
                                        }}
                                        className="group relative flex cursor-pointer items-center space-x-3 rounded-md bg-gray-50 transition-all hover:bg-gray-100"
                                    >
                                        <Input
                                            id={tag.id.toString()}
                                            name={tag.id.toString()}
                                            checked={
                                                searchParams?.get('tag') ===
                                                tag.category
                                            }
                                            onChange={() => {
                                                router.push(
                                                    pathname +
                                                        '?' +
                                                        createQueryString(
                                                            'tag',
                                                            tag.category,
                                                        ),
                                                )
                                            }}
                                            type="checkbox"
                                            className="ml-3 h-4 w-4 cursor-pointer rounded-full border-gray-300 text-black focus:outline-none focus:ring-0"
                                        />
                                        <label
                                            htmlFor={tag.id.toString()}
                                            className="flex w-full cursor-pointer items-center justify-between px-3 py-2 pl-0 text-sm font-medium text-gray-700"
                                        >
                                            <p>{tag.category}</p>
                                            <p>{tag.times}</p>
                                        </label>
                                    </div>
                                ))
                        ) : (
                            <p>No tags yet</p>
                        )}
                        {tags && tags.length > 5 && (
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
