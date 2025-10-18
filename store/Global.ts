export const GlobalStore = defineStore('global', () => {
  const loadEditor = ref(false)
  /// Limit only 4KB (4096 bytes)
  const account = useCookie(CookieStorage.ACCOUNT, CookieStorage.OPTION)
  const language = useCookie(CookieStorage.LANGUAGE, CookieStorage.OPTION)
  const org = useCookie(CookieStorage.ORG, CookieStorage.OPTION)

  /// Set account
  function setAccount(value: any) {
    account.value = value
  }
  /// Get account
  function getAccount() {
    return account.value
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
    account.value = null
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
    setAccount,
    getAccount,
    signOut,
    setLanguage,
    getLanguage,
    setLoadEditor,
    getLoadEditor,
    getOrg: getOrg,
    setOrg: setOrg,
  }
})
