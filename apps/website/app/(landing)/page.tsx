import { Button } from 'modules/components/ui/buttonAnimated'
import { getUsers } from '@/lib/db'
import { cn } from '@/lib/utils'
import { Dancing_Script } from 'next/font/google'
import Link from 'next/link'
import LogoLanding from 'public/LogoLanding.component'
import { WatchDemo } from 'modules/landing/components/watchDemo/WatchDemo.component'
const dancingScript = Dancing_Script({ subsets: ['latin'] })

export default async function IndexPage({
    searchParams,
}: {
    searchParams: { q: string; offset: string }
}) {
    const search = searchParams.q ?? ''
    const offset = searchParams.offset ?? 0
    const { users, newOffset } = await getUsers(search, Number(offset))

    return (
        <main className="flex flex-1 flex-col p-4 md:p-6 items-center my-20">
            <div className="flex flex-col items-center gap-12">
                <div className="flex flex-row items-center gap-2">
                    <LogoLanding />
                    <h1
                        style={{
                            fontFamily: `${dancingScript.style.fontFamily}`,
                        }}
                        className="!text-primary font-extrabold text-6xl"
                    >
                        Lattter
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-5xl text-center font-normal leading-[4rem] translate-y-1">
                        Your AI cross-platform bookmark for
                    </h3>
                    <h3
                        style={{
                            fontFamily: `${dancingScript.style.fontFamily}`,
                        }}
                        className="text-6xl text-center font-bold !leading-none"
                    >
                        research and link management
                    </h3>
                    {/* <h3 className="text-5xl text-center font-normal">
                        co-pilot, ensuring your compliance.
                    </h3> */}
                    <h1 className="my-8 text-center">
                        Lattter helps you research profiles or links, save,
                        organize, and remember them <b>lattter</b>.
                    </h1>
                    <Link href="/signUp">
                        <Button
                            variant={'outline'}
                            gradient_blur
                            className={cn(
                                '!h-10 !w-32 !rounded-full cursor-pointer shadow-md',
                            )}
                        >
                            <h1 className="text-base">Get started</h1>
                        </Button>
                    </Link>
                </div>
                <WatchDemo />
            </div>
        </main>
    )
}
