import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/clean-flow/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                services: resolve(__dirname, 'services.html'),
                news: resolve(__dirname, 'news.html'),
                contact: resolve(__dirname, 'contact.html'),
                impressum: resolve(__dirname, 'impressum.html'),
                unterhaltsreinigung: resolve(__dirname, 'unterhaltsreinigung.html'),
                buroreinigung: resolve(__dirname, 'buroreinigung.html'),
                spezialreinigung: resolve(__dirname, 'spezialreinigung.html'),
                newsDetail: resolve(__dirname, 'news-detail.html'),
            },
        },
    },
})
