import { useToast } from 'primevue/usetoast'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.component('Toast', Toast)
  const toast = useToast()
  nuxtApp.provide('toast', toast)

  const config = useRuntimeConfig()
  const t = nuxtApp.vueApp.config.globalProperties.$t

  const socialAPI = async (
    url: string,
    optionsParams = { headers: { 'Content-Type': 'application/json' } }
  ) => {
    const api = $fetch.create({
      baseURL: `${config.public.accountBaseUrl || ''}`,
      onRequest({ options }) {
        const language = useCookie<string>(
          CookieCons.LANGUAGE,
          CookieCons.OPTION
        )
        let defHeaders: any = options.headers || {}
        let contentType = defHeaders['Content-Type']

        let headers: any = {
          ...(options.headers as Record<string, any>),
          Platform: 'WEB',
          Language: language.value || 'en',
          'Content-Type': contentType || 'application/json',
        }

        if (contentType == 'no-content-type') {
          delete headers['Content-Type']
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

          navigateTo({
            path: PathSocialSignInCons.SIGN_IN,
            replace: true,
          })
        }
      },
    })
    return await api(url, optionsParams)
  }

  const orgAPI = async (
    url: string,
    optionsParams = { headers: { 'Content-Type': 'application/json' } }
  ) => {
    const api = $fetch.create({
      baseURL: `${config.public.orgBaseUrl || ''}`,
      onRequest({ options }) {
        const language = useCookie(CookieCons.LANGUAGE, CookieCons.OPTION)
        const pHeader = optionsParams.headers
        let contentType
        if (pHeader) {
          contentType = pHeader['Content-Type']
        }

        let headers: any = {
          Platform: 'WEB',
          Language: language.value || 'en',
          'Content-Type': contentType || 'application/json',
        }
        if (contentType == 'no-content-type') {
          delete headers['Content-Type']
        }
        const accessToken = useCookie(
          CookieCons.ACCESS_TOKEN_EMPLOYEE,
          CookieCons.OPTION
        )
        const userAccessToken = useCookie(
          CookieCons.ACCESS_TOKEN_USER,
          CookieCons.OPTION
        )
        if (accessToken.value && accessToken.value != '') {
          headers['Authorization'] = `Bearer ${accessToken.value}`
        }
        if (userAccessToken.value && userAccessToken.value != '') {
          headers['UserAuthorization'] = `Bearer ${userAccessToken.value}`
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
          navigateTo({
            path: PathSocialSignInCons.SIGN_IN,
            replace: true,
          })
        }
      },
    })
    return await api(url, optionsParams)
  }

  // Inject the custom fetch instance globally as $apiFetch
  return {
    provide: {
      socialAPI: socialAPI,
      orgAPI: orgAPI,
    },
  }
})
