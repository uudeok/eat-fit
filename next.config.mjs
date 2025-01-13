/** @type {import('next').NextConfig} */
const nextConfig = {
    generateBuildId: 'eat-fit-build-id',
    reactStrictMode: false,
    poweredByHeader: false,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: false,
//     webpack: (config) => {
//         config.module.rules.push({
//             test: /\.svg$/,
//             use: ['@svgr/webpack'],
//         });

//         return config;
//     },
// };

// export default nextConfig;
