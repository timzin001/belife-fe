import type { PhoneNumberType } from '../common/PhoneNumberType'

export interface CreateBranchType {
  avatarError: string
  avatar: string
  avatarFile: any
  widthAvatar: number
  heightAvatar: number
  email: string
  emailError: string
  address: {
    en: string
    vi: string
  }
  description: {
    en: string
    vi: string
  }
  addressError: string
  phoneNumber: string
  phoneNumberPattern: string
  phoneNumberPlaceHolder: string
  phoneNumberError: string
  name: {
    en: string
    vi: string
  }
  nameError: string
  dialCode: PhoneNumberType
  countries: Array<PhoneNumberType>
}
