import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Configuration pour servir correctement les assets
    fs: {
      // Permet l'accès aux fichiers en dehors du root
      strict: false
    }
  },
  build: {
    // S'assurer que les assets sont copiés
    copyPublicDir: true
  },
  // Configuration pour les assets publics
  publicDir: 'public',
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp', '**/*.gif', '**/*.svg']
})
