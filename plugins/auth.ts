export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      auth: () => {
        const route = useRoute()
        const str = getItem(StorageCons.USER)

        const path = route.fullPath
        if (
          !str &&
          !path.includes(PathAccountCons.SIGN_IN) &&
          !path.includes(PathAccountCons.SIGN_UP)
        ) {
          navigateTo({ path: PathAccountCons.SIGN_IN })
          return
        }
        if (
          str &&
          (path.includes(PathAccountCons.SIGN_IN) ||
            path.includes(PathAccountCons.SIGN_UP))
        ) {
          navigateTo({ path: PathCons.HOME })
          return
        }
      },
    },
  }
})
