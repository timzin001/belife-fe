<template>
  <div class="w-full h-full left-menu">
    <!-- close for mobile -->
    <div
      class="menu-close items-center justify-center absolute z-1 top-0 right-[10px] mt-[16px] h-[35px] w-[35px] right-0 rounded-full hover-button cursor-pointer"
      @click="clickClose"
    >
      <img :src="Times" />
    </div>
    <div
      v-if="instance.account"
      class="personal flex ml-[10px] mr-[10px] items-center justify-start pt-[17px] pb-[17px]"
    >
      <img
        :src="getAvatarOfUser()"
        alt="Flag"
        class="image rounded-[5px] w-[32px] h-[32px]"
      />
      <div class="text-[16px] font-bold ml-[5px]">
        {{ getFullNameOfUser() }}
      </div>
    </div>
    <div class="w-full pl-[10px] pr-[10px]">
      <Select
        v-if="instance.orgs.length"
        v-model="org"
        :options="getListOptions()"
        optionLabel="name"
        @value-change="changeOrg"
        :placeholder="$t('choose_organization')"
        class="h-[32px] w-full"
      >
        <template #value="slotProps">
          <div
            v-if="slotProps.value"
            class="flex items-center justify-start h-[32px] pl-[10px]"
          >
            <img
              :alt="slotProps.value.name"
              :src="slotProps.value.logo?.location || DefaultAvarar"
              style="width: 18px"
              class="rounded-[3px]"
            />
            <div class="text-[14px] ml-[5px]">
              {{ slotProps.value.name[locale] }}
            </div>
          </div>
          <div
            v-else
            class="flex items-center justify-start h-[32px] pl-[10px]"
          >
            {{ slotProps.placeholder }}
          </div>
        </template>
        <template #option="slotProps">
          <div class="flex items-center justify-center pl-[10px] h-[32px]">
            <img
              :alt="slotProps.option.name"
              :src="slotProps.option.logo?.location || DefaultAvarar"
              style="width: 18px"
              class="rounded-[3px]"
            />
            <div class="text-[14px] ml-[5px]">
              {{ slotProps.option.name[locale] }}
            </div>
          </div>
        </template>
      </Select>
    </div>
    <PanelMenu
      :model="menus"
      multiple
      class="ml-[10px] mr-[10px] mt-[10px]"
      visible="true"
    />
  </div>
</template>

<script setup lang="ts">
/// Imports
import type { LeftMenuType } from '~/types/common/LeftMenuType'
import Times from '~/assets/icons/times.svg'
import { GlobalStore } from '~/store/Global'
import DefaultAvarar from '~/assets/images/default-avatar.png'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

/// Define
const emits = defineEmits(['clickClose'])
const store = GlobalStore()
const toast = useToast()
const { t, locale } = useI18n()
const account = ref(store.getAccount())
const org = ref(store.getOrg())
const menus = computed(() => initMenu())
const instance = ref<LeftMenuType>({
  menus: [],
  orgs: [],
  account: null,
})

/// Function
/// Get list options
const getListOptions = () => {
  if (!account.value) {
    return []
  }
  // return account.value.organizations ||
  return []
}
/// Get full name of user
const getFullNameOfUser = () => {
  const user: any = store.getAccount()
  if (!user || !user.fullName) {
    return ''
  }
  return user.fullName[locale.value]
}
/// Get avatar of user
const getAvatarOfUser = () => {
  const user: any = store.getAccount()
  if (!user || !user.avatar || !user.avatar.location) {
    return DefaultAvarar
  }
  return user.avatar.location
}
/// Click sign out
const clickSignOut = async () => {
  /// Clear
  store.signOut()
  /// Move to login
  await navigateTo({ path: PathUser.SIGN_IN })
}
/// Click proifle
const clickProfile = async () => {
  /// Move to profile
  await navigateTo({ path: Path.PROFILE })
}
/// Move to position org
const clickPositionOrg = async () => {
  await navigateTo({ path: PathStaff.POSITIONS })
}
/// Move to branches org
const clickBranchesOrg = async () => {
  await navigateTo({ path: PathStaff.BRANCHES })
}
const clickEmployeesOrg = async () => {
  await navigateTo({ path: PathStaff.EMPLOYEES })
}
const clickDepartmentsOrg = async () => {
  await navigateTo({ path: PathStaff.DEPARTMENTS })
}
const clickInform = async () => {
  await navigateTo({ path: Path.INFORM })
}

const clickRecruit = async () => {
  await navigateTo({ path: Path.RECRUIT })
}

const clickEvent = async () => {
  await navigateTo({ path: Path.EVENT })
}
const clickCreateOrg = async () => {
  await navigateTo({ path: PathOrg.CREATE_ORG })
}
const clickClose = () => {
  emits('clickClose')
}
/// Change org
const changeOrg = async (evt: any) => {
  const options: any = {
    method: Method.POST,
    body: {
      idOfOrg: evt._id,
    },
  }
  // const { data, error, status } = await CallAPI(
  //   APIPathAccount.POST_SIGN_IN_ORG_AUTH,
  //   options,
  //   toast,
  //   t,
  //   false
  // )

  /// Check error
  // if (status.value !== APIStatus.SUCCESS) {
  //   return
  // }
  // const result: any = data.value
  // /// Save auth
  // store.setOrgAuth(result.data.auth)
  // /// Save org
  // store.setOrg(result.data.org)
  /// Move to
  /// Get user info
  await navigateTo({
    path: Path.INFORM_OF_ORG,
  })
}

const initMenu = () => {
  // if (!store.isSignIn()) {
  //   return menuNoAuth({
  //     recruit: clickRecruit,
  //     inform: clickInform,
  //     event: clickEvent,
  //   })
  // }
  if (!org.value) {
    return menuUser({
      createOrg: clickCreateOrg,
      recruit: clickRecruit,
      inform: clickInform,
      event: clickEvent,
      profile: clickProfile,
      signOut: clickSignOut,
    })
  }
  return menuOrganization({
    signOut: clickSignOut,
    positionsOrg: clickPositionOrg,
    branchesOrg: clickBranchesOrg,
    departmentsOrg: clickDepartmentsOrg,
    employeesOrg: clickEmployeesOrg,
    profile: clickProfile,
  })
  return
}

watch(
  () => store.getAccount(),
  (value) => {
    /// Set org
    account.value = value
  }
)
watch(
  () => store.getOrg(),
  (value) => {
    /// Set org
    org.value = value
  }
)
</script>
<style scoped lang="scss">
@import url('~/assets/scss/components/LeftMenu.scss');
</style>
