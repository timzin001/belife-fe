import type { UseFetchOptions } from 'nuxt/app'
// import { GlobalStore } from '~/store/Global'
// const store = GlobalStore()

const CallAPI = (
  url: string | (() => string),
  options: UseFetchOptions<null> = {},
  toast: any,
  t: any,
  isOrg = true,
  isMultipart = false
) => {
  const customFetch = $fetch.create({
    // baseURL: 'https://soivip-api.com/api/v1/',
    baseURL: 'http://localhost:3001/api/v1/',
    onRequest({ options }) {
      const language = useCookie(CookieStorage.LANGUAGE, CookieStorage.OPTION)

      let headers: any = {
        'Accept-Language': language.value ?? 'en',
        'Content-Type': 'application/json',
        'Accept-Type': 'web',
      }
      if (isMultipart) {
        delete headers['Content-Type']
        // headers['Content-Type'] = 'multipart/form-data'
      }
      if (isOrg) {
        const auth = useCookie(CookieStorage.ORG_AUTH, CookieStorage.OPTION)
        if (auth.value && auth.value != '') {
          headers.Authorization = `Bearer ${auth.value}`
        }
      } else {
        const auth = useCookie(CookieStorage.USER_AUTH, CookieStorage.OPTION)
        if (auth.value && auth.value != '') {
          headers.Authorization = `Bearer ${auth.value}`
        }
      }
      options.headers = headers
    },
    onResponse({ response }) {
      // console.info('onResponse ', {
      //   endpoint: response.url,
      //   status: response?.status,
      // })
      // statusCode
    },
    onResponseError({ response }) {
      const data = response._data
      const messages = JSON.stringify(data.messages)

      console.log(messages)
      console.log(response.status)
      if (response.status === 400) {
        toast.add({
          severity: Toast.ERROR,
          summary: t('error'),
          detail: getErrorMessages(messages, t),
          life: Toast.DURATION,
        })
      } else if (response.status === 401) {
        toast.add({
          severity: Toast.ERROR,
          summary: t('error'),
          detail: getErrorMessages(messages, t),
          life: Toast.DURATION,
        })
        /// logout
      }
    },
  })

  return useFetch(url, {
    ...options,
    $fetch: customFetch,
  })
}

export default CallAPI
