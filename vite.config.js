import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: 'index.html',
                aframe: 'aframe.html',
                works: 'works.html',
                graphicdesigner: 'graphicdesigner.html',
                '3dart': '3dart.html',
                '3dartist': '3dartist.html'
            }
        }
    }
});
