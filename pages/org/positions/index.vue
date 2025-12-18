<template>
  <div class="page">
    <div class="w-full card positions flex flex-col">
      <div class="flex items-center justify-end header">
        <div class="search">
          <img :src="Search" class="w-[18px] icon" @click="clearFilterAll"></img>
          <InputText
            class="w-full h-[30px] input"
            v-model="filters.all"
            autocomplete="off"
            @input="inputSearchAll"
            :placeholder="$t('searching_dot')"
          />
          <div class="clear" v-if="filters.all">
            <img :src="Times" class="w-[14px] icon" @click="clearFilterAll"></img>
          </div>
        </div>
         <Button
          @click="clickFilter()"
          severity="info"
          :label="$t('filter')"
          class="ml-[10px] mr-[10px] h-[30px] ml-[20px]"
        >
          <template #icon>
            <img :src="Filter" class="w-[14px] add" />
          </template>
        </Button>
        <Button
          @click="clickCreate()"
          severity="success"
          :label="$t('create')"
          class="ml-[10px] mr-[10px] h-[30px] ml-[20px]"
        >
          <template #icon>
            <img :src="Add" class="w-[14px] add" />
          </template>
        </Button>
      </div>
      <div class="body flex flex-col flex-1">
        <NoData :status="instance.noData"></NoData>
        <ErrorData :status="instance.errorData"></ErrorData>
        <div class="grid grid-cols-12 gap-4 flex-1" v-if="instance.init">
          <div
            v-for="index in 20"
            :key="index"
            class="col-span-12 sm:col-span-3 md:col-span-3 xl:col-span-3 p-2"
          >
            <div class="item">
              <div class="status"></div>
              <div class="p-[10px] flex flex-col flex-1">
                <div class="flex w-full items-start justify-start">
                  <Skeleton width="50px" height="50px" />
                  <div class="flex-1 ml-[20px] flex flex-col">
                    <div class="name">
                      <Skeleton width="100%" height="25px" />
                    </div>
                    <div class="active mt-[5px]">
                      <Skeleton width="100%" height="20px" />
                    </div>
                  </div>
                </div>
                <div class="mt-[10px]"></div>
                <div class="description mt-[10px]">
                  <Skeleton width="100%" height="30px" />
                </div>
                <div class="mt-[10px]"></div>
                <div class="flex mt-[10px] items-center justify-end">
                  <Skeleton width="80px" height="25px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-12 gap-4 flex-1"
          v-if="instance.list && !instance.noData"
        >
          <div
            v-for="(item, index) in instance.list"
            :key="index"
            class="col-span-12 sm:col-span-3 md:col-span-3 xl:col-span-3 p-2"
          >
            <div class="item flex flex-row">
              <div class="status">
                <div
                  :class="{
                    status1: item.active.value,
                    status2: !item.active.value,
                  }"
                ></div>
              </div>
              <div class="info flex flex-col flex-1">
                <div class="flex w-full items-start justify-start">
                  <LoadingImg :src="item.avatar.location"></LoadingImg>
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
                    severity="info"
                    :label="$t('edit')"
                    class="h-[25px] button"
                    @click="clickEdit(item)"
                  >
                    <template #icon>
                      <img :src="Pencil" class="w-[12px] pencil" />
                    </template>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="paginator-wrapper"
          v-if="instance.list && !instance.noData && !instance.init"
        >
          <Paginator
            :rows="instance.limit"
            :page="0"
            :first="0"
            @page="onChangePage"
            :totalRecords="instance.total"
            :rowsPerPageOptions="[20, 40, 80]"
          ></Paginator>
        </div>
      </div>
    </div>
    <CreateUpdateDialog
      :visible="instance.createVisible"
      :data="instance.track"
      @click-ok="clickOkCreateDialog"
      @click-close="clickCloseCreateDialog"
    />
    <FilterDialog
      :visible="instance.filterVisible"
      :data="filters"
      @click-ok="clickOkFilterDialog"
      @click-close="clickCloseFilterDialog"
    />
  </div>
</template>

<script setup lang="ts">
/// Import
import { ref, onMounted } from 'vue'
import { GlobalStore } from '~/store/Global'
import Pencil from '~/assets/icons/pencil.svg'
import Search from '~/assets/icons/search.svg'
import Add from '~/assets/icons/add.svg'
import Filter from '~/assets/icons/filter.svg'
import Times from '~/assets/icons/times.svg'
import type { PositionsType } from '~/types/org/positions/PositionsType'
import type { FilterPositionType } from '~/types/org/positions/FilterPositionType'
import CreateUpdateDialog from './components/create-update-dialog.vue'
import FilterDialog from './components/filter-dialog.vue'

/// Define
const store = GlobalStore()
const { t, locale } = useI18n()
const route = useRoute()
const { $orgAPI } = useNuxtApp()
const instance = ref<PositionsType>({
  createVisible: false,
  filterVisible:false,
  list: [],
  track: null,
  total: 0,
  limit: 20,
  page: 1,
  init: true,
  loading: false,
  noData: false,
  errorData: false,
})
const filters = ref(<FilterPositionType>{})
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
/// Change page
const onChangePage = (evt: any) => {
  console.log(evt)
  instance.value.page = evt.page + 1
  const query = getSearchQuery()
  /// Set param url in onMounted
  getListData(query)
}

/// Clear fitler all
const clearFilterAll = () => {
  filters.value.all = ''
}
/// Click create position
const clickFilter = async () => {
  instance.value.filterVisible = true
}
/// Click create position
const clickCreate = async () => {
  instance.value.track = null
  instance.value.createVisible = true
}
const clickEdit = async (item: any) => {
  instance.value.track = item
  instance.value.createVisible = true
}
/// Get search query
const getSearchQuery = () => {
  let result: any = {
    limit: instance.value.limit,
    page: instance.value.page,
  }
  result.name = filters.value.name || ''
  result.description = filters.value.description || ''
  if(filters.value.active){
      result.active=true;
  }else if(filters.value.inActive){
     result.active=false;
  }else{
    result.active = ''
  }
  result.sortField = filters.value.sortField || 'name';
  result.sortStatus = filters.value.sortStatus || 'ASC';
 
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
  try {
    const response: any = await $orgAPI(APIOrgPositionCons.LIST, options)
    const data = response.data
    instance.value.list = data.list
    instance.value.total = data.total
    instance.value.errorData = false
    if (data.total) {
      instance.value.noData = false
    } else {
      instance.value.noData = true
    }
  } catch (e) {
    instance.value.errorData = true
  }
  instance.value.init = false
  console.log(instance.value)
}

/// Init data
const initData = () => {
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
const clickOkFilterDialog = (evt:any) => {
  console.log('clickOkFilterDialog')
  console.log(evt)
  filters.value.name = evt.name;
  filters.value.description = evt.description;
  filters.value.active = evt.active;
  filters.value.inActive = evt.inActive;
  filters.value.sortField = evt.sortField;
  filters.value.sortStatus = evt.sortStatus;
  instance.value.filterVisible = false
  const query = getSearchQuery()
  setParamUrl(query, route)
  getListData(query)
}

const clickOkCreateDialog = () => {
  instance.value.createVisible = false
  initData()
}
const clickCloseFilterDialog = () => {
  instance.value.filterVisible = false
}

const clickCloseCreateDialog = () => {
  instance.value.createVisible = false
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
})
</script>

<style scoped lang="scss">
@import url('~/assets/scss/org/positions/Positions.scss');
</style>
