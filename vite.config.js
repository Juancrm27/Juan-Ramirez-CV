import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: 'index.html',
                aframe: 'aframe.html',
                works: 'works.html',
                
            }
        }
    }
});
