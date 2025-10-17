import type { PhoneNumberType } from '../common/PhoneNumberType'

export interface ProfileType {
  user: any
  fullNameVisible: boolean
  addressVisible: boolean
  dateOfBirthVisible: boolean
  nickNameVisible: boolean
  passwordVisible: boolean
  descriptionVisible: boolean
  genderVisible: boolean
  phoneNumberVisible: boolean
}
export interface UpdateFullNameData {
  fullName?: string
  fullNameError?: string
  visible?: boolean
  titleDialog?: string
  loading?: boolean
}
export interface UpdateAddressData {
  address?: string
  addressError?: string
  visible?: boolean
  titleDialog?: string
  loading?: boolean
}
export interface UpdateDateOfBirthData {
  dateOfBirth?: Date | null
  dateOfBirthError?: string
  visible?: boolean
  titleDialog?: string
  loading?: boolean
}
export interface UpdateNickNameData {
  nickName?: string
  nickNameError?: string
  visible?: boolean
  titleDialog?: string
  loading?: boolean
}

export interface UpdatePasswordData {
  oldPassword?: string
  oldPasswordError?: string
  newPassword?: string
  newPasswordError?: string
  visible?: boolean
  titleDialog?: string
  loading?: boolean
}

export interface UpdateDescriptionData {
  // description?: string
  descriptionError?: string
  visible?: boolean
  titleDialog?: string
  loading?: boolean
}
export interface UpdateGenderData {
  gender?: string
  genderError?: string
  visible?: boolean
  titleDialog?: string
  loading?: boolean
}

export interface UpdatePhoneNumberData {
  dialCode?: PhoneNumberType
  visible?: boolean
  titleDialog?: string
  loading?: boolean
  countries?: Array<PhoneNumberType>

  phoneNumber?: string
  phoneNumberPattern?: string
  phoneNumberPlaceHolder?: string
  phoneNumberError?: string
}
