import type { PhoneNumberType } from '../common/PhoneNumberType'

export interface PricingType {
  members?: number
  price?: number
  textChoose?: string
  textInfo?: string
}

export interface CreateOrganizationType {
  logoOfOrganization?: string
  logoFileOfOrg?: any
  widthLogoOfOrganization?: number
  heightLogoOfOrganization?: number
  logoOfOrganizationError?: string
  avatarOfBranch?: string
  avatarFileOfBranch?: any
  widthAvatarOfBranch?: number
  heightAvatarOfBranch?: number
  avatarOfBranchError?: string
  nameOfOrg?: string
  nameOfOrgError?: string
  sloganOfOrg?: string
  sloganOfOrganizationError?: string
  fieldsOfOrg?: string
  fieldsOfOrganizationError?: string
  descriptionOfOrg?: string
  descriptionOfBranch?: string
  nameOfBranch?: string
  nameOfBranchError?: string
  emailOfBranch?: string
  emailOfBranchError?: string
  addressOfBranch?: string
  addressOfBranchError?: string
  sizeOfOrg?: number
  sizeOfOrganizationError?: string
  phoneNumberOfBranch?: string
  phoneNumberOfBranchPattern?: string
  phoneNumberOBranchPlaceHolder?: string
  phoneNumberOfBranchError?: string
  icon?: any
  dialCode?: PhoneNumberType
  countries?: Array<PhoneNumberType>
  locale: string
  minFractionDigits: number
  org: any
}
