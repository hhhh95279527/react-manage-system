import { defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react-swc';
import type { ConfigEnv } from 'vite';
import path from 'path';
import fs from 'fs';
// import Inspect from 'vite-plugin-inspect';
// import { visualizer } from 'rollup-plugin-visualizer';
const preloadPaths = ['src/views/user/index.tsx', 'src/views/role/index.tsx', 'src/views/dept/index.tsx'];
const prefetchUrls: string[] = [];

function prefetchUrlsPush() {
    const manifestPath = path.resolve('', 'dist/.vite/manifest.json');
    if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        preloadPaths.forEach((item) => {
            const itemPath = manifest[item].file;
            if (itemPath) {
                prefetchUrls.push('/' + itemPath);
            }
        });
    }
}
prefetchUrlsPush();
export const PrefetchLayzPlugins = (path: string[] = []) => {
    return {
        name: 'vite-plugin-prefetch-lazy',
        transformIndexHtml(html: string) {
            if (!path.length) return;
            let prefetchstr = '';
            path.forEach((item) => {
                prefetchstr += `<link rel="prefetch" href="${item}" as="script">`;
            });
            return html.replace('</head>', prefetchstr + '</head>');
        },
    };
};

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    console.log(env);
    return {
        server: {
            proxy: {
                '/api': {
                    target: 'https://m1.apifoxmock.com/m1/8053437-7808831-default',
                    changeOrigin: true,
                    // rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        build: {
            manifest: true,
            rollupOptions: {
                output: {
                    // 分包
                    manualChunks: {
                        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                        'antd-vendor': ['antd'],
                        'echarts-vendor': ['echarts'],
                    },
                    // manualChunks(id) {
                    //     if (id.includes('node_modules')) {
                    //         if (id.includes('react') || id.includes('react-dom')) {
                    //             return 'vendor-react';
                    //         }
                    //         if (id.includes('antd')) {
                    //             return 'vendor-antd';
                    //         }
                    //     }
                    //     if (id.includes('/views/')) {
                    //         const moduleName = id.split('/views/')[1].split('/')[0];
                    //         return 'views-' + moduleName;
                    //     }
                    // },
                },
            },
        },
        plugins: [
            // Inspect(),
            react(),
            PrefetchLayzPlugins(prefetchUrls),
            // visualizer({
            //     open: true, // 构建后自动打开报告
            // }),
        ],
    };
});
