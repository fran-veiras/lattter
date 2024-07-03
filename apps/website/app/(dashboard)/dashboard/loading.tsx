import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-2 max-w-3xl m-auto flex-wrap px-4 mt-4 mb-40 ">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(el => (
                    <div className="flex flex-row gap-2" key={el}>
                        <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
                        <Skeleton className="h-20 w-full rounded-xl bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>
    )
}
