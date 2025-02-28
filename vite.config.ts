/*
 * @Author: yangchunpeng ruochengflag@163.com
 * @Date: 2025-02-27 18:10:47
 * @LastEditors: yangchunpeng ruochengflag@163.com
 * @LastEditTime: 2025-02-27 18:21:24
 * @FilePath: /pixiFilter/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import vitePluginString from "vite-plugin-string";
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vitePluginString()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    build: {
        target: "es2015",
        minify: "terser",
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                chunkFileNames: "js/[name]-[hash].js",
                entryFileNames: "js/[name]-[hash].js",
                assetFileNames: "[ext]/[name]-[hash].[ext]",
            },
        },
    },
    server: {
        host: true,
        port: 5173,
        open: false,
        cors: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/element/index.scss" as *;`,
            },
        },
    },
    optimizeDeps: {
        include: ["vue", "vue-router", "element-plus"],
    },
});
