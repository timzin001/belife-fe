export const GlobalStore = defineStore('global', () => {
  const loadEditor = ref(false)
  /// Limit only 4KB (4096 bytes)
  const user = useCookie(CookieStorage.USER, CookieStorage.OPTION)
  const language = useCookie(CookieStorage.LANGUAGE, CookieStorage.OPTION)
  const listOrgs = useCookie(CookieStorage.LIST_ORGS, CookieStorage.OPTION)
  const org = useCookie(CookieStorage.ORG, CookieStorage.OPTION)
  const userAuth = useCookie(CookieStorage.USER_AUTH, CookieStorage.OPTION)
  const orgAuth = useCookie(CookieStorage.ORG_AUTH, CookieStorage.OPTION)

  /// Check sign in
  function isSignIn() {
    if (userAuth.value) {
      return true
    }
    return false
  }

  /// Set user
  function setUser(value: any) {
    user.value = value
  }
  /// Get user
  function getUser() {
    return user.value
  }

  /// Set user auth
  function setUserAuth(value: any) {
    userAuth.value = value
  }
  /// Get user auth
  function getUserAuth() {
    return userAuth.value
  }

  /// Set org auth
  function setOrgAuth(value: any) {
    orgAuth.value = value
  }
  /// Get org auth
  function getOrgAuth() {
    return orgAuth.value
  }

  /// Set list orgs
  function setListOrgs(value: any) {
    listOrgs.value = value
  }
  /// Get list orgs
  function getListOrgs() {
    return listOrgs.value
  }

  /// Set org
  function setOrg(value: any) {
    org.value = value
  }
  /// Get org
  function getOrg() {
    return org.value
  }

  /// Set language
  function setLanguage(value: any) {
    language.value = value
  }
  /// Get language
  function getLanguage() {
    return language.value ?? 'en'
  }

  /// Sign out clear data
  function signOut() {
    /// Clear
    //   {user: {_id, fullname, avatar:{path}},
    //   language,
    //   organzation: {id, name, logo:{path}}
    // }

    // removeItem(LocalStorage.USER)
    // removeItem(LocalStorage.USER_AUTH)
    // removeItem(LocalStorage.ORGANIZATION_AUTH)
    // removeItem(LocalStorage.LIST_ORGANIZATIONS)
    // removeItem(LocalStorage.ORGANIZATION)
    /// Not remove language
    // removeItem(LocalStorage.LANGUAGE)
    user.value = null
    userAuth.value = null
    orgAuth.value = null
    listOrgs.value = null
    org.value = null
  }
  /// Set status loaded of editor
  function setLoadEditor(value: boolean) {
    loadEditor.value = value
  }
  /// Get status loaded of editor
  function getLoadEditor() {
    return loadEditor.value
  }

  return {
    isSignIn,
    setUser,
    getUser,
    signOut,
    setLanguage,
    getLanguage,
    setLoadEditor,
    getLoadEditor,
    setListOrgs: setListOrgs,
    getListOrganizations: getListOrgs,
    getOrg: getOrg,
    setOrg: setOrg,
    setUserAuth,
    getUserAuth,
    getOrganizationAuth: getOrgAuth,
    setOrgAuth: setOrgAuth,
  }
})
