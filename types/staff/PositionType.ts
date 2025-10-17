export interface OptionType {
  title: string
  value: boolean
}

export interface PositionFilterType {
  all: string
  name: string
  description: string
  creator: string
  using: string
  active: OptionType | null
  lastUpdater: string
  createdAt: []
  createdAtTemp: []
  createdAtString: string
  updatedAt: []
  updatedAtTemp: []
  updatedAtString: string
  sortField: string
}
