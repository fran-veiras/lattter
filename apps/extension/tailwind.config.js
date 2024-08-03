/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: [
        './**/*.tsx',
        './src/**/*.{tsx,html}',
        './src/contents/*.{tsx,html}',
    ],
    plugins: [],
    theme: {
        extend: {
            animation: {
                grid: 'grid 15s linear infinite',
            },
            keyframes: {
                grid: {
                    '0%': { transform: 'translateY(-50%)' },
                    '100%': { transform: 'translateY(0)' },
                },
            },
        },
    },
}
