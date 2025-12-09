<template>
  <div class="page">
    <div class="h-full w-full card rounded-[8px] p-[5px]">
      <DataTable
        :value="customers"
        scrollable
        class="table-data"
        v-model:filters="filters"
        :globalFilterFields="[
          'name',
          'country.name',
          'representative.name',
          'status',
        ]"
        paginator
        :rows="10"
        :loading="loading"
        stripedRows
        dataKey="id"
        selectionMode="single"
        filterDisplay="row"
        resizableColumns
        columnResizeMode="expand"
      >
        <template #header>
          <div class="flex filter">
            <div class="flex-1 flex loading">
              <div class="spinner-mini"></div>
            </div>
            <div class="flex input-action items-center justify-end">
              <div class="flex col-search">
                <MultiSelect
                  :modelValue="selectedColumns"
                  :options="columns"
                  :maxSelectedLabels="1"
                  size="small"
                  optionLabel="header"
                  @update:modelValue="onToggle"
                  display="chip"
                  class="multi-select h-[32px]"
                  placeholder="Select Columns"
                />

                <div class="search relative">
                  <i class="pi pi-search icon-search absolute" />
                  <InputText
                    class="w-full h-[32px] pl-[30px]"
                    v-model="filters['global'].value"
                    autocomplete="off"
                    :placeholder="$t('searching_dot')"
                  />
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
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column
          field="name"
          header="Name"
          :showFilterMenu="false"
          sortable
          style="min-width: 200px"
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <img
                :alt="data.representative.name"
                :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                style="width: 32px"
              />
              <span>{{ data.representative.name }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by country"
            />
          </template>
        </Column>
        <Column
          header="Numbers"
          filterField="representative"
          :showFilterMenu="false"
          style="min-width: 14rem"
          sortable
        >
          <template #body="{ data }">
            <div class="flex items-center">
              <span>{{ 1 }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by country"
            />
          </template>
        </Column>
        <Column
          header="Creator"
          filterField="representative"
          :showFilterMenu="false"
          style="min-width: 14rem"
          sortable
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <img
                :alt="data.representative.name"
                :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                style="width: 32px"
              />
              <span>{{ data.representative.name }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by country"
            />
          </template>
        </Column>

        <Column
          header="Last updater"
          filterField="representative"
          :showFilterMenu="false"
          style="min-width: 14rem"
          sortable
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <img
                :alt="data.representative.name"
                :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                style="width: 32px"
              />
              <span>{{ data.representative.name }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by country"
            />
          </template>
        </Column>
        <Column
          header="Created at"
          filterField="representative"
          :showFilterMenu="false"
          style="min-width: 14rem"
          sortable
        >
          <template #body="{ data }">
            <div class="flex items-center">
              <span>{{ `20/10/2012` }}</span>
            </div>
          </template>

          <template #filter="{ filterModel }">
            <DatePicker
              v-model="filterModel.value"
              dateFormat="mm/dd/yy"
              placeholder="mm/dd/yyyy"
              selectionMode="range"
            />
          </template>
        </Column>
        <Column
          header="Updated at"
          filterField="representative"
          :showFilterMenu="false"
          style="min-width: 14rem"
          sortable
        >
          <template #body="{ data }">
            <div class="flex items-center">
              <span>{{ `20/10/2012` }}</span>
            </div>
          </template>

          <template #filter="{ filterModel }">
            <DatePicker
              v-model="filterModel.value"
              dateFormat="mm/dd/yy"
              placeholder="mm/dd/yyyy"
              selectionMode="range"
            />
          </template>
        </Column>
        <Column style="min-width: 12rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editProduct(slotProps.data)"
            ></Button>
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteProduct(slotProps.data)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>
    <CreateUpdateDialog
      :title="instance.titleDialog"
      :visible="instance.visibleDialog"
      @click-ok="clickOkDialog"
      @click-close="clickCloseDialog"
    />
  </div>
</template>

<script setup lang="ts">
/// Import
import { ref, onMounted } from 'vue'
import { CustomerService } from '@/service/CustomerService'
import { FilterMatchMode } from '@primevue/core/api'
import type { BranchesType } from '~/types/org/branches/BranchesType'
import CreateUpdateDialog from './components/create-update-dialog.vue'
/// Define
const { t } = useI18n()
const instance = ref<BranchesType>({
  visibleDialog: false,
  titleDialog: '',
})
const columns = [
  { field: 'createdAt', header: t('created_date') },
  { field: 'updatedAt', header: t('updated_date') },
]

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
})
onMounted(() => {
  CustomerService.getCustomersLarge().then((data) => {
    customers.value = data
  })
})

const customers = ref()
const balanceFrozen = ref(false)
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

/// Click close
// const clickCloseDialog = () => {
//   instance.value.addOrUpdateDialogVisible = false
//   getListData()
// }
/// Click save
// const clickSaveDialog = () => {
//   instance.value.addOrUpdateDialogVisible = false
// }
// /// Click create branch
// const clickCreate = async () => {
//   // instance.value.addOrUpdateDialogVisible = true
//   // instance.value.addOrUpdateDialogStatus = 'add'

//   /// Move to add
//   await navigateTo({ path: PathStaff.CREATE_BRANCH })
// }

/// Click create employee
const clickCreate = async () => {
  instance.value.visibleDialog = true
}
const clickOkDialog = () => {
  instance.value.visibleDialog = false
}

const clickCloseDialog = () => {
  instance.value.visibleDialog = false
}
</script>
<style></style>
<style scoped lang="scss">
:deep(.p-chip) {
  gap: 5px !important;
  padding-inline: 5px !important;
}
.page {
  display: flex;
  padding: 10px;
}
.table-data {
  margin-top: 20px;
  margin-bottom: 30px;
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
}
.multi-select {
  width: 300px;
}

/// Tablet
@media screen and (min-width: $tablet-min) and (max-width: $tablet-max) {
  .table-data {
    margin-top: 10px;
    margin-bottom: 20px;
  }
}

/// Tablet mini
@media screen and (min-width: $tablet-mini-min) and (max-width: $tablet-mini-max) {
  .table-data {
    margin-top: 5px;
    margin-bottom: 10px;
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
    margin-bottom: 10px;
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
