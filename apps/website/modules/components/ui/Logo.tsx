import { cn } from '@/lib/utils'
import React from 'react'
import { Dancing_Script } from 'next/font/google'
import LogoComponent from 'public/Logo.component'
const dancingScript = Dancing_Script({ subsets: ['latin'] })

export const Logo = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLHeadElement>
>(({ className, ...props }) => {
    return (
        <div className="flex items-center flex-row gap-2">
            <LogoComponent />
            <h1
                style={{ fontFamily: `${dancingScript.style.fontFamily}` }}
                className={cn(
                    '!text-primary font-extrabold text-3xl',
                    className,
                )}
                {...props}
            >
                Lattter
            </h1>
        </div>
    )
})
