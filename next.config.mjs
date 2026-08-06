/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    // next/image optimizer defaults to a 60s cache-control on optimized
    // variants (editorial/research heroes), so it re-validates constantly.
    // Cache optimized images for a year (they're keyed by url+w+q, so a swap
    // produces a new key anyway).
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        // Static /public assets were served with cache-control: max-age=5, so
        // the multi-MB chooser images re-validated on nearly every visit. Cache
        // for a day with a week of stale-while-revalidate — a big cut in
        // revalidation round-trips, while a swapped photo still propagates
        // within ~24h (so it's safe for the non-fingerprinted assets we swap).
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control referrer info
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Enforce HTTPS (1 year)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          // Prevent XSS in older browsers
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Control browser features
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cloud.umami.is https://unpkg.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://prod.spline.design https://hooks.spline.design https://cloud.umami.is https://*.amazonaws.com https://unpkg.com https://www.gstatic.com https://fonts.googleapis.com https://fonts.gstatic.com",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
