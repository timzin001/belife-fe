import type { PhoneNumberType } from '../common/PhoneNumberType'

export interface SignInData {
  phoneNumber?: string
  phoneNumberPattern?: string
  phoneNumberPlaceHolder?: string
  phoneNumberError?: string
  password?: string
  passwordError?: string
  dialCode?: PhoneNumberType
  countries?: Array<PhoneNumberType>
}
