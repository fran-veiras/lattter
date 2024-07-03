'use client'

import { Textarea } from '@/components/ui/textarea'
import { Dispatch, SetStateAction, useState } from 'react'
import { Filter } from './Filter.component'

export const Browser = ({
    filters,
    setFilters,
    setInputValue,
    defaultSearchValue,
}: {
    filters: string[]
    setFilters: Dispatch<SetStateAction<string[]>>
    setInputValue: Dispatch<SetStateAction<string | false>>
    defaultSearchValue: string | null
}) => {
    return (
        <div className="fixed z-20 inset-x-0 bottom-0 w-full duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
            <div className="mx-auto max-w-2xl px-4">
                <div className="border shadow-xl bg-background rounded-lg sm:border">
                    <div className="relative flex flex-col w-full overflow-hidden grow bg-background sm:rounded-md px-4 pb-4">
                        <Filter
                            filters={filters}
                            setFilters={setFilters}
                            defaultSearchValue={defaultSearchValue}
                        />
                        <Textarea
                            tabIndex={0}
                            placeholder="Search..."
                            className="min-h-[60px] !ring-0  w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:!outline-none sm:text-sm"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                            autoCorrect="off"
                            name="message"
                            rows={1}
                            onChange={e => setInputValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
