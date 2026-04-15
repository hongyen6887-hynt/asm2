import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Thay 'asm2' bằng tên repository chính xác của bạn trên GitHub
  basePath: '/asm2', 
  assetPrefix: '/asm2',
  images: {
    unoptimized: true, // Bắt buộc phải có nếu bạn dùng thẻ <Image> của Next.js khi export tĩnh
  },
  reactCompiler: true,
};

export default nextConfig;