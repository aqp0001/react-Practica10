/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // Desactivar SSR para evitar problemas con localStorage y Redux
    output: 'export',
    // Configuración para imágenes estáticas
    images: {
      unoptimized: true
    }
  };
  
  module.exports = nextConfig;