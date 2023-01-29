import { defineConfig } from 'vite'
import {vitePluginFlow} from "vite-plugin-flow";

// Run "yarn build" if not exist

export default defineConfig({
    server: {
        open: true,
        //host: true,
    },
    build: {
        minify: false,
    },
    plugins: [vitePluginFlow()],
})
