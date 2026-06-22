/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    // WebP only. AVIF compresses better but its encoder is far slower, which
    // stalls first paint of the remote gallery images; WebP keeps the bytes
    // small without the multi-second transcode.
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Long-lived immutable cache for static media (videos, images, fonts).
        source:
          "/:path*.(mp4|webm|webp|avif|png|jpg|jpeg|gif|svg|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
