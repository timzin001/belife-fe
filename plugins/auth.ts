export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      auth: () => {
        const route = useRoute()
        const str = getItem(LocalStorage.USER)

        const path = route.fullPath
        if (
          !str &&
          !path.includes(PathAccount.SIGN_IN) &&
          !path.includes(PathAccount.SIGN_UP)
        ) {
          navigateTo({ path: PathAccount.SIGN_IN })
          return
        }
        if (
          str &&
          (path.includes(PathAccount.SIGN_IN) ||
            path.includes(PathAccount.SIGN_UP))
        ) {
          navigateTo({ path: Path.HOME })
          return
        }
      },
    },
  }
})
