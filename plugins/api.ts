import { useToast } from 'primevue/usetoast'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.component('Toast', Toast)
  const toast = useToast()
  nuxtApp.provide('toast', toast)

  const config = useRuntimeConfig()
  console.log(`${config.public.accountBaseUrl || ''}`)
  const t = nuxtApp.vueApp.config.globalProperties.$t

  const socialAPI = $fetch.create({
    baseURL: `${config.public.accountBaseUrl || ''}`,
    onRequest({ options }) {
      const language = useCookie(CookieCons.LANGUAGE, CookieCons.OPTION)
      let defHeaders: any = options.headers || {}
      let contentType = defHeaders['Content-Type']

      let headers: any = {
        ...(options.headers as Record<string, any>),
        Platform: 'WEB',
        Language: language.value || 'en',
        'Content-Type': contentType || 'application/json',
      }
      const accessToken = useCookie(
        CookieCons.ACCESS_TOKEN_USER,
        CookieCons.OPTION
      )
      if (accessToken.value && accessToken.value != '') {
        headers['Authorization'] = `Bearer ${accessToken.value}`
      }
      options.headers = headers
    },

    // Optional: Add other global hooks like onResponseError
    onResponseError({ request, response, options }) {
      const data = response._data
      const messages = JSON.stringify(data.messages)

      if (response.status === APIStatusCons.BAD_REQUEST) {
        toast.add({
          severity: ToastCons.ERROR,
          summary: t('error'),
          detail: getErrorMessages(messages, t),
          life: ToastCons.DURATION,
        })
      } else if (response.status === APIStatusCons.UNAUTHORIZED) {
        toast.add({
          severity: ToastCons.ERROR,
          summary: t('error'),
          detail: getErrorMessages(messages, t),
          life: ToastCons.DURATION,
        })
        /// logout
      }
    },
  })

  const orgAPI = $fetch.create({
    baseURL: `${config.public.orgBaseUrl || ''}`,
    onRequest({ options }) {
      const language = useCookie(CookieCons.LANGUAGE, CookieCons.OPTION)
      let defHeaders: any = options.headers || {}
      let contentType = defHeaders['Content-Type']

      let headers: any = {
        ...(options.headers as Record<string, any>),
        Platform: 'WEB',
        Language: language.value || 'en',
        'Content-Type': contentType || 'application/json',
      }
      const accessToken = useCookie(
        CookieCons.ACCESS_TOKEN_ORG,
        CookieCons.OPTION
      )
      if (accessToken.value && accessToken.value != '') {
        headers['Authorization'] = `Bearer ${accessToken.value}`
      }
      options.headers = headers
    },

    // Optional: Add other global hooks like onResponseError
    onResponseError({ request, response, options }) {
      const data = response._data
      const messages = JSON.stringify(data.messages)

      if (response.status === APIStatusCons.BAD_REQUEST) {
        toast.add({
          severity: ToastCons.ERROR,
          summary: t('error'),
          detail: getErrorMessages(messages, t),
          life: ToastCons.DURATION,
        })
      } else if (response.status === APIStatusCons.UNAUTHORIZED) {
        toast.add({
          severity: ToastCons.ERROR,
          summary: t('error'),
          detail: getErrorMessages(messages, t),
          life: ToastCons.DURATION,
        })
        /// logout
      }
    },
  })

  // Inject the custom fetch instance globally as $apiFetch
  return {
    provide: {
      socialAPI: socialAPI,
      orgAPI: orgAPI,
    },
  }
})
