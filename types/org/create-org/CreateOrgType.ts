import type { PhoneNumberType } from '../../common/PhoneNumberType'

export interface CreateOrgType {
  avatarOfOrg: string
  avatarFileOfOrg: any
  widthAvatarOfOrg: number
  heightAvatarOfOrg: number
  avatarOfOrgError: string
  avatarOfBranch: string
  avatarFileOfBranch: any
  widthAvatarOfBranch: number
  heightAvatarOfBranch: number
  avatarOfBranchError: string
  nameOfOrg: string
  nameOfOrgError: string
  sloganOfOrg: string
  sloganOfOrgError: string
  fieldsOfOrg: string
  fieldsOfOrgError: string
  descriptionOfOrg: string
  descriptionOfBranch: string
  nameOfBranch: string
  nameOfBranchError: string
  emailOfBranch: string
  emailOfBranchError: string
  addressOfBranch: string
  addressOfBranchError: string
  sizeOfOrg: number
  sizeOfOrgError: string
  phoneNumberOfBranch: string
  phoneNumberOfBranchPattern: string
  phoneNumberOBranchPlaceHolder: string
  phoneNumberOfBranchError: string
  icon: any
  dialCode: PhoneNumberType
  countries: Array<PhoneNumberType>
  locale: string
  minFractionDigits: number
  org: any
  agree: boolean
  nameOfOrgAbort: AbortController | null
  phoneNumberOfBranchAbort: AbortController | null
  emailOfBranchAbort: AbortController | null

  // const controller = new AbortController();
}
