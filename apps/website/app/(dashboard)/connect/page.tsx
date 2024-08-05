import { ConnectExtension } from 'modules/connect/ConnectExtension'

export default async function Connect() {
    return (
        <main className="flex flex-row flex-1 gap-4 relative">
            <ConnectExtension />
        </main>
    )
}
