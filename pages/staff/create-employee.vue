<template>
  <div class="page">
    <div class="card rounded-[8px] create-employee">
      <div
        class="text-[25px] font-bold ml-[0px] mb-[20px] w-full flex items-center justify-center"
      >
        {{ $t('create_name', { name: $t('employee').toLocaleLowerCase() }) }}
      </div>

      <div class="contain items-center justify-center">
        <div class="inner">
          <div>
            <div class="flex items-center justify-start w-full">
              <label class="label" for="user-code"
                >{{ $t('user_code') }}<span>*</span></label
              >
              <InputText
                id="user-code"
                autocomplete="off"
                class="flex-1"
                v-model="instance.userCode"
                @blur="changeUserCode"
                @value-change="changeUserCode"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('user_code').toLocaleLowerCase(),
                  })
                "
              />
            </div>
            <Message
              v-if="instance.userCodeError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.userCodeError }}</Message
            >
          </div>
          <div class="w-full line h-[1px] mt-[20px]"></div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start">
              <label class="label">{{ $t('avatar') }}</label>
              <img :src="instance.avatar" alt="Image" class="w-full image" />
            </div>
          </div>

          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label class="label">{{ $t('full_name') }}</label>
              <div class="show-data flex items-center justify-start pl-[10px]">
                {{ instance.user?.fullName[locale] ?? '' }}
              </div>
            </div>
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label class="label">{{ $t('phone_number') }}</label>
              <div class="show-data flex items-center justify-start pl-[10px]">
                {{ instance.user?.phoneNumber ?? '' }}
              </div>
            </div>
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label class="label">{{ $t('nick_name') }}</label>
              <div class="show-data flex items-center justify-start pl-[10px]">
                {{ instance.user?.nickName ?? '' }}
              </div>
            </div>
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label class="label">{{ $t('gender') }}</label>
              <div class="show-data flex items-center justify-start pl-[10px]">
                {{ instance.user?.gender[locale] ?? '' }}
              </div>
            </div>
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label class="label">{{ $t('address') }}</label>
              <div class="show-data flex items-center justify-start pl-[10px]">
                {{ instance.user?.address[locale] ?? '' }}
              </div>
            </div>
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label class="label">{{ $t('date_of_birth') }}</label>
              <div class="show-data flex items-center justify-start pl-[10px]">
                {{
                  formatDateTimeFromString(
                    instance.user?.dateOfBirth.value,
                    locale,
                    true
                  )
                }}
              </div>
            </div>
          </div>

          <div class="w-full line h-[1px] mt-[20px] mb-[20px]"></div>

          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('branch') }}<span>*</span></div>
              <div class="group-message">
                <Message
                  v-if="instance.branchError"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ instance.branchError }}</Message
                >
              </div>

              <div
                class="flex-1 grid grid-flow-row-dense grid-cols-3 gap-[5px]"
              >
                <div
                  class="chip flex items-center pl-[5px] pr-[5px]"
                  v-for="(item, index) in instance.branchDisplay"
                  @click="clickDeleteBranch(item)"
                >
                  <img
                    :src="`${getAvatar(item)}`"
                    class="w-[20px] icon-chip pr-[5px]"
                  />
                  <div class="flex-1 truncate">{{ item.name[locale] }}</div>
                  <img :src="Times" class="w-[12px] rounded-[50px]" />
                </div>

                <div
                  class="chip-more flex items-center pl-[5px] pr-[5px]"
                  v-if="instance.branchDisplayMore"
                  @click="clickViewMoreBranch"
                >
                  <div class="flex-1">{{ $t('view_more') }}</div>
                  <img
                    :src="AngleRight"
                    class="w-[18px] icon p-button-icon-right"
                  />
                </div>
              </div>
              <img
                class="w-[15px] h-[15px] pencil"
                :src="Pencil"
                @click="clickBranch"
              />
            </div>
          </div>
          <!-- Start department -->
          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('department') }}<span>*</span></div>
              <div class="group-message">
                <Message
                  v-if="instance.departmentError"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ instance.departmentError }}</Message
                >
              </div>
              <div
                class="flex-1 grid grid-flow-row-dense grid-cols-3 gap-[5px]"
              >
                <div
                  class="chip flex items-center pl-[5px] pr-[5px]"
                  v-for="(item, index) in instance.departmentDisplay"
                  @click="clickDeleteDepartment(item)"
                >
                  <img
                    :src="`${getAvatar(item)}`"
                    class="w-[20px] icon-chip pr-[5px]"
                  />
                  <div class="flex-1 truncate">{{ item.name[locale] }}</div>
                  <img :src="Times" class="w-[12px] rounded-[50px]" />
                </div>

                <div
                  class="chip-more flex items-center pl-[5px] pr-[5px]"
                  v-if="instance.departmentDisplayMore"
                >
                  <div class="flex-1">{{ $t('view_more') }}</div>
                  <img
                    :src="AngleRight"
                    class="w-[18px] icon p-button-icon-right"
                  />
                </div>
              </div>
              <img
                class="w-[15px] h-[15px] pencil"
                :src="Pencil"
                @click="clickDepartment"
              />
            </div>
          </div>

          <!-- End department -->

          <!-- Start position -->
          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('position') }}<span>*</span></div>
              <div class="group-message">
                <Message
                  v-if="instance.positionError"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ instance.positionError }}</Message
                >
              </div>
              <div
                class="flex-1 grid grid-flow-row-dense grid-cols-3 gap-[5px]"
              >
                <div
                  class="chip flex items-center pl-[5px] pr-[5px]"
                  v-for="(item, index) in instance.positionDisplay"
                  @click="clickDeletePosition(item)"
                >
                  <img
                    :src="`${getAvatar(item)}`"
                    class="w-[20px] icon-chip pr-[5px]"
                  />
                  <div class="flex-1 truncate">{{ item.name[locale] }}</div>
                  <img :src="Times" class="w-[12px] rounded-[50px] remove" />
                </div>

                <div
                  class="chip-more flex items-center pl-[5px] pr-[5px]"
                  v-if="instance.positionDisplayMore"
                  @click="clickViewMorePosition"
                >
                  <div class="flex-1">{{ $t('view_more') }}</div>
                  <img
                    :src="AngleRight"
                    class="w-[18px] icon p-button-icon-right"
                  />
                </div>
              </div>
              <img
                class="w-[15px] h-[15px] pencil"
                :src="Pencil"
                @click="clickPosition"
              />
            </div>
          </div>
          <!-- End position -->
          <div class="w-full line h-[1px] mt-[20px]"></div>
          <div class="mt-[20px]">
            <div class="flex items-center justify-start w-full">
              <label class="label" for="start-date"
                >{{ $t('start_date') }}<span>*</span></label
              >
              <DatePicker
                class="flex-1"
                v-model="instance.startDateOfWork"
                @blur="changeStartDateOfWork"
                @value-change="changeStartDateOfWork"
                :dateFormat="instance.dateFormat"
                :placeholder="instance.datePlaceHolder"
                :minDate="instance.currentDate"
              />
            </div>
            <Message
              v-if="instance.startDateOfWorkError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.startDateOfWorkError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label class="label" for="end-date">{{ $t('end_date') }}</label>
              <DatePicker
                class="flex-1"
                v-model="instance.endDateOfWork"
                :dateFormat="instance.dateFormat"
                :placeholder="instance.datePlaceHolder"
                :minDate="instance.currentDate"
              />
            </div>
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
              :label="$t('save')"
              severity="success"
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
      :headerName="$t('branch')"
      :title="$t('select_name', { name: $t('branch').toLocaleLowerCase() })"
      :visible="instance.branchVisible"
      :listPage="instance.branchPage"
      :paginator="instance.branchPaginator"
      :all="instance.branchAll"
      :allSelected="instance.branchSelected"
      @click-select-all="clickSelectAllBranch"
      @change-page="inputSearchBranch"
      @click-select="clickSelectBranch"
      @click-sort="inputSearchBranch"
      @input-search="inputSearchBranch"
      @click-clear="inputSearchBranch"
      @click-close="clickCloseBranch"
    />
    <SelectedDialog
      :headerName="$t('department')"
      :title="$t('select_name', { name: $t('department').toLocaleLowerCase() })"
      :visible="instance.departmentVisible"
      :listPage="instance.departmentPage"
      :paginator="instance.departmentPaginator"
      :all="instance.departmentAll"
      :allSelected="instance.departmentSelected"
      @click-select-all="clickSelectAllDepartment"
      @change-page="inputSearchDepartment"
      @click-select="clickSelectDepartment"
      @click-sort="inputSearchDepartment"
      @input-search="inputSearchDepartment"
      @click-clear="inputSearchDepartment"
      @click-close="clickCloseDepartment"
    />
    <SelectedDialog
      :headerName="$t('position')"
      :title="$t('select_name', { name: $t('position').toLocaleLowerCase() })"
      :visible="instance.positionVisible"
      :listPage="instance.positionPage"
      :paginator="instance.positionPaginator"
      :all="instance.positionAll"
      :allSelected="instance.positionSelected"
      @click-select-all="clickSelectAllPosition"
      @change-page="inputSearchPosition"
      @click-select="clickSelectPosition"
      @click-sort="inputSearchPosition"
      @input-search="inputSearchPosition"
      @click-clear="inputSearchPosition"
      @click-close="clickClosePosition"
    />
    <InformDialog
      :title="instance.informTitle"
      :visible="instance.informVisible"
      :message="instance.informMessage"
      :data="instance.informTrack"
      @click-ok="clickOkInform"
      @click-close="clickCloseInform"
    />
    <ViewSelectedDialog
      :headerName="instance.viewHeaderName"
      :title="instance.viewTitle"
      :visible="instance.viewVisible"
      :listPage="instance.viewPage"
      :paginator="instance.viewPaginator"
      @input-search="inputSearchView"
      @change-page="inputSearchView"
      @click-sort="inputSearchView"
      @click-close="clickCloseView"
    />
  </div>
</template>
<script setup lang="ts">
/// Import
import { ref } from 'vue'
import type { CreateEmployeeType } from '~/types/staff/CreateEmployeeType'
import type { PaginatorType } from '~/types/common/PaginatorType'
import Times from '~/assets/icons/times.svg'
import { GlobalStore } from '~/store/Global'
import { useToast } from 'primevue/usetoast'
import SelectedDialog from '~/components/SelectedDialog.vue'
import Pencil from '~/assets/icons/pencil.svg'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import ArrowLeft from '~/assets/icons/arrow-left.svg'
import Save from '~/assets/icons/save.svg'
import AngleRight from '~/assets/icons/angle-right.svg'
import type {
  SelectedType,
  SelectedFilterType,
} from '~/types/common/SelectedType'
import { CreateEmployeeValidate } from '~/validate/staff/CreateEmployeeValidate'
import ViewSelectedDialog from '~/components/ViewSelectedDialog.vue'

/// Define
const store = GlobalStore()
const toast = useToast()
const router = useRouter()
const { t, locale } = useI18n()
const instance = ref(<CreateEmployeeType>{
  avatar: DefaultAvatar,
  positionVisible: false,

  branchVisible: false,
  departmentVisible: false,
  description: {
    en: '',
    vi: '',
  },
})
/// Function

const clickOkInform = () => {
  if (instance.value.informTrack.type === 'branch') {
    handleDeleteBranch(instance.value.informTrack.data)
  } else if (instance.value.informTrack.type === 'department') {
    handleDeleteDepartment(instance.value.informTrack.data)
  } else if (instance.value.informTrack.type === 'position') {
    handleDeletePosition(instance.value.informTrack.data)
  }
  clearInform()
  instance.value.informVisible = false
}

const clickViewMoreBranch = () => {
  instance.value.viewTrackType = 'branch'
  instance.value.viewHeaderName = t('branch')
  instance.value.viewTitle = t('name_selected', { name: t('branch') })
  instance.value.viewLimit =
    instance.value.branchSelected.length > 10
      ? 10
      : instance.value.branchSelected.length
  instance.value.viewOffset = 0
  instance.value.viewPaginator = {
    total: instance.value.branchSelected.length,
    limit: instance.value.viewLimit,
    offset: 0,
  }
  instance.value.viewPage = instance.value.branchSelected.slice(
    0,
    instance.value.viewLimit
  )
  instance.value.viewPage = mapNoToList(
    instance.value.viewPage,
    instance.value.viewOffset
  )
  instance.value.viewVisible = true
}

const clickViewMorePosition = () => {
  instance.value.viewTrackType = 'position'
  instance.value.viewHeaderName = t('position')
  instance.value.viewTitle = t('name_selected', { name: t('position') })
  instance.value.viewLimit =
    instance.value.positionSelected.length > 10
      ? 10
      : instance.value.positionSelected.length
  instance.value.viewOffset = 0
  instance.value.viewPaginator = {
    total: instance.value.positionSelected.length,
    limit: instance.value.viewLimit,
    offset: 0,
  }
  instance.value.viewPage = instance.value.positionSelected.slice(
    0,
    instance.value.viewLimit
  )
  instance.value.viewPage = mapNoToList(
    instance.value.viewPage,
    instance.value.viewOffset
  )
  instance.value.viewVisible = true
}

const clickCloseInform = () => {
  clearInform()
  instance.value.informVisible = false
}

const clickCloseView = () => {
  clearView()
  instance.value.viewVisible = false
}

const clearView = () => {
  instance.value.viewTrackType = ''
  instance.value.viewHeaderName = ''
  instance.value.viewTitle = ''
  instance.value.viewLimit = 0
  instance.value.viewOffset = 0
  instance.value.viewPage = []
}

const clearInform = () => {
  instance.value.informTitle = ''
  instance.value.informMessage = ''
  instance.value.informTrack = null
}

const handleDeleteDepartment = (value: SelectedType) => {
  if (instance.value.departmentAll) {
    instance.value.departmentAll = false
  }
  instance.value.departmentSelected = instance.value.departmentSelected.filter(
    (item) => {
      return item.data._id != value.data._id
    }
  )
  handleSetDataAndValidateDepartment()
}

const handleSetDataAndValidateDepartment = () => {
  if (instance.value.departmentSelected.length > 5) {
    instance.value.departmentDisplay = instance.value.departmentSelected.slice(
      0,
      5
    )
    instance.value.departmentDisplayMore = true
  } else {
    instance.value.departmentDisplay = [...instance.value.departmentSelected]
    instance.value.departmentDisplayMore = false
  }
  CreateEmployeeValidate.department(instance, t)
}

/// Click select department
const clickSelectDepartment = (
  all: boolean,
  allSelected: SelectedType[],
  paginator: PaginatorType,
  filters: SelectedFilterType
) => {
  instance.value.departmentAll = all
  instance.value.departmentSelected = allSelected

  handleSetDataAndValidateDepartment()

  instance.value.departmentVisible = false
}

const handleDeleteBranch = (value: SelectedType) => {
  if (instance.value.branchAll) {
    instance.value.branchAll = false
  }
  instance.value.branchSelected = instance.value.branchSelected.filter(
    (item) => {
      return item.data._id != value.data._id
    }
  )
  handleSetDataAndValidateBranch()
}
/// Click select branch
const clickSelectBranch = (
  all: boolean,
  allSelected: SelectedType[],
  paginator: PaginatorType,
  filters: SelectedFilterType
) => {
  instance.value.branchAll = all
  instance.value.branchSelected = allSelected
  handleSetDataAndValidateBranch()
  instance.value.branchVisible = false
}

const handleSetDataAndValidateBranch = () => {
  if (instance.value.branchSelected.length > 5) {
    instance.value.branchDisplay = instance.value.branchSelected.slice(0, 5)
    instance.value.branchDisplayMore = true
  } else {
    instance.value.branchDisplay = [...instance.value.branchSelected]
    instance.value.branchDisplayMore = false
  }
  CreateEmployeeValidate.branch(instance, t)
}

/// click delete branch
const clickDeleteBranch = async (value: any) => {
  instance.value.informTitle = t('delete_name', {
    name: t('branch').toLocaleLowerCase(),
  })
  instance.value.informMessage = t(
    'are_you_sure_you_want_to_delete_this_name',
    {
      name: value.data.name[locale.value],
    }
  )
  instance.value.informTrack = { type: 'branch', data: value }
  instance.value.informVisible = true
}

const handleDeletePosition = (value: SelectedType) => {
  if (instance.value.positionAll) {
    instance.value.positionAll = false
  }
  instance.value.positionSelected = instance.value.positionSelected.filter(
    (item) => {
      return item.data._id != value.data._id
    }
  )
  handleSetDataAndValidatePosition()
}

/// Click select position
const clickSelectPosition = (
  all: boolean,
  allSelected: SelectedType[],
  paginator: PaginatorType,
  filters: SelectedFilterType
) => {
  instance.value.positionAll = all
  instance.value.positionSelected = allSelected
  handleSetDataAndValidatePosition()
  instance.value.positionVisible = false
}

const handleSetDataAndValidatePosition = () => {
  if (instance.value.positionSelected.length > 5) {
    instance.value.positionDisplay = instance.value.positionSelected.slice(0, 5)
    instance.value.positionDisplayMore = true
  } else {
    instance.value.positionDisplay = [...instance.value.positionSelected]
    instance.value.positionDisplayMore = false
  }
  CreateEmployeeValidate.position(instance, t)
}

/// click delete position
const clickDeletePosition = async (value: any) => {
  instance.value.informTitle = t('delete_name', {
    name: t('position').toLocaleLowerCase(),
  })
  instance.value.informMessage = t(
    'are_you_sure_you_want_to_delete_this_name',
    {
      name: value.data.name[locale.value],
    }
  )
  instance.value.informTrack = { type: 'position', data: value }
  instance.value.informVisible = true
}

/// Click delete department
const clickDeleteDepartment = async (value: any) => {
  instance.value.informTitle = t('delete_name', {
    name: t('department').toLocaleLowerCase(),
  })
  instance.value.informMessage = t(
    'are_you_sure_you_want_to_delete_this_name',
    {
      name: value.data.name[locale.value],
    }
  )
  instance.value.informTrack = { type: 'department', data: value }
  instance.value.informVisible = true
}

/// Get avatar
const getAvatar = (item: any) => {
  if (!item || !item.avatar) {
    return DefaultAvatar
  }
  return item.avatar
}

const handleInputSearchView = (
  paginator: PaginatorType,
  filters: SelectedFilterType,
  filterValue: SelectedType[]
) => {
  filterValue.sort((value1, value2) => {
    if (filters.sortOrder == 1) {
      return (value1.name[locale.value] || '').localeCompare(
        value2.name[locale.value] || ''
      )
    }
    return (value2.name[locale.value] || '').localeCompare(
      value1.name[locale.value] || ''
    )
  })

  //// Paging
  let start = paginator.offset
  let end = paginator.offset + paginator.limit
  let newList = filterValue.slice(start, end)

  newList = mapNoToList(newList, paginator.offset)
  instance.value.viewPage = newList
  instance.value.viewPaginator = paginator
}

/// Change page view
const inputSearchView = (
  paginator: PaginatorType,
  filters: SelectedFilterType
) => {
  let filterValue: SelectedType[] = []
  if (instance.value.viewTrackType === 'branch') {
    filterValue = instance.value.branchSelected.filter((item) => {
      return (item.name[locale.value] || '').includes(filters.name || '')
    })
  } else if (instance.value.viewTrackType === 'position') {
    filterValue = instance.value.positionSelected.filter((item) => {
      return (item.name[locale.value] || '').includes(filters.name || '')
    })
  } else if (instance.value.viewTrackType === 'department') {
    filterValue = instance.value.departmentSelected.filter((item) => {
      return (item.name[locale.value] || '').includes(filters.name || '')
    })
  }
  handleInputSearchView(paginator, filters, filterValue)
}

/// Change page position
const inputSearchPosition = (
  paginator: PaginatorType,
  filters: SelectedFilterType
) => {
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
  getListPositions(query)
}

/// Input search department
const inputSearchDepartment = (
  paginator: PaginatorType,
  filters: SelectedFilterType
) => {
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
  getListDepartments(query)
}
/// Search name of branch
const inputSearchBranch = (
  paginator: PaginatorType,
  filters: SelectedFilterType
) => {
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
  getListBranches(query)
}

/// Click back
const clickBack = () => {
  router.back()
}

/// Click close position
const clickClosePosition = () => {
  instance.value.positionVisible = false
  CreateEmployeeValidate.position(instance, t)
}
/// Click close department
const clickCloseDepartment = () => {
  instance.value.departmentVisible = false
  CreateEmployeeValidate.department(instance, t)
}
/// Click close branch
const clickCloseBranch = () => {
  instance.value.branchVisible = false
  CreateEmployeeValidate.branch(instance, t)
}
/// Change user code
const changeUserCode = async (evt: any) => {
  CreateEmployeeValidate.userCode(instance, t, toast)
}

/// Change start date of work
const changeStartDateOfWork = async (evt: any) => {
  CreateEmployeeValidate.startDateOfWork(instance, t)
}

const clickPosition = () => {
  instance.value.positionVisible = true
}
const clickBranch = () => {
  instance.value.branchVisible = true
}
const clickDepartment = () => {
  instance.value.departmentVisible = true
}

/// Create save employee
const clickSave = async () => {
  const validate = await CreateEmployeeValidate.all(
    instance,
    t,
    toast,
    locale.value
  )

  if (!validate) {
    return
  }
  /// UserCode
  /// Branches ids
  /// Department ids
  /// Position
  const userCode = instance.value.userCode || ''
  const branchAll = instance.value.branchAll || false
  const departmentAll = instance.value.departmentAll || false
  const positionAll = instance.value.positionAll || false
  const branchAllSelected = instance.value.branchSelected || []
  const departmentAllSelected = instance.value.departmentSelected || []
  const positionAllSelected = instance.value.positionSelected || []
  let branchIds = branchAllSelected.map((item) => item.data._id)
  let departmentIds = departmentAllSelected.map((item) => item.data._id)
  let positionIds = positionAllSelected.map((item) => item.data._id)
  let startDateOfWork = instance.value.startDateOfWork.toISOString()
  let endDateOfWork = instance.value.endDateOfWork.toISOString()
  let description = instance.value.description || {}

  const sendParam = {
    userCode: userCode,
    branchAll: branchAll,
    departmentAll: departmentAll,
    positionAll: positionAll,
    branchesSelected: branchIds,
    departmentsSelected: departmentIds,
    positionsSelected: positionIds,
    startDateOfWork: startDateOfWork,
    endDateOfWork: endDateOfWork,
    description: JSON.stringify(description),
  }
  const options: any = {
    method: Method.POST,
    body: sendParam,
  }
  const { data, error, status } = await CallAPI(
    APIPathEmployee.POST_CREATE,
    options,
    toast,
    t
  )
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
}

const getListPositions = async (query: any) => {
  const options: any = {
    method: 'get',
    query: query,
  }
  const { data, error, status } = await CallAPI(
    APIPathPosition.GET_LIST,
    options,
    toast,
    t,
    true
  )
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
  const value: any = data.value
  const result = value.data
  let paginator = result.paginator

  let listPage: any = []
  result.list.forEach((element: any) => {
    listPage.push({
      name: element.name,
      avatar: element.avatar.location,
      selected: false,
      data: element,
    })
  })

  listPage = mapNoToList(listPage, paginator.offset)
  instance.value.positionPage = listPage
  instance.value.positionPaginator = paginator
}

const getListDepartments = async (query: any) => {
  const options: any = {
    method: 'get',
    query: query,
  }
  const { data, error, status } = await CallAPI(
    APIPathDepartment.GET_LIST,
    options,
    toast,
    t,
    true
  )
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
  const value: any = data.value
  const result = value.data
  let paginator = result.paginator

  let listPage: any = []
  result.list.forEach((element: any) => {
    listPage.push({
      name: element.name,
      avatar: element.avatar.location,
      selected: false,
      data: element,
    })
  })
  listPage = mapNoToList(listPage, paginator.offset)
  instance.value.departmentPage = listPage
  instance.value.departmentPaginator = paginator
}
/// Click select all department
const clickSelectAllDepartment = async () => {
  let query: any = {
    noLimit: true,
  }
  const options: any = {
    method: 'get',
    query: query,
  }
  const { data, error, status } = await CallAPI(
    APIPathDepartment.GET_LIST,
    options,
    toast,
    t,
    true
  )
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
  const value: any = data.value
  const result = value.data
  let listData: any = []
  result.list.forEach((element: any) => {
    listData.push({
      name: element.name,
      avatar: element.avatar.location,
      selected: true,
      data: element,
    })
  })
  instance.value.departmentSelected = listData
}
/// Click select all position
const clickSelectAllPosition = async () => {
  let query: any = {
    noLimit: true,
  }
  const options: any = {
    method: 'get',
    query: query,
  }
  const { data, error, status } = await CallAPI(
    APIPathPosition.GET_LIST,
    options,
    toast,
    t,
    true
  )
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
  const value: any = data.value
  const result = value.data
  let listData: any = []
  result.list.forEach((element: any) => {
    listData.push({
      name: element.name,
      avatar: element.avatar.location,
      selected: true,
      data: element,
    })
  })
  instance.value.positionSelected = listData
}

/// Click select all branch
const clickSelectAllBranch = async () => {
  let query: any = {
    noLimit: true,
  }
  const options: any = {
    method: 'get',
    query: query,
  }
  const { data, error, status } = await CallAPI(
    APIPathBranch.GET_LIST,
    options,
    toast,
    t,
    true
  )
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
  const value: any = data.value
  const result = value.data
  let listData: any = []
  result.list.forEach((element: any) => {
    listData.push({
      name: element.name,
      avatar: element.avatar.location,
      selected: true,
      data: element,
    })
  })
  instance.value.branchSelected = listData
}
/// Get list branches
const getListBranches = async (query: any) => {
  const options: any = {
    method: 'get',
    query: query,
  }
  const { data, error, status } = await CallAPI(
    APIPathBranch.GET_LIST,
    options,
    toast,
    t,
    true
  )
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
  const value: any = data.value
  const result = value.data
  let paginator = result.paginator

  let listPage: any = []
  result.list.forEach((element: any) => {
    listPage.push({
      name: element.name,
      avatar: element.avatar.location,
      selected: false,
      data: element,
    })
  })

  listPage = mapNoToList(listPage, paginator.offset)
  instance.value.branchPage = listPage
  instance.value.branchPaginator = paginator
}

/// Get list data
const getListData = () => {
  /// Get position
  /// Get department
  /// Get branch
  let query: any = {
    limit: 10,
    offset: 0,
  }
  Promise.all([
    getListPositions(query),
    getListBranches(query),
    getListDepartments(query),
  ])
}

/// Init data
const initData = () => {
  instance.value.dateFormat = getDateFormatPicker(locale.value)
  instance.value.datePlaceHolder = getDateFormat(locale.value)
  instance.value.currentDate = new Date()
  getListData()
}

initData()
watch(
  () => store.getLanguage(),
  (value) => {
    /// Set language
    initData()
  }
)
</script>

<style scoped lang="scss">
@import url('~/assets/scss/staff/CreateEmployee.scss');
</style>
