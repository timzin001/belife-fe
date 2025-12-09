<template>
  <div class="page">
    <div class="w-full card rounded-[8px] p-[5px] flex flex-col">
      <div class="table-wrapper flex-1">
        <DataTable
          :value="instance.list"
          scrollable
          class="table-data"
          :paginator="false"
          lazy
          :rows="10"
          :loading="instance.loading"
          stripedRows
          dataKey="id"
          @sort="clickSort"
          selectionMode="single"
          filterDisplay="row"
          resizableColumns
          removableSort
          columnResizeMode="expand"
          tableStyle="min-width: 200px"
        >
          <template #header>
            <div class="flex filter">
              <div class="flex-1"></div>
              <div class="flex input-action items-center justify-end">
                <div class="flex col-search">
                  <MultiSelect
                    class="w-[300px]"
                    :maxSelectedLabels="2"
                    :modelValue="selectedColumns"
                    :options="columns"
                    optionLabel="header"
                    @update:modelValue="changeColumns"
                    display="chip"
                    :placeholder="$t('select_columns')"
                    :selectedItemsLabel="getItemLabel()"
                  />

                  <div class="search relative">
                    <img
                      :src="Search"
                      class="w-[18px] icon"
                      @click="clearFilterName"
                    />
                    <InputText
                      class="w-full h-[32px] input"
                      v-model="filters.all"
                      autocomplete="off"
                      @input="executeFilter()"
                      :placeholder="$t('searching_dot')"
                    />
                    <div class="clear" v-if="filters.all">
                      <img
                        :src="Times"
                        class="w-[14px] icon"
                        @click="clearFilterName"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  @click="clickCreate()"
                  :label="$t('create')"
                  class="w-[90px] h-[32px] ml-[10px]"
                  icon="pi pi-plus"
                ></Button>
              </div>
            </div>
          </template>
          <template #empty
            >{{ t('the_system_did_not_find_any_data') }}
          </template>
          <Column
            field="no"
            :header="$t('no')"
            :showFilterMenu="false"
            :sortable="false"
            style="min-width: 50px"
          >
            <template #body="{ data }">
              <div class="flex items-center">
                <span>{{ data.no }}</span>
              </div>
            </template>
          </Column>
          <Column
            field="name"
            :header="$t('name')"
            :showFilterMenu="false"
            :sortable="true"
            style="min-width: 200px"
          >
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <img
                  :alt="data.name[locale]"
                  :src="`${data.avatar.location}`"
                  style="width: 32px"
                  class="avatar"
                />

                <span>{{ data.name[locale] ?? '' }}</span>
              </div>
            </template>
            <template #filter>
              <div class="filter">
                <InputText
                  v-model="filters.name"
                  type="text"
                  class="w-full"
                  @input="executeFilter()"
                  :placeholder="$t('searching_dot')"
                />
                <div class="clear" v-if="filters.name">
                  <img
                    :src="Times"
                    class="w-[14px] icon"
                    @click="clearFilterName"
                  />
                </div>
              </div>
            </template>
          </Column>
          <Column
            field="description"
            :header="$t('description')"
            :showFilterMenu="false"
            style="min-width: 200px"
            sortable
          >
            <template #body="{ data }">
              <div class="flex items-center">
                <span>{{ data.description[locale] ?? '' }}</span>
              </div>
            </template>
            <template #filter>
              <div class="filter">
                <InputText
                  v-model="filters.description"
                  type="text"
                  class="w-full"
                  @input="executeFilter()"
                  :placeholder="$t('searching_dot')"
                />
                <div class="clear" v-if="filters.description">
                  <img
                    :src="Times"
                    class="w-[14px] icon"
                    @click="clearFilterDescription"
                  />
                </div>
              </div>
            </template>
          </Column>
          <Column
            field="using"
            :header="$t('using')"
            style="min-width: 200px"
            sortable
            :showFilterMenu="false"
          >
            <template #body="{ data }">
              <div class="flex items-center">
                <span>{{ (data.countUsing ?? []).length }}</span>
              </div>
            </template>
            <template #filter>
              <div class="filter">
                <InputText
                  v-model="filters.using"
                  type="text"
                  class="w-full"
                  @input="executeFilter()"
                  v-keyfilter="/^[0-9]*$/"
                  autocomplete="off"
                  :placeholder="$t('searching_dot')"
                />
                <div class="clear" v-if="filters.using">
                  <img
                    :src="Times"
                    class="w-[14px] icon"
                    @click="clearFilterUsing"
                  />
                </div>
              </div>
            </template>
          </Column>
          <Column
            field="active"
            :header="$t('status')"
            :showFilterMenu="false"
            style="min-width: 200px"
            sortable
          >
            <template #body="{ data }">
              <div class="flex items-center">
                <Tag
                  :value="data.active[locale]"
                  :severity="data.active.value ? 'success' : 'danger'"
                />
              </div>
            </template>
            <template #filter>
              <div class="filter">
                <Select
                  v-model="filters.active"
                  :placeholder="$t('select_dot')"
                  @change="executeFilter"
                  :options="statusOption"
                  class="w-full"
                  style="min-width: 200px"
                >
                  <template #value="slotProps">
                    <div
                      v-if="slotProps.value"
                      class="flex items-center h-full pl-[5px]"
                    >
                      <Tag
                        :value="slotProps.value.title"
                        :severity="slotProps.value.value ? 'success' : 'danger'"
                      />
                    </div>
                    <div class="flex items-center h-full pl-[15px]" v-else>
                      {{ slotProps.placeholder }}
                    </div>
                  </template>
                  <template #option="slotProps">
                    <div class="flex items-center h-full pl-[5px]">
                      <Tag
                        :value="slotProps.option.title"
                        :severity="
                          slotProps.option.value ? 'success' : 'danger'
                        "
                      />
                    </div>
                  </template>
                </Select>
                <div class="clear" v-if="filters.active">
                  <img
                    :src="Times"
                    class="w-[14px] icon"
                    @click="clearFilterStatus"
                  />
                </div>
              </div>
            </template>
          </Column>
          <Column
            v-if="isShowColumn('creator')"
            field="creator"
            :header="$t('creator')"
            style="min-width: 200px"
            :showFilterMenu="false"
            sortable
          >
            <template #body="{ data }">
              <div class="flex items-center gap-2" v-if="data.creator">
                <img
                  :alt="data.creator?.fullName ?? ''"
                  :src="
                    data.creator?.avatar?.location
                      ? `${data.creator?.avatar?.location}`
                      : DefaultAvatar
                  "
                  style="width: 32px"
                  class="avatar"
                />
                <span>{{ data.creator?.fullName[locale] ?? '' }}</span>
              </div>
            </template>
            <template #filter>
              <div class="filter">
                <InputText
                  v-model="filters.creator"
                  type="text"
                  class="w-full"
                  @input="executeFilter()"
                  :placeholder="$t('searching_dot')"
                />
                <div class="clear" v-if="filters.creator">
                  <img
                    :src="Times"
                    class="w-[14px] icon"
                    @click="clearFilterCreator"
                  />
                </div>
              </div>
            </template>
          </Column>

          <Column
            v-if="isShowColumn('lastUpdater')"
            field="lastUpdater"
            :header="$t('last_updater')"
            style="min-width: 200px"
            :showFilterMenu="false"
            sortable
          >
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <img
                  v-if="data.lastUpdater"
                  :alt="data.lastUpdater?.fullName ?? ''"
                  :src="
                    data.lastUpdater?.avatar?.location
                      ? `${data.lastUpdater?.avatar?.location}`
                      : DefaultAvatar
                  "
                  style="width: 32px"
                  class="avatar"
                />
                <span>{{ data.lastUpdater?.fullName ?? '' }}</span>
              </div>
            </template>
            <template #filter>
              <div class="filter">
                <InputText
                  v-model="filters.lastUpdater"
                  type="text"
                  class="w-full"
                  @input="executeFilter()"
                  :placeholder="$t('searching_dot')"
                />
                <div class="clear" v-if="filters.lastUpdater">
                  <img
                    :src="Times"
                    class="w-[14px] icon"
                    @click="clearFilterLastUpdater"
                  />
                </div>
              </div>
            </template>
          </Column>
          <Column
            v-if="isShowColumn('createdAt')"
            field="createdAt"
            :header="$t('created_at')"
            style="min-width: 200px"
            sortable
            :showFilterMenu="false"
          >
            <template #body="{ data }">
              <div class="flex items-center">
                <span>{{
                  formatDateTimeFromString(
                    data.createdAt.value ?? '',
                    store.getLanguage()
                  )
                }}</span>
              </div>
            </template>

            <template #filter>
              <div class="filter">
                <InputText
                  ref="dateInput"
                  @input="inputCreatedAt"
                  v-model="filters.createdAtString"
                  :placeholder="$t('searching_dot')"
                  @focus="showOrHideCreatedAt"
                />
                <div class="clear" v-if="filters.createdAt?.length">
                  <img
                    :src="Times"
                    class="w-[14px] icon"
                    @click="clearFilterCreatedAt"
                  />
                </div>
                <OverlayPanel
                  class="postions-of-org-created-at"
                  ref="createdAtViewFilter"
                  @show="eventShowCreatedAt"
                  @hide="eventHideCreatedAt"
                >
                  >
                  <template #container>
                    <DatePicker
                      selectionMode="range"
                      inline
                      v-model="filters.createdAtTemp"
                    >
                      <template #footer>
                        <div
                          class="flex items-center justify-end w-full pt-[10px]"
                        >
                          <Button
                            @click="clickCreatedAtCancel"
                            severity="warn"
                            icon="pi pi-times"
                            :label="$t('cancel')"
                            class="h-[28px]"
                          >
                          </Button>
                          <Button
                            :label="$t('search')"
                            icon="pi pi-search"
                            class="h-[28px] ml-[20px]"
                            @click="clickCreatedAtSearch"
                          >
                          </Button>
                        </div>
                      </template>
                    </DatePicker>
                  </template>
                </OverlayPanel>
              </div>
            </template>
          </Column>
          <Column
            v-if="isShowColumn('updatedAt')"
            field="updatedAt"
            :header="$t('updated_at')"
            style="min-width: 200px"
            sortable
            :showFilterMenu="false"
          >
            <template #body="{ data }">
              <div class="flex items-center">
                <span>{{
                  formatDateTimeFromString(
                    data.updatedAt ?? '',
                    store.getLanguage()
                  )
                }}</span>
              </div>
            </template>

            <template #filter>
              <div class="filter">
                <InputText
                  ref="dateInput"
                  v-model="filters.updatedAtString"
                  :placeholder="$t('searching_dot')"
                  @input="inputUpdatedAt"
                  @focus="showOrHideUpdatedAt"
                />
                <div class="clear" v-if="filters.updatedAt?.length">
                  <img
                    :src="Times"
                    class="w-[14px] icon"
                    @click="clearFilterUpdatedAt"
                  />
                </div>
                <OverlayPanel
                  class="postions-of-org-updated-at"
                  ref="updatedAtViewFilter"
                  @show="eventShowUpdatedAt"
                  @hide="eventHideUpdatedAt"
                >
                  >
                  <template #container>
                    <DatePicker
                      selectionMode="range"
                      inline
                      v-model="filters.updatedAtTemp"
                    >
                      <template #footer>
                        <div
                          class="flex items-center justify-end w-full pt-[10px]"
                        >
                          <Button
                            @click="clickUpdatedAtCancel"
                            severity="warn"
                            icon="pi pi-times"
                            :label="$t('cancel')"
                            class="h-[28px]"
                          >
                          </Button>
                          <Button
                            :label="$t('search')"
                            icon="pi pi-search"
                            class="h-[28px] ml-[20px]"
                            @click="clickUpdatedAtSearch"
                          >
                          </Button>
                        </div>
                      </template>
                    </DatePicker>
                  </template>
                </OverlayPanel>
              </div>
            </template>
          </Column>
          <Column style="min-width: 100px">
            <template #body="slotProps">
              <div class="flex">
                <div rounded class="mr-2" @click="clickEdit(slotProps.data)">
                  <img class="w-[15px] h-[15px] pencil" :src="Pencil" />
                </div>
                <!-- <div rounded class="mr-2" @click="clickRemove(slotProps.data)">
                <img class="w-[15px] h-[15px] trash" :src="Trash" />
              </div> -->
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="paginator-wrapper">
        <Paginator
          :rows="10"
          @page="onChangePage"
          :totalRecords="instance.total"
          :rowsPerPageOptions="[10, 20, 30]"
        ></Paginator>
      </div>
      <CreateUpdateDialog
        :title="instance.titleDialog"
        :visible="instance.visibleDialog"
        @click-ok="clickOkDialog"
        @click-close="clickCloseDialog"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/// Import
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { GlobalStore } from '~/store/Global'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import Pencil from '~/assets/icons/pencil.svg'
import Trash from '~/assets/icons/trash.svg'
import Search from '~/assets/icons/search.svg'
import Times from '~/assets/icons/times.svg'
import type { PositionFilterType } from '~/types/staff/PositionType'
import type { PositionsType } from '~/types/org/positions/PositionsType'
import type { HeaderColumnType } from '~/types/common/HeaderColumnType'
import CreateUpdateDialog from './components/create-update-dialog.vue'

/// Define
const store = GlobalStore()
const toast = useToast()
const { t, locale } = useI18n()
const route = useRoute()

const selectedData = ref()
const createdAtViewFilter = ref()
const createdAtViewStatus = ref()
const updatedAtViewFilter = ref()
const updatedAtViewStatus = ref()
const instance = ref<PositionsType>({
  visibleDialog: false,
  titleDialog: '',
  list: [],
  total: 0,
  limit: 10,
  offset: 0,
  loading: false,
})
const columns = ref(<HeaderColumnType[]>[
  { field: 'creator', header: t('creator') },
  { field: 'lastUpdater', header: t('last_updater') },
  { field: 'createdAt', header: t('created_date') },
  { field: 'updatedAt', header: t('updated_date') },
])
const selectedColumns = ref(<HeaderColumnType[]>[])
const statusOption = ref([
  { title: t('active'), value: true },
  { title: t('inactive'), value: false },
])
const filters = ref(<PositionFilterType>{})
const datePattern = ref('yy/mm/dd')

/// Method
/// Change page
const onChangePage = (val: any) => {
  console.log(`onChangePage ${val}`)
  console.log(val)

  instance.value.offset = val.page * instance.value.limit
  const query = getSearchQuery()
  getListData(query)
}

/// Change columns
const changeColumns = (val: any) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col))
}

const getItemLabel = () => {
  let mSelected = t('columns_selected').toLocaleLowerCase()
  return `${selectedColumns.value.length} ${mSelected}`
}

/// Show or hide column
const isShowColumn = (value: string) => {
  let list = selectedColumns.value.filter((col) => {
    return value.includes(col.field)
  })
  if (list.length) {
    return true
  }
  return false
}

/// Click sort
const clickSort = (event: any) => {
  if (filters.value.sortField === event.sortField) {
    filters.value.sortField = `-${event.sortField}`
  } else {
    filters.value.sortField = event.sortField
  }
  setParamAndGetListData()
}

/// Click updated at cancel
const clickUpdatedAtCancel = (evt: any) => {
  if (updatedAtViewStatus.value) {
    updatedAtViewFilter.value.toggle(false)
  } else {
    updatedAtViewFilter.value.toggle(true)
  }
}

/// Show or hide updated at
const showOrHideUpdatedAt = (event: any) => {
  updatedAtViewFilter.value.toggle(event)
}

/// Click updated at search
const clickUpdatedAtSearch = (evt: any) => {
  if (updatedAtViewStatus.value) {
    updatedAtViewFilter.value.toggle(false)
  } else {
    updatedAtViewFilter.value.toggle(true)
  }
  /// Keep date is selected
  filters.value.updatedAt = filters.value.updatedAtTemp
  /// Show value
  filters.value.updatedAtString = convertDatesToString(
    filters.value.updatedAtTemp,
    store.getLanguage()
  )

  setParamAndGetListData()
}

/// Show or hide created at
const showOrHideCreatedAt = (event: any) => {
  createdAtViewFilter.value.toggle(event)
}

/// Click created at cancel
const clickCreatedAtCancel = (evt: any) => {
  if (createdAtViewStatus.value) {
    createdAtViewFilter.value.toggle(false)
  } else {
    createdAtViewFilter.value.toggle(true)
  }
}
/// Click created at search
const clickCreatedAtSearch = (evt: any) => {
  if (createdAtViewStatus.value) {
    createdAtViewFilter.value.toggle(false)
  } else {
    createdAtViewFilter.value.toggle(true)
  }
  /// Keep date is selected
  filters.value.createdAt = filters.value.createdAtTemp
  /// Show value
  filters.value.createdAtString = convertDatesToString(
    filters.value.createdAtTemp,
    store.getLanguage()
  )
  setParamAndGetListData()
}

/// Set param to url and get list data
const setParamAndGetListData = () => {
  const query = getSearchQuery()
  setParamUrl(query, route)
  getListData(query)
}

/// Event show updated at
const eventShowUpdatedAt = () => {
  updatedAtViewStatus.value = true
}
/// Event hide updated at
const eventHideUpdatedAt = () => {
  updatedAtViewStatus.value = false
  filters.value.updatedAtTemp = filters.value.updatedAt
}
/// Event show created at
const eventShowCreatedAt = () => {
  createdAtViewStatus.value = true
}
/// Event hide created at
const eventHideCreatedAt = () => {
  createdAtViewStatus.value = false
  filters.value.createdAtTemp = filters.value.createdAt
}

/// Execute filter data
const executeFilter = () => {
  setParamAndGetListData()
}
/// Clear fitler description
const clearFilterDescription = () => {
  filters.value.description = ''
  executeFilter()
}
/// Clear fitler status
const clearFilterStatus = () => {
  filters.value.active = null
  executeFilter()
}
/// Clear fitler last updater
const clearFilterLastUpdater = () => {
  filters.value.lastUpdater = ''
  executeFilter()
}
/// Clear fitler using
const clearFilterUsing = () => {
  filters.value.using = ''
  executeFilter()
}

/// Clear fitler title
const clearFilterName = () => {
  filters.value.name = ''
  executeFilter()
}
/// Clear filter create at
const clearFilterCreatedAt = () => {
  clearCreatedAt()
  executeFilter()
}
/// Clear filter updated at
const clearFilterUpdatedAt = () => {
  clearUpdatedAt()
  executeFilter()
}
/// Clear fitler creator
const clearFilterCreator = () => {
  filters.value.creator = ''
  executeFilter()
}

/// Click edit
const clickEdit = (data: any) => {
  selectedData.value = data
}
/// Click create position
const clickCreate = async () => {
  /// Move to add
  // await navigateTo({ path: PathStaff.CREATE_POSITION })
  instance.value.visibleDialog = true
}
/// Get search query
const getSearchQuery = () => {
  let result: any = {
    limit: instance.value.limit,
    offset: instance.value.offset,
  }
  result.all = filters.value.all ?? ''
  result.name = filters.value.name ?? ''
  result.description = filters.value.description ?? ''
  // result.countUsing = filters.value.using ?? ''
  result.active = filters.value.active?.value ?? ''
  result.creator = filters.value.creator ?? ''
  result.lastUpdater = filters.value.lastUpdater ?? ''
  if (filters.value.createdAt && filters.value.createdAt.length) {
    result.createdAt = convertDateRangeToStringData(
      filters.value.createdAt,
      store.getLanguage()
    )
  } else {
    result.createdAt = ''
  }
  if (filters.value.updatedAt && filters.value.updatedAt.length) {
    result.updatedAt = convertDateRangeToStringData(
      filters.value.updatedAt,
      store.getLanguage()
    )
    console.log(result.updatedAt)
  } else {
    result.updatedAt = ''
  }
  result.sortField = filters.value.sortField ?? ''
  return result
}
/// Get list data
const getListData = async (query: any) => {
  // const options: any = {
  //   method: 'get',
  //   query: query,
  // }
  // const { data, error, status } = await CallAPI(
  //   APIPathPosition.GET_LIST,
  //   options,
  //   toast,
  //   t,
  //   true
  // )
  // /// Check error
  // if (status.value !== APIStatusCons.SUCCESS) {
  //   /// Check abort
  //   return
  // }
  // const value: any = data.value
  // const result = value.data
  // instance.value.list = mapNoToList(result.list, result.paginator.offset)
  // instance.value.total = result.paginator.total
}

/// Init data
const initData = () => {
  console.log(`InitData = ${store.getLanguage()}`)
  if (store.getLanguage() === LocaleCons.EN) {
    datePattern.value = 'yy/mm/dd'
  }
  if (store.getLanguage() === LocaleCons.VI) {
    datePattern.value = 'dd/mm/yy'
  }
  const query = getSearchQuery()
  /// Set param url in onMounted
  getListData(query)
}

/// Clear created at string
const clearCreatedAt = () => {
  filters.value.createdAtString = ''
  filters.value.createdAt = []
  filters.value.createdAtTemp = []
}

/// Clear updated at string
const clearUpdatedAt = () => {
  filters.value.updatedAtString = ''
  filters.value.updatedAt = []
  filters.value.updatedAtTemp = []
}
/// Check input text
const inputCreatedAt = (evt: any) => {
  /// Check date
  const value = filters.value.createdAtString
  if (!value) {
    return
  }
  let arr = value.split('-')
  if (arr.length === 1) {
    const first = arr[0].trim()
    if (!isDate(first, store.getLanguage())) {
      /// Waiting update
      setTimeout(() => {
        clearCreatedAt()
      }, 10)

      return
    }
    return
  }
  if (arr.length === 2) {
    const first = arr[0].trim()
    const last = arr[1].trim()
    if (
      !isDate(first, store.getLanguage()) ||
      !isDate(last, store.getLanguage())
    ) {
      /// Waiting update
      setTimeout(() => {
        clearCreatedAt()
      }, 10)
      return
    }
    return
  }
  /// Waiting update
  setTimeout(() => {
    clearCreatedAt()
  }, 10)
}
const inputUpdatedAt = (evt: any) => {
  /// Check date
  const value = filters.value.updatedAtString
  if (!value) {
    return
  }
  let arr = value.split('-')
  if (arr.length === 1) {
    const first = arr[0].trim()
    if (!isDate(first, store.getLanguage())) {
      /// Waiting update
      setTimeout(() => {
        clearUpdatedAt()
      }, 10)

      return
    }
    return
  }
  if (arr.length === 2) {
    const first = arr[0].trim()
    const last = arr[1].trim()
    if (
      !isDate(first, store.getLanguage()) ||
      !isDate(last, store.getLanguage())
    ) {
      /// Waiting update
      setTimeout(() => {
        clearUpdatedAt()
      }, 10)
      return
    }
    return
  }
  /// Waiting update
  setTimeout(() => {
    clearUpdatedAt()
  }, 10)
}

const clickOkDialog = () => {
  instance.value.visibleDialog = false
}

const clickCloseDialog = () => {
  instance.value.visibleDialog = false
}
/// Get data
initData()

watch(
  () => store.getLanguage(),
  (value) => {
    /// Set language
    setParamAndGetListData()
  }
)
onMounted(() => {
  const query = getSearchQuery()
  setParamUrl(query, route)
  // initData()
})
</script>

<style lang="scss">
.postions-of-org-created-at {
  max-width: 305px;
  .p-datepicker-year-selected {
    background-color: transparent !important;
    color: $primary-color !important;
    font-weight: bold !important;
  }
}
.postions-of-org-created-at.p-popover,
.postions-of-org-created-at.p-popover {
  margin-top: 2px !important;
  border-radius: unset !important;
  border-top-right-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
  .p-datepicker-panel {
    border: unset !important;
  }
}
.postions-of-org-created-at.p-popover::before,
.postions-of-org-created-at.p-popover::after {
  content: none !important;
}

.postions-of-org-updated-at {
  max-width: 305px;
  .p-datepicker-year-selected {
    background-color: transparent !important;
    color: $primary-color !important;
    font-weight: bold !important;
  }
}
.postions-of-org-updated-at.p-popover,
.postions-of-org-updated-at.p-popover {
  margin-top: 2px !important;
  border-radius: unset !important;
  border-top-right-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
  .p-datepicker-panel {
    border: unset !important;
  }
}
.postions-of-org-updated-at.p-popover::before,
.postions-of-org-updated-at.p-popover::after {
  content: none !important;
}
</style>

<style scoped lang="scss">
:deep(.p-paginator-rpp-dropdown) {
  display: none !important;
}
:deep(.p-popover.p-component.testing) {
  padding: 0px !important;
  background-color: red;
  border: unset !important;
}

:deep(.p-chip) {
  gap: 5px !important;
  padding-inline: 5px !important;
}

:deep(.p-inputtext) {
  width: 100% !important;
}

li {
  height: 100px !important;
}
.page {
  display: flex;
  padding: 10px;
}
.table-data {
  margin-top: 20px;
  // margin-bottom: 30px;
}
.icon-search {
  margin-left: 10px;
  margin-top: 10px;
  color: #cccccc;
  font-size: 14px !important;
}
.search {
  width: 300px;
  margin-left: 10px;
  .clear {
    position: absolute;
    z-index: 1;
    right: -7px;
    top: -7px;
    background-color: #f2f2f2;
    border-radius: 50px;
    .icon {
      filter: invert(88%) sepia(2%) saturate(6818%) hue-rotate(184deg)
        brightness(76%) contrast(86%);
    }
    &:hover {
      cursor: pointer;
    }
  }
}
.multi-select {
  width: 300px;
}

.avatar {
  width: 32px;
  border-top-right-radius: 5px !important;
  border-bottom-left-radius: 5px !important;
  border-color: $second-color;
  border-style: solid;
  border-width: 1px;
}
.pencil {
  filter: invert(60%) sepia(75%) saturate(440%) hue-rotate(89deg)
    brightness(87%) contrast(99%);
  &:hover {
    cursor: pointer;
    filter: invert(45%) sepia(100%) saturate(363%) hue-rotate(109deg)
      brightness(105%) contrast(96%);
  }
}
.trash {
  filter: invert(40%) sepia(40%) saturate(5134%) hue-rotate(340deg)
    brightness(108%) contrast(88%);
  &:hover {
    cursor: pointer;
    filter: invert(18%) sepia(62%) saturate(3672%) hue-rotate(351deg)
      brightness(113%) contrast(85%);
  }
}
.filter {
  position: relative;
  .clear {
    position: absolute;
    z-index: 1;
    right: -7px;
    top: -7px;
    background-color: #f2f2f2;
    border-radius: 50px;
    .icon {
      filter: invert(88%) sepia(2%) saturate(6818%) hue-rotate(184deg)
        brightness(76%) contrast(86%);
    }

    &:hover {
      cursor: pointer;
    }
  }
}

.search {
  .icon {
    position: absolute;
    z-index: 1;
    top: 8px;
    left: 8px;
    filter: invert(97%) sepia(0%) saturate(45%) hue-rotate(213deg)
      brightness(85%) contrast(93%);
  }
  .input {
    padding-left: 30px;
  }
}
/// Tablet
@media screen and (min-width: $tablet-min) and (max-width: $tablet-max) {
  .table-data {
    margin-top: 10px;
    // margin-bottom: 20px;
  }
}

/// Tablet mini
@media screen and (min-width: $tablet-mini-min) and (max-width: $tablet-mini-max) {
  .table-data {
    margin-top: 5px;
    // margin-bottom: 10px;
  }
  .filter {
    flex-direction: column;
    .loading {
      margin-bottom: 10px;
    }
    .input-action {
      width: 100%;
      .col-search {
        width: 100%;
        .search {
          width: unset;
          flex: 1;
        }
      }
    }
  }
}

/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  .table-data {
    margin-top: 5px;
    // margin-bottom: 10px;
  }
  .filter {
    flex-direction: column;
    .loading {
      margin-bottom: 10px;
    }
    .input-action {
      width: 100%;
      align-items: start;
      .col-search {
        flex-direction: column;
        flex: 1;
        .multi-select {
          width: unset;
          flex: 1;
        }
        .search {
          margin-top: 10px;
          margin-left: unset;
          width: unset;
          flex: 1;
        }
      }
    }
  }
}
</style>
