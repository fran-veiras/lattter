'use client'

import { Button } from '@/components/ui/buttonAnimated'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'

export const SignIn = () => {
    const router = usePathname()
    const route = useRouter()
    return (
        <Button
            onClick={() => route.push('/signIn')}
            gradient_blur
            variant={'outline'}
            className={cn('!h-7 !w-32 !rounded-full cursor-pointer', {
                '!border-brand': router === '/signIn' || router === '/signUp',
            })}
        >
            <p className="text-xs !leading-none">Log In / Sign Up</p>
        </Button>
    )
}
