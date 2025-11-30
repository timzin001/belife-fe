import type { MenuItem } from 'primevue/menuitem'
import type { UserType } from '../account/UserType'
export interface LeftMenuType {
  menus: MenuItem[]
  org: any
  selectOrg: any
  listOrgs: []
  user: UserType | null
}
