import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm]
      })
    },
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: isSsrBuild
    ? undefined
    : {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (
                  id.includes('/recharts/') ||
                  id.includes('/d3-') ||
                  id.includes('/victory-vendor/')
                ) {
                  return 'vendor-charts'
                }
                if (id.includes('/framer-motion/') || id.includes('/motion-dom/')) {
                  return 'vendor-motion'
                }
                if (
                  id.includes('/react/') ||
                  id.includes('/react-dom/') ||
                  id.includes('/react-router') ||
                  id.includes('/scheduler/')
                ) {
                  return 'vendor-react'
                }
              }
            }
          }
        }
      }
}))
