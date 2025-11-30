export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      auth: () => {
        const route = useRoute()
        const str = getItem(StorageCons.USER)

        const path = route.fullPath
        if (
          !str &&
          !path.includes(PathSocialSignInCons.SIGN_IN) &&
          !path.includes(PathSocialSignUpCons.SIGN_UP)
        ) {
          navigateTo({ path: PathSocialSignInCons.SIGN_IN })
          return
        }
        if (
          str &&
          (path.includes(PathSocialSignInCons.SIGN_IN) ||
            path.includes(PathSocialSignUpCons.SIGN_UP))
        ) {
          navigateTo({ path: PathCons.HOME })
          return
        }
      },
    },
  }
})
