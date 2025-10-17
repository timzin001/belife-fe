<template>
  <div class="page">
    <div class="card rounded-[8px] create-department">
      <div
        class="text-[25px] font-bold ml-[0px] mb-[20px] w-full flex items-center justify-center"
      >
        {{ $t('create_name', { name: $t('department').toLocaleLowerCase() }) }}
      </div>

      <div class="contain items-center justify-center">
        <div class="inner">
          <div>
            <div class="flex items-center justify-start">
              <label class="label">{{ $t('avatar') }}<span>*</span></label>
              <FileUpload
                mode="basic"
                @select="onFileSelectAvatar"
                customUpload
                auto
                :chooseLabel="$t('choose')"
                severity="secondary"
                class="p-button-outlined h-[32px] flex-1"
              />
              <img
                :src="instance.avatar"
                alt="Image"
                class="rounded-[8px] w-full image"
              />
            </div>
            <div class="avatar-des">{{ $t('avatar_with_1_1_ratio') }}</div>
            <Message
              v-if="instance.avatarError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.avatarError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label for="department-name" class="label"
                >{{ $t('name') }}<span>*</span></label
              >
              <InputText
                id="name"
                v-model="instance.name[locale]"
                class="flex-auto"
                @value-change="changeName"
                autocomplete="off"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('name').toLocaleLowerCase(),
                  })
                "
              />
            </div>

            <Message
              v-if="instance.nameError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.nameError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('description') }}</div>
              <Textarea
                class="flex-1"
                autocomplete="off"
                rows="2"
                v-model="instance.description[locale]"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('description').toLocaleLowerCase(),
                  })
                "
              />
            </div>
          </div>
          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('managers') }}</div>
              <div class="flex-1">
                <Chip label="Amy Elsner" removable>
                  <template #removeicon="{ removeCallback, keydownCallback }">
                    <img :src="Times" class="w-[12px] rounded-[50px]" />
                  </template>
                  <template #icon>
                    <img :src="DefaultAvatar" class="w-[20px] rounded-[50px]" />
                  </template>
                </Chip>
              </div>
              <img class="w-[15px] h-[15px] pencil" :src="Pencil" />
            </div>
          </div>
          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('employees') }}</div>
              <div class="flex-1">
                <Chip label="Amy Elsner" removable>
                  <template #removeicon="{ removeCallback, keydownCallback }">
                    <img :src="Times" class="w-[12px] rounded-[50px]" />
                  </template>
                  <template #icon>
                    <img :src="DefaultAvatar" class="w-[20px] rounded-[50px]" />
                  </template>
                </Chip>
              </div>
              <img
                class="w-[15px] h-[15px] pencil"
                :src="Pencil"
                @click="clickManager"
              />
            </div>
          </div>
          <div class="w-full line h-[1px] mt-[20px]"></div>
          <div class="w-full flex items-center justify-end mt-[30px]">
            <Button
              :label="$t('back')"
              severity="warn"
              class="w-[110px] h-[32px] button"
              @click="clickBack"
            >
              <template #icon>
                <img :src="ArrowLeft" class="w-[14px] icon" />
              </template>
            </Button>
            <div class="expand flex-1"></div>
            <Button
              severity="success"
              :label="$t('save')"
              class="w-[110px] h-[32px] button"
              @click="clickSave"
            >
              <template #icon>
                <img :src="Save" class="w-[14px] icon" />
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
    <SelectedDialog
      :headerName="$t('full_name')"
      :title="$t('select_name', { name: $t('manager').toLocaleLowerCase() })"
      :visible="instance.managerVisible"
      :listPage="instance.managerPage"
      :paginator="instance.managerPaginator"
      @click-select-all="clickSelectAllManager"
      @change-page="inputSearchManager"
      @click-select="clickSelectManager"
      @click-sort="inputSearchManager"
      @input-search="inputSearchManager"
      @click-clear="inputSearchManager"
      @click-close="clickCloseManager"
    />

    <!-- <SelectedDialog
      :headerName="$t('branch')"
      :titleDialog="$t('select_branch')"
      :visible="instance.branchVisible"
      :listPage="instance.branchPage"
      :paginator="instance.branchPaginator"
      @change-page="inputSearchBranch"
      @click-select="clickSelectBranch"
      @click-sort="inputSearchBranch"
      @input-search="inputSearchBranch"
      @click-clear="inputSearchBranch"
      @click-close="clickCloseBranch"
    /> -->
    <!-- 
    <SelectedDialog
      :headerName="$t('employee')"
      :titleDialog="$t('select_employee')"
      :visible="instance.employeeDialogVisible"
      :listPage="instance.employeePage"
      :paginator="instance.employeePaginator"
      @change-page="inputSearchPosition"
      @click-select="clickSelectPosition"
      @click-sort="inputSearchPosition"
      @input-search="inputSearchPosition"
      @click-clear="inputSearchPosition"
      @click-close="clickClosePosition"
    /> -->
  </div>
</template>
<script setup lang="ts">
/// Import
import { ref } from 'vue'
import type { CreateDepartmentType } from '~/types/staff/CreateDepartmentType'
import Times from '~/assets/icons/times.svg'
import { CreateDepartmentValidate } from '~/validate/staff/CreateDepartmentValidate'
import { GlobalStore } from '~/store/Global'
import { useToast } from 'primevue/usetoast'
import Pencil from '~/assets/icons/pencil.svg'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import ArrowLeft from '~/assets/icons/arrow-left.svg'
import Save from '~/assets/icons/save.svg'
import type { PaginatorType } from '~/types/common/PaginatorType'
import type {
  SelectedFilterType,
  SelectedType,
} from '~/types/common/SelectedType'
/// Define

const store = GlobalStore()
const toast = useToast()
const router = useRouter()

const { t, locale } = useI18n()
const instance = ref(<CreateDepartmentType>{
  avatar: DefaultAvatar,
  name: {
    vi: '',
    en: '',
  },
  description: {
    vi: '',
    en: '',
  },
})
/// Function

/// Search name of branch
const inputSearchManager = (
  paginator: PaginatorType,
  filters: SelectedFilterType
) => {
  console.log('Get manager1')
  let sortField = ''
  if (filters.sortOrder == 1) {
    sortField = 'name'
  } else if (filters.sortOrder == -1) {
    sortField = '-name'
  }
  let query: any = {
    limit: paginator.limit,
    offset: paginator.offset,
    name: filters.name,
    sortField: sortField,
  }
  getListEmployees(query)
}

/// Click select all branch
const clickSelectAllManager = async () => {
  let query: any = {
    noLimit: true,
  }
  const options: any = {
    method: 'get',
    query: query,
  }
  const { data, error, status } = await CallAPI(
    APIPathEmployee.GET_LIST,
    options,
    toast,
    t,
    true
  )
  /// Check error
  if (status.value !== APIStatus.SUCCESS) {
    return
  }
  const value: any = data.value
  const result = value.data
  let listData: any = []
  result.list.forEach((element: any) => {
    listData.push({
      name: element.user?.fullName || '',
      avatar: element.user?.avatar?.location || '',
      selected: true,
      data: element,
    })
  })
  instance.value.managerSelected = listData
}

/// Get list employees
const getListEmployees = async (query: any) => {
  const options: any = {
    method: 'get',
    query: query,
  }
  const { data, error, status } = await CallAPI(
    APIPathEmployee.GET_LIST,
    options,
    toast,
    t,
    true
  )
  /// Check error
  if (status.value !== APIStatus.SUCCESS) {
    return
  }
  const value: any = data.value
  const result = value.data
  let paginator = result.paginator

  let listPage: any = []
  result.list.forEach((element: any) => {
    listPage.push({
      name: element.user?.fullName || '',
      avatar: element.user?.avatar?.location || '',
      selected: false,
      data: element,
    })
  })
  listPage = mapNoToList(listPage, paginator.offset)
  console.log(paginator)
  instance.value.managerPage = listPage
  instance.value.managerPaginator = paginator
}

/// Click select manager
const clickSelectManager = (
  all: boolean,
  allSelected: SelectedType[],
  paginator: PaginatorType,
  filters: SelectedFilterType
) => {
  /// show data.
  // if (all) {
  //   if (instance.value.managerKeep.length > 5) {
  //     instance.value.managerDisplay = instance.value.managerKeep.slice(0, 5)
  //     instance.value.managerDisplayMore = true
  //   } else {
  //     instance.value.managerDisplay = [...instance.value.managerKeep]
  //     instance.value.managerDisplayMore = false
  //   }
  // } else {
  //   if (allSelected.length > 5) {
  //     instance.value.managerDisplay = allSelected.slice(0, 5)
  //     instance.value.managerDisplayMore = true
  //     /// is more true
  //   } else {
  //     instance.value.managerDisplay = [...allSelected]
  //     instance.value.managerDisplayMore = false
  //     /// is more false
  //   }
  // }

  instance.value.managerSelected = allSelected
  instance.value.managerAll = all
  instance.value.managerVisible = false
}

/// Change name
const changeName = (evt: any) => {
  CreateDepartmentValidate.name(instance, t, toast, locale.value)
}
/// Select avatar
const onFileSelectAvatar = (event: any) => {
  const file = event.files[0]
  const reader = new FileReader()
  instance.value.avatarFile = file
  reader.onload = async (e) => {
    let image = new Image()
    //Set the Base64 string return from FileReader as source.
    image.src = `${e.target?.result ?? ''}`
    instance.value.avatar = `${e.target?.result ?? ''}`
    image.onload = async () => {
      const height = image.height
      const width = image.width
      instance.value.widthAvatar = width
      instance.value.heightAvatar = height
      CreateDepartmentValidate.avatar(instance, t)
    }
  }
  reader.readAsDataURL(file)
}

/// Click back
const clickBack = () => {
  router.back()
}

/// Click close manager
const clickCloseManager = () => {
  instance.value.managerVisible = false
}

/// Create save department
const clickSave = async (evt: any) => {
  const validate = await CreateDepartmentValidate.all(
    instance,
    t,
    toast,
    locale.value
  )
  if (!validate) {
    return
  }

  const name = instance.value?.name ?? {}
  const description = instance.value.description ?? {}

  let formData = new FormData()
  formData.append('file', instance.value.avatarFile)
  formData.append('name', JSON.stringify(name))
  formData.append('description', JSON.stringify(description))
  const options: any = {
    method: Method.POST,
    body: formData,
  }
  const { data, error, status } = await CallAPI(
    APIPathDepartment.POST_CREATE,
    options,
    toast,
    t,
    true,
    true
  )
  /// Check error
  if (status.value !== APIStatus.SUCCESS) {
    return
  }
  toast.add({
    severity: Toast.SUCCESS,
    summary: t('success'),
    detail: t('name_created_successfully', { name: t('department') }),
    life: Toast.DURATION,
  })
  const result: any = data.value
  return result.data
}

/// Click manger show dialog
const clickManager = () => {
  // console.log('clickManager')
  instance.value.managerVisible = true
  // initData()
}

/// Init data
const initData = () => {
  let query: any = {
    limit: 10,
    offset: 0,
  }
  getListEmployees(query)
}

initData()
</script>

<style scoped lang="scss">
@import url('~/assets/scss/staff/CreateDepartment.scss');
</style>
