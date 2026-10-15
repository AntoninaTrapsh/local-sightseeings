const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages отдаёт проект по адресу https://<user>.github.io/<repo>/
const repoName = 'local-sightseeings';
const basePath = isProd ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
