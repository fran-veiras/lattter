import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const LinksSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 w-full mx-auto flex-wrap flex-[3]">
            {[0, 1, 2, 3].map(el => (
                <Card className="flex h-24 w-full flex-col gap-2 p-2" key={el}>
                    <div className="flex w-full flex-row gap-2">
                        <Skeleton className="h-6 w-6 rounded-full bg-gray-200" />
                        <Skeleton className="h-6 w-24 rounded-lg bg-gray-200" />
                        <Skeleton className="h-6 w-28 rounded-lg bg-gray-200" />
                        <Skeleton className="h-6 w-24 rounded-lg bg-gray-200" />
                    </div>
                    <Skeleton className="h-4 w-full rounded-lg bg-gray-200" />
                    <Skeleton className="h-4 w-3/4 rounded-lg bg-gray-200" />
                    <Skeleton className="h-4 w-1/2 rounded-lg bg-gray-200" />
                </Card>
            ))}
        </div>
    )
}

export default function Loading() {
    return (
        <div className="flex flex-row gap-2 mx-auto my-10 w-11/12 xl:w-4/5 2xl:w-3/5">
            <div className="flex-[1]">
                <Skeleton className="h-80 w-full rounded-xl bg-gray-200" />
            </div>
            <LinksSkeleton />
        </div>
    )
}
