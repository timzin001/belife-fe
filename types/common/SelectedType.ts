import type { PaginatorType } from './PaginatorType'

export interface SelectedType {
  name: {
    en: ''
    vi: ''
  }
  avatar: string
  selected: boolean
  data: any
}

export interface SelectedFilterType {
  name: string
  sortOrder: number
}

export interface SelectedDialogType {
  visible: boolean
  allSelected: SelectedType[]
  listPage: SelectedType[]
  all: boolean
  paginator: PaginatorType
}

export interface ViewSelectedDialogType {
  visible: boolean
  listPage: SelectedType[]
  paginator: PaginatorType
}
