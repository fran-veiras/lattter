/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatar.vercel.sh',
            },
            {
                hostname: 'www.google.com',
            },
        ],
    },
}

module.exports = nextConfig
