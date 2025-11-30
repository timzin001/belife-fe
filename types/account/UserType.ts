import type { MediaType } from '../obj/MediaType'
import type { ObjectType } from '../obj/ObjectType'

export interface UserType {
  id: number
  phoneNumber: string
  fullName: ObjectType
  gender: ObjectType
  dateOfBirth: ObjectType
  createdAt: ObjectType
  updateAt: ObjectType | null
  role: string
  avatar: MediaType | null
  orgs: Map<KeyType, String>
}
