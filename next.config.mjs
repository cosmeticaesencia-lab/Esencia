/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev usa `.next`; build de producción usa `.next-prod` (ver scripts en package.json)
  // Así `npm run build` no rompe el servidor de desarrollo que ya está corriendo.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
