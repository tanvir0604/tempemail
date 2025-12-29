// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactCompiler: true,
// };

// export default nextConfig;

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    output: 'standalone',
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
