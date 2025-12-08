import type { ObjectType } from 'typescript'
import type { MediaType } from '~/types/obj/MediaType'

export interface EmployeeType {
  id: number
  phoneNumber: string
  nickName: string
  fullName: ObjectType
  gender: ObjectType
  dateOfBirth: ObjectType
  createdAt: ObjectType
  updateAt: ObjectType | null
  role: string
  avatar: MediaType | null
  // orgs: Map<KeyType, String>
}
