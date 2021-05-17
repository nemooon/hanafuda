import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {find: '@', replacement: '/src'},
    ],
  },
  plugins: [vue()],
  server: {
    proxy: {
      '/socket.io/': 'http://localhost:3333/socket.io/',
    },
  }
})
