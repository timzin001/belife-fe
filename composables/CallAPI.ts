import type { ToastServiceMethods } from 'primevue'

const CallAPI = (
  url: string | (() => string),
  options = {},
  toast: ToastServiceMethods,
  t: any,
  beType: string,
  isMultipart = false
) => {
  let baseURL

  const customFetch = $fetch.create({
    baseURL: baseURL,
    onRequest({ options }) {
      const language = useCookie(CookieCons.LANGUAGE, CookieCons.OPTION)

      let headers: any = {
        'Accept-Language': language.value ?? 'en',
        'Content-Type': 'application/json',
        'Accept-Type': 'web',
      }
      if (isMultipart) {
        delete headers['Content-Type']
        // headers['Content-Type'] = 'multipart/form-data'
      }
      // if (beType == BETYPE.ACCOUNT) {
      //   const refValue = useCookie(CookieCons.ACCOUNT, CookieCons.OPTION)
      //   if (refValue.value && refValue.value != '') {
      //     const account: any = refValue.value
      //     headers.Authorization = `Bearer ${account.webAuth?.token}`
      //   }
      // } else if (beType == BETYPE.ORG) {
      //   const auth = useCookie(CookieCons.ORG_AUTH, CookieCons.OPTION)
      //   if (auth.value && auth.value != '') {
      //     headers.Authorization = `Bearer ${auth.value}`
      //   }
      // }
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
