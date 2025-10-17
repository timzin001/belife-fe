import type { PaginatorType } from '../common/PaginatorType'
import type { SelectedType } from '../common/SelectedType'

export interface CreateEmployeeType {
  avatar: string
  //// New
  user: any
  userCode: string
  userCodeError: string

  positionPage: SelectedType[]
  positionPaginator: PaginatorType
  positionVisible?: boolean
  positionSelected: SelectedType[]
  positionDisplay: SelectedType[]
  positionDisplayMore: boolean
  positionAll: boolean
  positionError: string

  branchPage: SelectedType[]
  branchPaginator: PaginatorType
  branchVisible: boolean
  branchDisplay: SelectedType[]
  branchSelected: SelectedType[]
  branchDisplayMore: boolean
  branchAll: boolean
  branchError: string

  departmentPage: SelectedType[]
  departmentPaginator: PaginatorType
  departmentVisible: boolean
  departmentDisplay: SelectedType[]
  departmentSelected: SelectedType[]
  departmentDisplayMore: boolean
  departmentAll: boolean
  departmentError: string

  description: {
    en: string
    vi: string
  }
  startDateOfWork: Date
  startDateOfWorkError: string
  endDateOfWork: Date
  currentDate: Date
  dateFormat: string
  datePlaceHolder: string

  informTitle: string
  informVisible: boolean
  informTrack: any
  informMessage: string

  viewVisible: boolean
  viewPage: SelectedType[]
  viewPaginator: PaginatorType
  viewHeaderName: string
  viewTitle: string
  viewTrackType: string
  viewLimit: number
  viewOffset: number
}
