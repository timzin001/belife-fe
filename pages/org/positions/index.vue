<template>
  <div class="page">
    <div class="w-full card positions">
      <div class="flex items-center justify-end header">
        <div class="search">
          <img :src="Search" class="w-[18px] icon" @click="clearFilterName" />
          <InputText
            class="w-full h-[30px] input"
            v-model="filters.all"
            autocomplete="off"
            @input="inputSearchAll"
            :placeholder="$t('searching_dot')"
          />
          <div class="clear">
            <img :src="Times" class="w-[14px] icon" @click="clearFilterName" />
          </div>
        </div>
        <Button
          @click="clickCreate()"
          :label="$t('create')"
          class="w-[90px] h-[30px] ml-[20px]"
          icon="pi pi-plus"
        ></Button>
      </div>
      <div class="body">
        <div class="grid grid-cols-12 gap-4">
          <div
            v-for="(item, index) in instance.list"
            :key="index"
            class="col-span-12 sm:col-span-3 md:col-span-3 xl:col-span-3 p-2"
          >
            <div class="item flex flex-col">
              <div class="flex w-full items-start justify-start">
                <img
                  class="avatar"
                  :src="item.avatar.location"
                  :alt="item.name"
                />
                <div class="flex-1 ml-[20px] flex flex-col">
                  <div class="name">
                    {{ item.name[locale] }}
                  </div>
                  <div
                    :class="{
                      active: item.active.value,
                      inactive: !item.active.value,
                    }"
                  >
                    {{ item.active[locale] }}
                  </div>
                </div>
              </div>
              <div class="line mt-[10px]"></div>
              <div class="description mt-[10px]">
                {{ item.description[locale] }}
              </div>
              <div class="line mt-[10px]"></div>
              <div class="flex mt-[10px] items-center justify-end">
                <Button
                  severity="success"
                  :label="$t('edit')"
                  class="h-[25px] button"
                  @click="clickEdit(item)"
                >
                  <template #icon>
                    <img :src="Pencil" class="w-[12px] pencil" />
                  </template>
                </Button>
                <!-- <img
                  class="w-[15px] h-[15px] pencil"
                  :src="Pencil"
                  @click="clickEdit(item)"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreateUpdateDialog
      :title="instance.titleDialog"
      :visible="instance.visibleDialog"
      :data="instance.track"
      @click-ok="clickOkDialog"
      @click-close="clickCloseDialog"
    />
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
import type { PositionFilterType } from '~/types/org/positions/PositionsType'
import type { PositionsType } from '~/types/org/positions/PositionsType'
import type { HeaderColumnType } from '~/types/common/HeaderColumnType'
import CreateUpdateDialog from './components/create-update-dialog.vue'

/// Define
const store = GlobalStore()
const toast = useToast()
const { t, locale } = useI18n()
const route = useRoute()
const { $orgAPI } = useNuxtApp()

const selectedData = ref()
const createdAtViewFilter = ref()
const createdAtViewStatus = ref()
const updatedAtViewFilter = ref()
const updatedAtViewStatus = ref()
const instance = ref<PositionsType>({
  visibleDialog: false,
  titleDialog: '',
  list: [],
  track: null,
  total: 0,
  limit: 20,
  page: 1,
  loading: false,
})
const filters = ref(<PositionFilterType>{})
const datePattern = ref('yy/mm/dd')

/// Set param to url and get list data
const setParamAndGetListData = () => {
  const query = getSearchQuery()
  setParamUrl(query, route)
  getListData(query)
}

/// Execute filter data
const inputSearchAll = (evt: any) => {
  console.log(filters.value.all)
  console.log(evt)
}

/// Clear fitler title
const clearFilterName = () => {
  filters.value.name = ''
}

/// Click create position
const clickCreate = async () => {
  /// Move to add
  // await navigateTo({ path: PathStaff.CREATE_POSITION })
  instance.value.visibleDialog = true
}
const clickEdit = async (item: any) => {
  instance.value.track = item
  instance.value.visibleDialog = true
}
/// Get search query
const getSearchQuery = () => {
  let result: any = {
    limit: instance.value.limit,
    page: instance.value.page,
  }
  result.name = filters.value.name ?? ''
  // result.all = filters.value.all ?? ''

  // result.description = filters.value.description ?? ''
  // // result.countUsing = filters.value.using ?? ''
  // result.active = filters.value.active?.value ?? ''
  // result.creator = filters.value.creator ?? ''
  // result.lastUpdater = filters.value.lastUpdater ?? ''
  // if (filters.value.createdAt && filters.value.createdAt.length) {
  //   result.createdAt = convertDateRangeToStringData(
  //     filters.value.createdAt,
  //     store.getLanguage()
  //   )
  // } else {
  //   result.createdAt = ''
  // }
  // if (filters.value.updatedAt && filters.value.updatedAt.length) {
  //   result.updatedAt = convertDateRangeToStringData(
  //     filters.value.updatedAt,
  //     store.getLanguage()
  //   )
  //   console.log(result.updatedAt)
  // } else {
  //   result.updatedAt = ''
  // }
  // result.sortField = filters.value.sortField ?? ''
  return result
}
/// Get list data
const getListData = async (query: any) => {
  const options: any = {
    method: MethodCons.GET,
    query: query,
  }
  const response: any = await $orgAPI(APIOrgPositionCons.LIST, options)
  console.log(response)
  instance.value.list = response.data.list
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
  initData()
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

<style scoped lang="scss">
@import url('~/assets/scss/org/Positions.scss');
</style>
