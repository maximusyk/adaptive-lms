import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';

const resolver = (pathToResolve: string) =>
    path.resolve(__dirname, pathToResolve);

const pwaOptions: Partial<VitePWAOptions> = {
    mode: 'development',
    base: '/',
    includeAssets: [ 'favicon.svg' ],
    registerType: 'autoUpdate',
    manifest: {
        name: 'PWA LMS',
        short_name: 'PWA LMS',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'pwa-192x192.png', // <== don't add slash, for testing
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/pwa-512x512.png', // <== don't remove slash, for testing
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: 'pwa-512x512.png', // <== don't add slash, for testing
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
            },
        ],
    },
    devOptions: {
        enabled: true,
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
    },
    srcDir: 'src',
    filename: 'claims-sw.ts',
    strategies: 'injectManifest',
};

export default defineConfig({
    build: {
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@general-types': resolver('./src/common/types/'),
            '@store': resolver('./src/store/'),
            '@features': resolver('./src/common/features/'),
            '@services': resolver('./src/common/services/'),
            '@hooks': resolver('./src/common/hooks/'),
            '@utils': resolver('./src/common/utils/'),
            '@assets': resolver('./src/common/assets/'),
            '@pages': resolver('./src/pages/'),
            '@componentsLayout': resolver('./src/components/layout/'),
            '@componentsUI': resolver('./src/components/ui/'),
        },
    },
    plugins: [ react(), VitePWA(pwaOptions) ],
    envPrefix: 'LMS_',
});
