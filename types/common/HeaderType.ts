import type { LanguageType } from './LanguageType'

export interface HeaderType {
  listLanguages?: Array<LanguageType>
  language?: LanguageType
  searchResult?: Array<string>
  searchValue?: string
}
