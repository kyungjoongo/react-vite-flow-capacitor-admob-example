import { defineConfig } from 'vite'
import {vitePluginFlow} from "vite-plugin-flow";

// Run "yarn build" if not exist

export default defineConfig({
    build: {
        minify: false,
    },
    plugins: [vitePluginFlow()],
    server: {
        open: true,
        port: 8000
    }
})
