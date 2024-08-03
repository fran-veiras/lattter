'use client'
import { usePathname } from 'next/navigation'

type RouteIndicator = {
    [key: string]: string
}

export const Indicator = () => {
    const routes: RouteIndicator = {
        '/': 'translate-x-[-20px]',
        '/forBusiness': 'translate-x-[72px]',
        '/manifesto': 'translate-x-[176px]',
        '/docs/firstSteps': 'translate-x-[280px]',
        '/signIn': '!hidden',
        '/signUp': '!hidden',
        '/dashboard': '!hidden',
    }

    const router = usePathname()

    return (
        <div
            className={`absolute left-0 slide bottom-[-1px] w-[85px] h-[2px] bg-gradient-flash ${
                routes[router] ?? ''
            }`}
        />
    )
}
