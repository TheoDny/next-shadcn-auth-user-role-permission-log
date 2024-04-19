/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
        staleTimes: {
            dynamic: 10,
            static: 180,
        },
    },
}

module.exports = nextConfig
