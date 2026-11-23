import type { NextConfig } from "next";

// basePath: carpeta bajo la que vive el sitio (en GitHub Pages es "/nombre-del-repo").
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default config;
