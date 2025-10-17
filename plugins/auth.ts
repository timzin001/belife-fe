export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      auth: () => {
        const route = useRoute()
        const str = getItem(LocalStorage.USER)

        const path = route.fullPath
        if (
          !str &&
          !path.includes(PathUser.SIGN_IN) &&
          !path.includes(PathUser.SIGN_UP) &&
          !path.includes(PathUser.VERIFICATION_CODE)
        ) {
          navigateTo({ path: PathUser.SIGN_IN })
          return
        }
        if (
          str &&
          (path.includes(PathUser.SIGN_IN) ||
            path.includes(PathUser.SIGN_UP) ||
            path.includes(PathUser.VERIFICATION_CODE))
        ) {
          navigateTo({ path: Path.HOME })
          return
        }
      },
    },
  }
})
