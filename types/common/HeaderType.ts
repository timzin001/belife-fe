import type { LanguageType } from './LanguageType'

export interface HeaderType {
  listLanguages: LanguageType[]
  language: LanguageType
  searchResult: string[]
  searchValue: string
}
