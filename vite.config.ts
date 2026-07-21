import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/wedding-invitation/",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true },
});
