/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `s3.${process.env.AWS_REGION}.amazonaws.com`,
      },
    ],
  },
};

module.exports = nextConfig;
