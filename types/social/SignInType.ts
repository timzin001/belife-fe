import type { PhoneNumberType } from '../common/PhoneNumberType'

export interface SignInType {
  phoneNumber: string
  phoneNumberPattern: string
  phoneNumberPlaceHolder: string
  phoneNumberError: string
  password: string
  passwordError: string
  dialCode: PhoneNumberType
  countries: Array<PhoneNumberType>
  phoneNumberAbort: AbortController | null
  passwordAbort: AbortController | null
}
