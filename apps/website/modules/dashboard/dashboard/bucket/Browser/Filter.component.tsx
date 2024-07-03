import React, {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Check,
    ChevronsUpDown,
    FilterIcon,
    ListFilter,
    Loader,
    X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { showArchivedItems } from 'app/actions'

const frameworks = [
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

export const Filter = ({
    filters,
    setFilters,
    defaultSearchValue,
}: {
    filters: string[]
    setFilters: Dispatch<SetStateAction<string[]>>
    defaultSearchValue: string | null
}) => {
    const [open, setOpen] = useState(false)
    const route = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters))
    }, [filters])

    return (
        <div className="flex flex-row">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="!border-none">
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-fit justify-between hover:!bg-transparent !p-0"
                    >
                        <ListFilter height={16} width={16} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandGroup>
                            <CommandList>
                                {frameworks.map(framework => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={async (currentValue: any) => {
                                            if (
                                                !filters.includes(currentValue)
                                            ) {
                                                setFilters([
                                                    ...filters,
                                                    currentValue,
                                                ])
                                                if (
                                                    currentValue ===
                                                    'show_archived'
                                                ) {
                                                    setLoading(true)
                                                    const archive =
                                                        await showArchivedItems(
                                                            true,
                                                        )

                                                    if (archive) {
                                                        route.refresh()
                                                        setLoading(false)
                                                    }
                                                    setLoading(false)
                                                }
                                            } else {
                                                const removeValue =
                                                    filters.filter(
                                                        val =>
                                                            val !==
                                                            currentValue,
                                                    )
                                                setFilters(removeValue)
                                                if (
                                                    currentValue ===
                                                    'show_archived'
                                                ) {
                                                    setLoading(true)
                                                    const archive =
                                                        await showArchivedItems(
                                                            false,
                                                        )
                                                    if (archive) {
                                                        route.refresh()
                                                        setLoading(false)
                                                    }
                                                    setLoading(false)
                                                }
                                            }
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                Array.isArray(filters) &&
                                                    filters.includes(
                                                        framework.value,
                                                    )
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            <div className="flex items-center">
                {loading && (
                    <Loader
                        strokeWidth="1px"
                        className="mx-2 h-4 w-4 animate-spin"
                    />
                )}
                {defaultSearchValue && (
                    <div className="mx-4 rounded-full  px-2 py-1 bg-gray-200 flex flex-row items-center gap-2">
                        <p className="text-black text-xs">Search URL</p>
                        <X
                            className="text-black cursor-pointer"
                            width={16}
                            height={16}
                            onClick={() => route.push('/dashboard')}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
