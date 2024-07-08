import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="flex flex-row gap-2 mx-auto my-10 w-11/12 xl:w-4/5 2xl:w-3/5">
            <div className="flex-[1] p-2">
                <Skeleton className="h-80 w-full rounded-xl bg-gray-200" />
            </div>
            <div className="flex flex-col p-2 gap-2 w-full m-auto flex-wrap flex-[3]">
                {[0, 1, 2, 3].map(el => (
                    <div className="flex flex-row gap-2" key={el}>
                        <Skeleton className="h-24 w-full rounded-xl bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>
    )
}
