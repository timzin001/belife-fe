// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // preset: 'node-server',
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
      },
      {
        code: 'vi',
        file: 'vi-VN.json',
      },
    ],
    lazy: true,
    strategy: 'no_prefix',
    defaultLocale: 'en',
  },
  vite: {
    build: {
      cssCodeSplit: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/Variables.scss" as *;
          `,
        },
      },
    },
  },
  runtimeConfig: {
    CRYPTO_ALGORITHM: process.env.CRYPTO_ALGORITHM,
    CRYPTO_KEY: process.env.CRYPTO_KEY,
    CRYPTO_IV: process.env.CRYPTO_IV,
    public: {
      /// Account
      accountBaseUrl:
        process.env.ACCOUNT_BASE_URL || 'http://localhost:8081/api/v1',
      orgBaseUrl: process.env.ORG_BASE_URL || 'http://localhost:8082/api/v1',
      chatBaseUrl: process.env.CHAT_BASE_URL || 'http://localhost:8083/api/v1',
    },
  },
})
