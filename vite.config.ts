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
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom") ||
              id.includes("node_modules/scheduler")
            ) {
              return "vendor-react";
            }
            if (
              id.includes("node_modules/@fortawesome") ||
              id.includes("node_modules/@radix-ui") ||
              id.includes("node_modules/tailwindcss") ||
              id.includes("node_modules/class-variance-authority")
            ) {
              return "vendor-ui";
            }
            if (id.includes("node_modules")) {
              return "vendor-misc";
            }
            if (id.includes("/components/")) {
              return "ui";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
