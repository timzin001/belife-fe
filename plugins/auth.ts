export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      auth: () => {
        const route = useRoute()
        const str = getItem(StorageCons.USER)

        const path = route.fullPath
        if (
          !str &&
          !path.includes(PathAccountSignInCons.SIGN_IN) &&
          !path.includes(PathAccountSignUpCons.SIGN_UP)
        ) {
          navigateTo({ path: PathAccountSignInCons.SIGN_IN })
          return
        }
        if (
          str &&
          (path.includes(PathAccountSignInCons.SIGN_IN) ||
            path.includes(PathAccountSignUpCons.SIGN_UP))
        ) {
          navigateTo({ path: PathCons.HOME })
          return
        }
      },
    },
  }
})
