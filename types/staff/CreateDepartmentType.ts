import type { PaginatorType } from '../common/PaginatorType'
import type { SelectedType } from '../common/SelectedType'
export interface CreateDepartmentType {
  avatar: any
  avatarFile: any
  widthAvatar: number
  heightAvatar: number
  avatarError: string

  name: {
    en: string
    vi: string
  }
  nameError: string
  description: {
    en: string
    vi: string
  }
  department: any

  managerPage: SelectedType[]
  managerPaginator: PaginatorType
  managerVisible: boolean
  managerDisplay: SelectedType[]
  managerSelected: SelectedType[]
  managerDisplayMore: boolean
  managerAll: boolean
}
