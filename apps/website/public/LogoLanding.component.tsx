import * as React from 'react'
const LogoLanding = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={42}
        height={42}
        viewBox="0 0 80 80"
        fill="none"
    >
        <title>Logo Icon</title>
        <mask
            id="a"
            width={80}
            height={80}
            x={0}
            y={0}
            maskUnits="userSpaceOnUse"
        >
            <rect width={80} height={80} fill="#FFF" rx={160} />
        </mask>
        <g mask="url(#a)">
            <path fill="#67be9b" d="M0 0h80v80H0z" />
            <path
                fill="#95d0b8"
                d="M32.414 59.35 50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
                filter="url(#b)"
                transform="rotate(40 40 40) scale(1.2)"
            />
            <path
                fill="#fcfcd7"
                d="M22.216 24 0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
                filter="url(#b)"
                style={{
                    mixBlendMode: 'overlay',
                }}
                transform="rotate(60 41.464 34.536) scale(1.2)"
            />
        </g>
        <defs>
            <filter
                id="b"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feGaussianBlur
                    result="effect1_foregroundBlur"
                    stdDeviation={7}
                />
            </filter>
        </defs>
    </svg>
)
export default LogoLanding
