import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import path from "path";

export default defineConfig({
  plugins: [react(), peerDepsExternal()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "abc-react-library",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "esm" : "cjs"}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "@mui/material", "prop-types"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "prop-types": "PropTypes",
        },
      },
    },
  },
});
