/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    poweredByHeader: false,
    output: 'standalone',
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://d2jhyrb50h8ykh.cloudfront.net' : '',
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
