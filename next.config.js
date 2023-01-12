/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    async redirects() {
      return [
        {
          source: '/',
          destination: '/t7/fd/!generic',
          permanent: false,
        },
      ]
    }
}

module.exports = nextConfig
