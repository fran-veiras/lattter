import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'

export const QuoteBlock = ({ content }: { content: string[] | null }) => {
    const [seeMore, setSeeMore] = useState(false)
    const [elementsToShow, setElementsToShow] = useState<string[]>()

    useEffect(() => {
        if (seeMore && content) {
            setElementsToShow(content)
        } else if (content?.[0]) {
            setElementsToShow([content?.[0]])
        }
    }, [seeMore])

    return (
        <div>
            {elementsToShow?.map((text, index) => (
                <div>
                    <p key={text}>{text}</p>

                    {seeMore && index + 1 !== content?.length && (
                        <div className="w-full h-4 my-1">
                            <Separator
                                className="!bg-gray-400"
                                orientation="vertical"
                            />
                        </div>
                    )}
                </div>
            ))}
            {content && content?.length > 1 && (
                <div
                    onClick={e => {
                        e.stopPropagation()
                        setSeeMore(!seeMore)
                    }}
                >
                    <p className="text-black py-1">
                        {seeMore ? 'See less' : 'See more'}
                    </p>
                </div>
            )}
        </div>
    )
}
