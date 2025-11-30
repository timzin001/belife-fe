import type { ObjectType } from 'typescript'

export interface MediaType {
  id: number
  fileName: string
  location: string
  mimeType: string
  createdAt: ObjectType
  updatedAt: ObjectType
}
