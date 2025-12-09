import type { PhoneNumberType } from '~/types/common/PhoneNumberType'

export interface CreateBranchType {
  visible: boolean
  loading: boolean
  name: string | null
  nameError: string | null
  email: string | null
  emailError: string | null
  description: string | null
  active: boolean
  avatar: any | null
  avatarFile: any | null
  widthAvatar: number | null
  heightAvatar: number | null
  avatarError: string | null
  branch: any
  nameAbort: any
  phoneNumberAbort: any
  emailAbort: any
  dialCode: PhoneNumberType
  countries: Array<PhoneNumberType>
  phoneNumberPattern: string
  phoneNumberPlaceHolder: string
  phoneNumber: string | null
  phoneNumberError: string | null
  addressError: string | null
  address: string | null
}
