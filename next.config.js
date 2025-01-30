/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: `${process.env.AWS_BUCKET_NAME}`,
      },
    ],
  },
};

module.exports = nextConfig;
