import type { ObjectType } from 'typescript'
import type { MediaType } from '~/types/obj/MediaType'

export interface OrgType {
  id: number
  name: ObjectType
  slogan: ObjectType
  fields: ObjectType
  active: ObjectType
  avatar: MediaType | null
  createdAt: ObjectType
  updateAt: ObjectType | null
  size: number
}
