<template>
  <Dialog
    modal
    :dismissableMask="true"
    v-model:visible="instance.visible"
    @update:visible="updateVisible"
  >
    <template #container>
      <div class="header flex">
        <span class="font-bold text-[16px] flex-1">{{ props.title }}</span>
        <span>{{ getStringSelected() }}</span>
      </div>

      <div class="body w-full flex flex-col">
        <div class="line h-[2px] rouned-[5px] mb-[10px]"></div>
        <div class="filter mb-[10px]">
          <InputText
            v-model="filters.name"
            type="text"
            class="w-full"
            @input="inputSearch()"
            :placeholder="$t('searching_dot')"
          />
          <div class="clear" v-if="filters.name">
            <img :src="Times" class="w-[14px] icon" @click="clearFilterTitle" />
          </div>
        </div>
        <div class="table-wrapper flex-1">
          <DataTable
            :value="instance.listPage"
            scrollable
            class="table-data"
            lazy
            :rows="10"
            stripedRows
            dataKey="id"
            @sort="clickSort"
            selectionMode="single"
            resizableColumns
            removableSort
            columnResizeMode="expand"
            tableStyle="min-width: 200px"
          >
            <template #empty
              >{{ t('the_system_did_not_find_any_data') }}
            </template>
            <Column
              field="no"
              :header="$t('no')"
              :showFilterMenu="false"
              :sortable="false"
              style="width: 50px"
            >
              <template #body="{ data }">
                <div class="flex items-center">
                  <span>{{ data.no }}</span>
                </div>
              </template>
            </Column>
            <Column
              field="name"
              :header="props.headerName"
              :showFilterMenu="false"
              :sortable="true"
              style="width: 100%"
            >
              <template #body="{ data }">
                <div class="items-center gap-2 flex">
                  <img
                    :alt="data.name[locale]"
                    :src="getAvatar(data)"
                    class="image"
                  />
                  <div class="break-string">
                    {{ data.name[locale] ?? '' }}
                  </div>
                </div>
              </template>
            </Column>

            <Column style="min-width: 50px">
              <template #header="">
                <div class="flex">
                  <Checkbox
                    binary
                    v-model="instance.all"
                    @value-change="changeCheckAll()"
                  />
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex">
                  <Checkbox
                    v-model="data.selected"
                    @value-change="changeCheck(data)"
                    binary
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="paginator-wrapper">
          <Paginator
            :rows="10"
            :page="2"
            :first="instance.paginator.offset || 0"
            @page="onChangePage"
            :totalRecords="instance.paginator.total || 0"
            :rowsPerPageOptions="[10, 20, 30]"
          ></Paginator>
        </div>
        <div class="line h-[2px] rouned-[5px]"></div>
      </div>
      <div class="footer flex items-center justify-end">
        <Button
          class="h-[32px] w-[90px]"
          type="button"
          :label="$t('cancel')"
          severity="warn"
          icon="pi pi-times"
          @click="clickClose"
        ></Button>

        <Button
          class="ml-[20px] h-[32px] w-[90px]"
          type="button"
          severity="success"
          :label="$t('select')"
          icon="pi pi-save"
          @click="clickSelect"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
/// Import
import type {
  SelectedDialogType,
  SelectedFilterType,
  SelectedType,
} from '~/types/common/SelectedType'
import Times from '~/assets/icons/times.svg'
import type { PaginatorType } from '~/types/common/PaginatorType'
import DefaultAvatar from '~/assets/images/default-avatar.png'
/// Define
const toast = useToast()
const { t, locale } = useI18n()
const emits = defineEmits([
  'click-close',
  'click-select',
  'click-select-all',
  'change-page',
  'click-sort',
  'click-clear',
  'input-search',
])
const props = defineProps({
  title: {
    type: String,
  },
  headerName: {
    type: String,
  },
  visible: {
    type: Boolean,
    required: false,
  },
  listPage: {
    type: Array,
  },
  paginator: {
    type: Object,
  },
  all: {
    type: Boolean,
  },
  allSelected: {
    type: Array,
  },
})
const instance = ref<SelectedDialogType>({
  visible: false,
  allSelected: [],
  listPage: [],
  // listSelectedPage: [],
  // total: 0,
  // limit: 0,
  // offset: 0,
  paginator: {
    total: 0,
    limit: 0,
    offset: 0,
  },
  all: false,
  // loading: false,
})
const filters = ref(<SelectedFilterType>{
  sortOrder: 1,
})
const datePattern = ref('yy/mm/dd')

const getAvatar = (data: any) => {
  if (!data || !data.avatar) {
    return DefaultAvatar
  }
  return `${data.avatar}`
}

const getStringSelected = () => {
  let count = instance.value.allSelected?.length ?? 0
  if (instance.value.all) {
    return t('selected_all')
  } else if (count != 0) {
    return t('name_item_selected', { name: count })
  }
  return ''
}

/// Change check all
const changeCheckAll = () => {
  // instance.value.list = obj.list
  if (instance.value.all) {
    instance.value.listPage?.forEach((it) => {
      it.selected = true
    })
    emits('click-select-all')
  } else {
    instance.value.listPage?.forEach((it) => {
      it.selected = false
    })
    instance.value.allSelected = []
  }
}

const changeCheck = (evt: SelectedType) => {
  if (evt.selected) {
    instance.value.allSelected.push(evt)
    if (instance.value.allSelected.length === instance.value.paginator.total) {
      instance.value.all = true
    }
  } else {
    instance.value.all = false
    instance.value.allSelected = instance.value.allSelected.filter((item) => {
      return item.data._id != evt.data._id
    })
  }
}

/// Change page
const onChangePage = (val: any) => {
  /// Update all selected
  // instance.value.allSelected = getAllSelected()
  let offset: number = val.page * (instance.value.paginator?.limit ?? 0)
  let paginator = instance.value.paginator ?? {}
  paginator.offset = offset
  instance.value.paginator = paginator

  emits('change-page', instance.value.paginator, filters.value)
}

/// Click sort
const clickSort = (event: any) => {
  if (filters.value.sortOrder == 1) {
    filters.value.sortOrder = -1
  } else {
    filters.value.sortOrder = 1
  }
  emits('click-sort', instance.value.paginator, filters.value)
}
/// Clear fitler title
const clearFilterTitle = () => {
  filters.value.name = ''
  emits('click-clear', instance.value.paginator, filters.value)
}

/// Execute filter data
const inputSearch = () => {
  console.log('inputSearch')
  emits('input-search', instance.value.paginator, filters.value)
}

/// Click select
const clickSelect = async () => {
  emits(
    'click-select',
    instance.value.all,
    instance.value.allSelected,
    instance.value.paginator,
    filters.value
  )
}

/// Click close dialog
const clickClose = () => {
  emits('click-close')
}

/// Update visible
const updateVisible = (value: any) => {
  if (!value) {
    /// Close dialog
    instance.value.visible = props.visible
    emits('click-close')
  }
}

const initData = () => {
  instance.value.paginator = props.paginator as PaginatorType

  if (instance.value.all) {
    props.listPage?.forEach((it: any) => {
      it.selected = true
    })
  } else {
    props.listPage?.forEach((it: any) => {
      let arr = instance.value.allSelected.filter((value) => {
        return value.data._id === it.data._id
      })
      if (arr && arr.length) {
        it.selected = true
      } else {
        it.selected = false
      }
    })
  }
  instance.value.listPage = props.listPage as SelectedType[]
}

watch(
  () => props.visible,
  (value) => {
    instance.value.visible = props.visible
    instance.value.all = props.all
    instance.value.allSelected = (props.allSelected || []) as SelectedType[]
    initData()
  }
)
watch(
  () => props.allSelected,
  (value) => {
    instance.value.allSelected = (props.allSelected || []) as SelectedType[]
  }
)

watch(
  () => props.listPage,
  (value) => {
    initData()
  }
)
</script>

<style scoped lang="scss">
@import url('~/assets/scss/components/SelectedDialog.scss');
</style>
