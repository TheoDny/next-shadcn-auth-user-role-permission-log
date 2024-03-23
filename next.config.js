/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
    },
    //eslint: {
    //    ignoreDuringBuilds: true,
    //},
    //typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
    //},
}

module.exports = nextConfig
