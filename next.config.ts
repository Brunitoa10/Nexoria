import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // TMDB ya entrega cada imagen en el tamaño pedido (w342, w1280...), así que no hace falta
    // re-optimizarlas en el servidor. Además evita depender de `sharp` en Windows.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "7abby72f43.ufs.sh", pathname: "/**" },
      { protocol: "https", hostname: "image.tmdb.org", pathname: "/t/p/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
