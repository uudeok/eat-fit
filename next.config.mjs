/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    target: 'serverless',
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default nextConfig;
