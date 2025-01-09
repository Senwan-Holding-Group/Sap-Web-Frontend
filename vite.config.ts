import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      "process.env.VITE_SECURE_LOCAL_STORAGE_HASH_KEY": JSON.stringify(
        env.VITE_SECURE_LOCAL_STORAGE_HASH_KEY
      ),
      "process.env.VITE_SECURE_LOCAL_STORAGE_PREFIX": JSON.stringify(
        env.VITE_SECURE_LOCAL_STORAGE_PREFIX
      ),
    },
    build: {
      chunkSizeWarningLimit: 1100,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
