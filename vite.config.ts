// IMPORTS
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

const BASE_URL = "/";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: BASE_URL,
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
