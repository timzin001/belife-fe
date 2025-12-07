import { value } from '@primeuix/themes/aura/knob'
import type { OrgType } from '~/types/org/org/OrgType'
import type { UserType } from '~/types/social/UserType'

export const GlobalStore = defineStore('global', () => {
  const loadEditor = ref(false)
  /// Limit only 4KB (4096 bytes)
  const accessTokenUser = useCookie(
    CookieCons.ACCESS_TOKEN_USER,
    CookieCons.OPTION
  )
  const refreshTokenUser = useCookie(
    CookieCons.REFRESH_TOKEN_USER,
    CookieCons.OPTION
  )
  const accessTokenEmployee = useCookie(
    CookieCons.ACCESS_TOKEN_EMPLOYEE,
    CookieCons.OPTION
  )
  const refreshTokenEmployee = useCookie(
    CookieCons.REFRESH_TOKEN_EMPLOYEE,
    CookieCons.OPTION
  )
  const user = useCookie<UserType | null>(CookieCons.USER, CookieCons.OPTION)
  const language = useCookie<string>(CookieCons.LANGUAGE, CookieCons.OPTION)
  const employee = useCookie(CookieCons.EMPLOYEE, CookieCons.OPTION)
  const org = useCookie<OrgType | null>(CookieCons.ORG, CookieCons.OPTION)
  const listOrgs = useCookie<OrgType[] | null>(
    CookieCons.LIST_ORGS,
    CookieCons.OPTION
  )

  function setAccessTokenUser(value: string) {
    accessTokenUser.value = value
  }
  function getAccessTokenUser(): string | null {
    return accessTokenUser.value || null
  }

  function setRefreshTokenUser(value: string) {
    refreshTokenUser.value = value
  }
  function getRefreshTokenUser(): string | null {
    return refreshTokenUser.value || null
  }

  function setUser(value: UserType) {
    user.value = value
  }

  function getUser(): UserType | null {
    return user.value
  }

  function setOrg(value: OrgType) {
    org.value = value
  }

  function getOrg(): OrgType | null {
    return org.value
  }

  function setListOrgs(value: any) {
    listOrgs.value = value
  }

  function getListOrgs(): any | null {
    return listOrgs.value
  }

  function setAccessTokenEmployee(value: string) {
    accessTokenEmployee.value = value
  }
  function getAccessTokenEmployee(): string | null {
    return accessTokenEmployee.value || null
  }

  function setRefreshTokenEmployee(value: string) {
    refreshTokenEmployee.value = value
  }
  function getRefreshTokenEmployee(): string | null {
    return refreshTokenUser.value || null
  }

  function setEmployee(value: any) {
    employee.value = value
  }
  function getEmployee() {
    return employee.value
  }

  /// Set language
  function setLanguage(value: string) {
    language.value = value
  }
  /// Get language
  function getLanguage(): string {
    return language.value || 'en'
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
    // account.value = null
    employee.value = null
    user.value = null
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
    setAccessTokenUser,
    getAccessTokenUser,
    setRefreshTokenUser,
    getRefreshTokenUser,
    setUser,
    getUser,

    setAccessTokenEmployee,
    getAccessTokenEmployee,
    setRefreshTokenEmployee,
    getRefreshTokenEmployee,
    getEmployee,
    setEmployee,

    setOrg,
    getOrg,
    setListOrgs,
    getListOrgs,

    signOut,
    setLanguage,
    getLanguage,
    setLoadEditor,
    getLoadEditor,
  }
})
