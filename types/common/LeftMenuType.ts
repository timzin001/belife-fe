import type { MenuItem } from 'primevue/menuitem'
import type { UserType } from '../account/UserType'
export interface LeftMenuType {
  menus: MenuItem[]
  employee: any
  user: UserType | null
}
