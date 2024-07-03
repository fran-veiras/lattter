import { Bucket } from 'modules/dashboard/dashboard/bucket/Bucket.component'

export default async function Dashboard() {
    return (
        <main className="flex flex-row flex-1 p-4 gap-4 relative">
            <div className="flex flex-[2] gap-4 flex-col">
                <Bucket />
            </div>
        </main>
    )
}
