import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Xóa hoặc comment lại 2 dòng basePath và assetPrefix bên dưới */
  // basePath: '/asm2', 
  // assetPrefix: '/asm2',
  
  images: {
    unoptimized: true, 
  },
  // Nếu phiên bản Next.js của bạn không nhận reactCompiler thì có thể xóa dòng dưới
  // reactCompiler: true, 
};

export default nextConfig;