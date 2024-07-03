import React from "react"

const buttonVariants =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  ring-offset-slate-950  focus-visible:ring-slate-300 bg-grey-black text-black border border-grey-border hover:bg-gray-100"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradient_blur?: boolean
  asChild?: boolean
  containerClassName?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      gradient_blur = false,
      asChild = false,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "span" : "button"

    const [inputPosition, setInputPosition] = React.useState({ x: 0, y: 0 })

    const buttonRef: React.RefObject<HTMLButtonElement> =
      React.useRef<HTMLButtonElement>(null)

    React.useEffect(() => {
      const handleMouseMove = (event: any) => {
        const { clientX, clientY } = event

        const buttonElement = buttonRef.current

        if (buttonElement) {
          const { left, top } = buttonElement.getBoundingClientRect() as DOMRect
          setInputPosition({ x: clientX - left, y: clientY - top })
        }
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }, [])
    return (
      <div className={`relative ${containerClassName}`}>
        <Comp
          className={`${buttonVariants} z-100 ${className}`}
          ref={ref}
          {...props}
        />
        {gradient_blur && (
          <button
            ref={buttonRef}
            aria-hidden={true}
            className={`
              transition-colors h-full placeholder:select-none border-2 border-grey-border placeholder:text-dark-faint focus:outline-none rounded-md text-dark-bright xl:text-sm w-full !border-dark-control-base pointer-events-none absolute top-0 left-0 z-10 cursor-default !bg-[transparent] opacity
              ${className}
            `}
            style={{
              opacity: "1",
              maskImage: `radial-gradient(30% 30px at ${inputPosition.x}px ${inputPosition.y}px, black 45%,transparent)`,
              WebkitMaskImage: `radial-gradient(30% 30px at ${inputPosition.x}px ${inputPosition.y}px, black 45%, transparent)`,
              borderColor: "#3dcf8e"
            }}
          />
        )}
      </div>
    )
  }
)
Button.displayName = "Button"
