export const setParamUrl = (query: any, route: any) => {
  navigateTo({
    path: route.path,
    query: query,
  })
}
