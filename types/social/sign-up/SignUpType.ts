import type { PhoneNumberType } from '../../common/PhoneNumberType'

export interface SignUpType {
  phoneNumber: string
  phoneNumberPattern: string
  phoneNumberPlaceHolder: string
  phoneNumberError: string
  password: string
  passwordError: string
  fullName: string
  fullNameError: string
  dateOfBirth: Date
  dateOfBirthError: string
  dateFormat: string
  datePlaceHolder: string
  gender: string
  genderError: string
  minDate: Date
  maxDate: Date
  dialCode: PhoneNumberType
  countries: Array<PhoneNumberType>
  termsPrivacy: any
  termsPrivacyError: string
  phoneNumberAbort: AbortController | null
}
