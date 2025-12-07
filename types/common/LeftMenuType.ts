import type { MenuItem } from 'primevue/menuitem'
import type { UserType } from '../social/UserType'
import type { OrgType } from '../org/org/OrgType'
export interface LeftMenuType {
  menus: MenuItem[]
  employee: any
  user: UserType | null
  org: OrgType | null
  listOrgs: OrgType[] | null
}
