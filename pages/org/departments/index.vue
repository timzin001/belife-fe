<template>
  <div class="page">
    <div class="w-full card departments flex flex-col">
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
          class="h-[30px] filter-button"
        >
          <template #icon>
            <img :src="Filter" class="w-[14px] icon-button" />
          </template>
        </Button>
        <Button
          @click="clickCreate()"
          severity="success"
          :label="$t('create')"
          class="h-[30px] create-button"
        >
          <template #icon>
            <img :src="Add" class="w-[14px] icon-button" />
          </template>
        </Button>
      </div>
      <div class="body flex flex-col flex-1">
        <NoData :status="instance.noData"></NoData>
        <ErrorData :status="instance.errorData"></ErrorData>
      
        <!-- <div class="gap flex-1 grid mb-[56px]" v-if="instance.init">
          <div
            v-for="index in 12"
            :key="index"
            class="item flex flex-row"
          >
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
              <div class="description flex-1 mt-[10px]">
                <Skeleton width="100%" height="100%" />
              </div>
              <div class="mt-[10px]"></div>
              <div class="flex mt-[10px] items-center justify-end">
                <Skeleton width="80px" height="25px" />
              </div>
            </div>
          </div>
        </div> -->
        <div  class="flex-1" v-if="instance.list && !instance.noData && !instance.init && !instance.errorData">
          <Panel header="Header" toggleable   v-for="(item, index) in instance.list"
            :key="index">
            <template #header>
                <div class="flex items-center gap-2 group-header">
                    <LoadingImg :src="item.avatar.location"></LoadingImg>
                    <span class="font-bold">{{ item.name[locale] }}</span>
                </div>
            </template>
            <div class="group-body">
              <div class="top-line"></div>
              <div class="gap flex-1 grid">
                <div v-for="(child, count) in item.departments" class="item flex">
                  <div class="status">
                    <div
                      :class="{
                        status1: child.active.value,
                        status2: !child.active.value,
                      }"
                    ></div>
                  </div>
                  <div class="info flex flex-col flex-1">
                    <div class="flex w-full items-start justify-start">
                      <LoadingImg :src="item.avatar.location"></LoadingImg>
                      <div class="flex-1 ml-[20px] flex flex-col">
                        <div class="name">
                          {{ child.name[locale] }}
                        </div>
                        <div
                          :class="{
                            active: child.active.value,
                            inactive: !child.active.value,
                          }"
                        >
                          {{ child.active[locale] }}
                        </div>
                      </div>
                    </div>
                    <div class="line mt-[10px]"></div>
                    <div class="description mt-[10px] flex-1">
                      {{ child.description[locale] }}
                    </div>
                    <div class="line mt-[10px]"></div>
                    <div class="flex mt-[10px] items-center justify-end">
                      <Button
                        severity="info"
                        :label="$t('edit')"
                        class="h-[25px] button"
                        @click="clickEdit(child)"
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
            
          </Panel>
        </div>
      </div>
    </div>
    <CreateUpdateDialog
      :visible="instance.createVisible"
      :data="instance.track"
      :list-groups="instance.listGroups"
      @reload-list-groups="getListGroup"
      @click-ok="clickOkCreateDialog"
      @click-close="clickCloseCreateDialog"
    />
     <CreateUpdateGroupDialog
      :visible="instance.createGroupVisible"
      :data="instance.trackGroup"
      @click-ok="clickOkCreateGroupDialog"
      @click-close="clickCloseCreateGroupDialog"
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
import type { DepartmentsType } from '~/types/org/departments/DepartmentsType'
import type { FilterPositionType } from '~/types/org/positions/FilterPositionType'
import CreateUpdateDialog from './components/create-update-dialog.vue'
import CreateUpdateGroupDialog from './components/create-update-group-dialog.vue'
import FilterDialog from './components/filter-dialog.vue'

/// Define
const store = GlobalStore()
const { t, locale } = useI18n()
const route = useRoute()
const { $orgAPI } = useNuxtApp()
const instance = ref<DepartmentsType>({
  createVisible: false,
  filterVisible:false,
  list: [],
  track: null,
  init: true,
  loading: false,
  noData: false,
  errorData: false,
  trackGroup:null,
  createGroupVisible:false,
  listGroups:[]
})
const filters = ref(<FilterPositionType>{})
const datePattern = ref('yy/mm/dd')

/// Set param to url and get list data
const setParamAndGetListData = () => {
  const query = getSearchQuery()
  getListData(query)
  setParamUrl(query, route)
}

/// Execute filter data
const inputSearchAll = (evt: any) => {
  console.log('inputSearchAll')
  setParamAndGetListData()
}

/// Clear fitler all
const clearFilterAll = () => {
  filters.value.all = ''
}
/// Click create position
const clickFilter = async () => {
  instance.value.filterVisible = true
}
/// Click create department
const clickCreate = async () => {
  instance.value.track = null
  instance.value.createVisible = true
  // instance.value.trackGroup = null
  // instance.value.createGroupVisible = true
}
const clickEdit = async (item: any) => {
  instance.value.track = item
  instance.value.createVisible = true
}
/// Get search query
const getSearchQuery = () => {
  let result: any = {
  }
  result.all = filters.value.all || ''
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
  // setParamUrl(result, route)
  return result
}
/// Get list data
const getListData = async (query: any) => {
  const options: any = {
    method: MethodCons.GET,
    query: query,
  }
  try {
    const response: any = await $orgAPI(APIOrgDepartmentGroupCons.LIST_GROUPS_DATA, options)
    const data = response.data
    instance.value.list = data
    instance.value.errorData = false
    if (data && data.length) {
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

/// Get list data
const getListGroup = async () => {
  const options: any = {
    method: MethodCons.GET,
    query: {
    },
  }
  try {
    const response: any = await $orgAPI(APIOrgDepartmentGroupCons.LIST_GROUPS, options)
    const data = response.data
    console.log(data);
    instance.value.listGroups = data || []
  } catch (e) {
  }
}

/// Init data
const initData = () => {
  if (store.getLanguage() === LocaleCons.EN) {
    datePattern.value = 'yy/mm/dd'
  }
  if (store.getLanguage() === LocaleCons.VI) {
    datePattern.value = 'dd/mm/yy'
  }
}
const clickOkFilterDialog = (evt:any) => {
  console.log('clickOkFilterDialog')
  filters.value.name = evt.name;
  filters.value.description = evt.description;
  filters.value.active = evt.active;
  filters.value.inActive = evt.inActive;
  filters.value.sortField = evt.sortField;
  filters.value.sortStatus = evt.sortStatus;
  instance.value.filterVisible = false

  setParamAndGetListData()
}

const clickOkCreateGroupDialog = () => {
  instance.value.createGroupVisible = false
  console.log('clickOkCreateDialog')
  setParamAndGetListData()
}

const clickOkCreateDialog = () => {
  instance.value.createVisible = false
  console.log('clickOkCreateDialog')
  setParamAndGetListData()
}
const clickCloseFilterDialog = () => {
  instance.value.filterVisible = false
}

const clickCloseCreateDialog = () => {
  instance.value.createVisible = false
}
const clickCloseCreateGroupDialog = () => {
  instance.value.createGroupVisible = false
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
  setParamAndGetListData()
  getListGroup();
})
</script>

<style scoped lang="scss">
@import url('~/assets/scss/org/departments/Departments.scss');
</style>
