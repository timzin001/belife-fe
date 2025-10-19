<template>
  <div class="page flex flex-col">
    <div
      class="flex-1 h-full w-full card profile flex flex-col items-center justify-center"
    >
      <div
        class="text-[25px] font-bold ml-[0px] mb-[20px] w-full flex items-center justify-center"
      >
        {{ $t('your_profile') }}
      </div>
      <div class="group-introduction">
        <div class="w-full flex items-center justify-center mb-[20px]">
          <span class="text-[20px] font-[700] ml-[10px] mr-[10px]">{{
            $t('introduction')
          }}</span>
        </div>
        <div class="w-full line h-[1px] mb-[20px]"></div>
        <div class="flex group-description">
          <div class="flex-1 relative img-description">
            <img :src="getImgDescription()" alt="logo" class="image" />
            <div class="absolute top-[0px] right-[0px]">
              <FileUpload
                ref="imgDescriptionUpload"
                @select="onFileSelectImgDescription"
                accept="image/*"
                :maxFileSize="1000000"
              >
                <template #header="{ chooseCallback, files }">
                  <div class="flex flex-wrap justify-between items-center">
                    <img
                      class="w-[15px] h-[15px] pencil"
                      :src="Pencil"
                      @click="chooseCallback"
                    />
                  </div>
                </template>
              </FileUpload>
            </div>
          </div>
          <div class="flex-1 description">
            <div v-if="instance.user?.description" class="flex">
              <div
                v-html="instance.user?.description ?? ''"
                class="flex-1"
              ></div>
              <div class="top-[0px] ml-[10px] right-[0px] pencil-contain">
                <img
                  class="w-[15px] h-[15px] pencil"
                  :src="Pencil"
                  @click="clickDescriptionShowDialog"
                />
              </div>
            </div>
            <div v-else class="no-value flex items-center justify-start">
              <div class="flex-1">
                {{ t('add_description') }}
              </div>
              <div class="top-[0px] ml-[10px] right-[0px] pencil-contain">
                <img
                  class="w-[15px] h-[15px] pencil"
                  :src="Pencil"
                  @click="clickDescriptionShowDialog"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="group-information">
        <div class="w-full flex items-center justify-center mb-[20px]">
          <span class="text-[20px] font-[700] ml-[10px] mr-[10px]">{{
            $t('information')
          }}</span>
        </div>
        <div class="w-full line h-[1px] mb-[20px]"></div>
        <div class="flex items-center justify-center">
          <div class="avatar relative w-[80px] h-[80px]">
            <img
              :src="getAvatar()"
              alt="Flag"
              class="image w-[80px] h-[80px]"
            />
            <div class="absolute top-[0px] right-[0px]">
              <FileUpload
                ref="avatarUpload"
                @select="onFileSelectAvatar"
                accept="image/*"
                :maxFileSize="1000000"
              >
                <template #header="{ chooseCallback, files }">
                  <div class="flex flex-wrap justify-between items-center">
                    <img
                      class="w-[15px] h-[15px] pencil"
                      :src="Pencil"
                      @click="chooseCallback"
                    />
                  </div>
                </template>
              </FileUpload>
            </div>
          </div>
        </div>
        <div class="mt-[10px] flex item">
          <div class="label">{{ $t('code') }}:</div>
          <div class="value font-[500] flex-1">
            {{ getCode(instance.user?.code ?? '') }}
          </div>
        </div>
        <div class="mt-[10px] flex item">
          <div class="label">{{ $t('full_name') }}:</div>
          <div class="value font-[500] flex-1">
            {{ instance.user?.fullName ?? '' }}
          </div>
          <div class="pencil-contain ml-[10px]">
            <img
              class="w-[15px] h-[15px] pencil"
              :src="Pencil"
              @click="clickFullNameShowDialog"
            />
          </div>
        </div>
        <div class="mt-[10px] item flex">
          <div class="label">{{ $t('phone_number') }}:</div>
          <div class="value font-[500] flex-1">
            {{ instance.user?.phoneNumber ?? '' }}
          </div>
          <div class="pencil-contain ml-[10px]">
            <img
              class="w-[15px] h-[15px] pencil"
              :src="Pencil"
              @click="clickPhoneNumberShowDialog"
            />
          </div>
        </div>
        <div class="mt-[10px] flex item">
          <div class="label">{{ $t('password') }}:</div>
          <div class="flex-1 flex">
            <div class="value font-[500] flex-1">***********</div>
            <div class="pencil-contain ml-[10px]">
              <img
                class="w-[15px] h-[15px] pencil"
                :src="Pencil"
                @click="clickPasswordShowDialog"
              />
            </div>
          </div>
        </div>

        <div class="mt-[10px] flex item">
          <div class="label">{{ $t('nick_name') }}:</div>
          <div class="flex-1 flex">
            <div v-if="instance.user?.nickName" class="font-[500] value flex-1">
              {{ instance.user?.nickName ?? '' }}
            </div>
            <div v-else class="no-value flex-1">{{ t('add_nick_name') }}</div>
            <div class="pencil-contain ml-[10px]">
              <img
                class="w-[15px] h-[15px] pencil"
                :src="Pencil"
                @click="clickNickNameShowDialog"
              />
            </div>
          </div>
        </div>
        <div class="mt-[10px] flex item">
          <div class="label">{{ $t('gender') }}:</div>
          <div class="font-[500] value flex-1">
            {{ getGender(instance.user?.gender ?? '', t) }}
          </div>
          <div class="pencil-contain ml-[10px]">
            <img
              class="w-[15px] h-[15px] pencil"
              :src="Pencil"
              @click="clickGenderShowDialog"
            />
          </div>
        </div>
        <div class="mt-[10px] flex item">
          <div class="label">{{ $t('date_of_birth') }}:</div>
          <div class="flex-1 flex">
            <div class="font-[500] value flex-1">
              {{
                convertDateToString(
                  instance.user?.dateOfBirth ?? '',
                  store.getLanguage()
                )
              }}
            </div>
            <div class="pencil-contain ml-[10px]">
              <img
                class="w-[15px] h-[15px] pencil"
                :src="Pencil"
                @click="clickDateOfBirthShowDialog"
              />
            </div>
          </div>
        </div>

        <div class="mt-[10px] flex item">
          <div class="label">{{ $t('address') }}:</div>
          <div class="flex-1 flex">
            <div v-if="instance.user?.address" class="font-[500] value flex-1">
              {{ instance.user?.address ?? '' }}
            </div>
            <div v-else class="no-value flex-1">{{ t('add_address') }}</div>
            <div class="pencil-contain ml-[10px]">
              <img
                class="w-[15px] h-[15px] pencil"
                :src="Pencil"
                @click="clickAddressShowDialog"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="group-org">
        <div class="w-full flex items-center justify-center mb-[20px]">
          <span class="text-[20px] font-[700] ml-[10px] mr-[10px]">{{
            $t('organzations')
          }}</span>
        </div>
        <div class="w-full line h-[1px] mb-[10px]"></div>
        <div class="">
          <div
            class="mt-[10px] org-item flex items-start flex-col"
            v-for="(item, index) in getListOrganizations()"
          >
            <div class="flex items-start w-full">
              <img
                :src="getLogoOrg(item)"
                alt="Flag"
                class="image w-[40px] h-[40px]"
              />
              <div class="ml-[10px] flex flex-col flex-1">
                <div class="name font-bold">{{ item.name ?? '' }}</div>
                <div class="flex">
                  <div :class="getStatusOrgClass(item)">
                    {{ getStatusOrgString(item) }}
                  </div>
                  <div class="flex-1"></div>
                </div>
              </div>
              <div :class="getStatusClass(item)">
                {{ getStatusString(item) }}
              </div>
            </div>
            <div class="w-full mt-[5px] work-date">
              <div class="">Vị trí:</div>
              <div class="">
                <div class="ml-[20px] font-[600]">Tổng giám đốc</div>
                <div class="flex">
                  <div class="ml-[20px]">Từ ngày: 22/11/2024</div>
                  <div class="ml-[5px]">đến ngày: 22/11/2024</div>
                </div>
                <div class="mt-[5px]">Làm việc ở chi nhánh</div>
                <div class="ml-[20px] font-[600]">159/ Huynh Thuc Kháng</div>
                <div class="flex">
                  <div class="ml-[20px]">Từ ngày: 22/11/2024</div>
                  <div class="ml-[5px]">đến ngày: 22/11/2024</div>
                </div>
              </div>
            </div>
            <!-- <div class="w-full line2 h-[1px] mt-[10px] mb-[10px]"></div> -->
            <div class="flex w-full mt-[5px] work-date">
              <div class="flex-1">
                {{ $t('start_date') }}:
                <span class="font-[500]">
                  {{
                    formatDateTimeFromString(
                      item?.startDateOfWork ?? '',
                      store.getLanguage()
                    )
                  }}</span
                >
              </div>
              <div class="" v-if="isWorking(item)">
                {{ $t('end_date') }}:
                <span class="font-[500]">
                  {{
                    formatDateTimeFromString(
                      item?.endDateOfWork ?? '',
                      store.getLanguage()
                    )
                  }}</span
                >
              </div>
            </div>

            <div class="w-full line h-[1px] mt-[10px]"></div>
          </div>
          <!-- <div
            class="mt-[20px] flex items-center justify-center"
            v-if="isShowViewMoreOrganization()"
          >
            <Button
              class="ml-[20px] h-[32px] view-more"
              type="button"
              severity="info"
              :label="$t('view_more')"
              icon="pi pi-angle-double-right"
            ></Button>
          </div> -->
        </div>
      </div>
    </div>

    <ProfileFullNameDialog
      :full-name="instance.user?.fullName ?? ''"
      v-model:visible="instance.fullNameVisible"
      @click-close="clickFullNameCloseDialog"
      @click-save="clickFullNameSaveDialog"
    />
    <ProfileAddressDialog
      :address="instance.user?.address ?? ''"
      v-model:visible="instance.addressVisible"
      @click-close="clickAddressCloseDialog"
      @click-save="clickAddressSaveDialog"
    />
    <ProfileDateOfBirthDialog
      :date="getDateOfBirth()"
      v-model:visible="instance.dateOfBirthVisible"
      @click-close="clickDateOfBirthCloseDialog"
      @click-save="clickDateOfBirthSaveDialog"
    />
    <ProfileNickNameDialog
      :nick-name="instance.user?.nickName ?? ''"
      v-model:visible="instance.nickNameVisible"
      @click-close="clickNickNameCloseDialog"
      @click-save="clickNickNameSaveDialog"
    />
    <ProfilePasswordDialog
      v-model:visible="instance.passwordVisible"
      @click-close="clickPasswordCloseDialog"
      @click-save="clickPasswordSaveDialog"
    />
    <ProfileDescriptionDialog
      :description="instance.user?.description ?? ''"
      v-model:visible="instance.descriptionVisible"
      @click-close="clickDescriptionCloseDialog"
      @click-save="clickDescriptionSaveDialog"
    />
    <ProfileGenderDialog
      :gender="instance.user?.gender ?? ''"
      v-model:visible="instance.genderVisible"
      @click-close="clickGenderCloseDialog"
      @click-save="clickGenderSaveDialog"
    />
    <ProfilePhoneNumberDialog
      v-model:visible="instance.phoneNumberVisible"
      @click-close="clickPhoneNumberCloseDialog"
      @click-save="clickPhoneNumberSaveDialog"
    />
  </div>
</template>
<script setup lang="ts">
import { GlobalStore } from '~/store/Global'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import Pencil from '~/assets/icons/pencil.svg'
import { ref } from 'vue'
import DefaultPicture from '~/assets/images/default-picture.png'
import { useToast } from 'primevue/usetoast'
import type { ProfileType } from '~/types/account/ProfileType'

/// Define
const instance = ref(<ProfileType>{})
const { t } = useI18n()
const toast = useToast()
const emits = defineEmits(['clickClose'])
const store = GlobalStore()

const getCode = (code: any) => {
  const len = `${code}`.length
  const remain = 9 - len
  let start = ''
  for (let index = 0; index < remain; index++) {
    start = `${start}0`
  }
  const string = `${start}${code}`
  let item = string.substring(0, 3)
  let result = `${item}-`
  item = string.substring(3, 6)
  result = `${result}${item}-`
  item = string.substring(6, 9)
  result = `${result}${item}`
  return result
}

/// Get date of birth
const getDateOfBirth = (): Date | null => {
  return stringToDate(instance.value.user?.dateOfBirth ?? '')
}

/// Get status class of emplyee
const getStatusClass = (item: any) => {
  if (!isWorking(item)) {
    return 'status-disable2'
  }
  return 'status-enable2'
}

/// Get status is working
const isWorking = (item: any) => {
  if (!item || !item.employees || !item.employees.length || !item.active) {
    return false
  }
  const emp = item.employees[0]
  if (!emp.active) {
    return false
  }
  return true
}

/// Get status string of emplyee
const getStatusString = (item: any) => {
  if (!isWorking(item)) {
    return t('off_work')
  }
  return t('working')
}
/// Get status class of org
const getStatusOrgClass = (item: any) => {
  if (!item || !item.active) {
    return 'status-disable'
  }
  return 'status-enable'
}
/// Get status string of org
const getStatusOrgString = (item: any) => {
  if (!item || !item.active) {
    return t('dissolved')
  }
  return t('operating')
}
/// Get list orgs
const getListOrganizations = () => {
  // instance.value.user?.orgs.push(instance.value.user?.orgs[0])

  const orgs = instance.value.user?.orgs ?? []
  if (orgs.length < 2) {
    return orgs
  }
  return orgs.slice(0, 1)
}
/// Show read more orgs
const isShowViewMoreOrg = () => {
  const orgs = instance.value.user?.orgs ?? []
  if (orgs.length < 2) {
    return false
  }
  return true
}

/// Get logo of org
const getLogoOrg = (item: any) => {
  if (!item || !item.logo || !item.logo?.location) {
    return DefaultAvatar
  }
  return item.logo.location
}

/// Get avatar of user
const getAvatar = () => {
  if (
    !instance.value.user ||
    !instance.value.user.avatar ||
    !instance.value.user.avatar.location
  ) {
    return DefaultAvatar
  }
  return instance.value.user.avatar.location
}
/// Get img description of user
const getImgDescription = () => {
  if (
    !instance.value.user ||
    !instance.value.user.imgDescription ||
    !instance.value.user.imgDescription.location
  ) {
    return DefaultPicture
  }
  return instance.value.user.imgDescription.location
}
/// Click full name close
const clickFullNameCloseDialog = () => {
  instance.value.fullNameVisible = false
}
/// Click full name save
const clickFullNameSaveDialog = (data: any) => {
  instance.value.user.fullName = data.fullName
  instance.value.fullNameVisible = false
}
/// Click show full name
const clickFullNameShowDialog = () => {
  instance.value.fullNameVisible = true
}
/// Click address close
const clickAddressCloseDialog = () => {
  instance.value.addressVisible = false
}
/// Click address save
const clickAddressSaveDialog = (data: any) => {
  instance.value.user.address = data.address
  instance.value.addressVisible = false
}
/// Click show address
const clickAddressShowDialog = () => {
  instance.value.addressVisible = true
}
/// Click show phone number
const clickPhoneNumberShowDialog = () => {
  instance.value.phoneNumberVisible = true
}

/// Click nick name close
const clickNickNameCloseDialog = () => {
  instance.value.nickNameVisible = false
}
/// Click nick name save
const clickNickNameSaveDialog = (data: any) => {
  instance.value.user.nickName = data.nickName
  instance.value.nickNameVisible = false
}

/// Click gender close
const clickGenderCloseDialog = () => {
  instance.value.genderVisible = false
}
/// Click gender save
const clickGenderSaveDialog = (data: any) => {
  instance.value.user.gender = data.gender
  instance.value.genderVisible = false
}

/// Click phone number close
const clickPhoneNumberCloseDialog = () => {
  instance.value.phoneNumberVisible = false
}
/// Click phone number save
const clickPhoneNumberSaveDialog = (data: any) => {
  instance.value.user.phoneNumber = data.phoneNumber
  instance.value.phoneNumberVisible = false
}
/// Click description close
const clickDescriptionCloseDialog = () => {
  instance.value.descriptionVisible = false
}
/// Click description save
const clickDescriptionSaveDialog = (data: any) => {
  instance.value.user.description = data.description
  instance.value.descriptionVisible = false
}

/// Click password close
const clickPasswordCloseDialog = () => {
  instance.value.passwordVisible = false
}
/// Click password save
const clickPasswordSaveDialog = (data: any) => {
  // instance.value.user = data
  instance.value.passwordVisible = false
}
/// Click show password
const clickPasswordShowDialog = () => {
  instance.value.passwordVisible = true
}
/// Click show nick name
const clickNickNameShowDialog = () => {
  instance.value.nickNameVisible = true
}
/// Click date of birth close
const clickDateOfBirthCloseDialog = () => {
  instance.value.dateOfBirthVisible = false
}
/// Click date of birth save
const clickDateOfBirthSaveDialog = (data: any) => {
  instance.value.user.dateOfBirth = data.dateOfBirth
  instance.value.dateOfBirthVisible = false
}
/// Click show date of birth
const clickDateOfBirthShowDialog = () => {
  instance.value.dateOfBirthVisible = true
}
/// Click show gender
const clickGenderShowDialog = () => {
  instance.value.genderVisible = true
}
/// Click show description
const clickDescriptionShowDialog = () => {
  instance.value.descriptionVisible = true
}

/// Select img description
const onFileSelectImgDescription = (event: any) => {
  const file = event.files[0]
  const reader = new FileReader()
  // instance.value.logoFileOfOrganization = file
  reader.onload = async (e) => {
    //Initiate the JavaScript Image object.
    let image = new Image()
    //Set the Base64 string return from FileReader as source.
    image.src = `${e.target?.result ?? ''}`
    image.onload = async () => {
      const height = image.height
      const width = image.width
      if (width !== 2 * height) {
        toast.add({
          severity: Toast.ERROR,
          summary: t('error'),
          detail: t('image_of_description_with_2_1_ratio'),
          life: Toast.DURATION,
        })
        return
      }

      //// Upload image
      uploadImgDescription(file)
    }
  }
  reader.readAsDataURL(file)
}
/// Upload image description
const uploadImgDescription = async (file: any) => {
  /// Upload images
  const formData = new FormData()
  formData.append('file', file)
  const options: any = {
    method: Method.POST,
    body: formData,
  }
  const { data, error, status } = await CallAPI(
    APIPathAccount.POST_SET_IMG_DESCRIPTION_AVATAR_USER,
    options,
    toast,
    t,
    false,
    true
  )
  /// Check error
  if (status.value !== APIStatus.SUCCESS) {
    return
  }
  toast.add({
    severity: Toast.SUCCESS,
    summary: t('success'),
    detail: t('image_of_description_updated_successful'),
    life: Toast.DURATION,
  })
  const result: any = data.value
  if (result.data.imgDescription) {
    instance.value.user.imgDescription = result.data.imgDescription
  }
}
/// Select avatar
const onFileSelectAvatar = (event: any) => {
  const file = event.files[0]
  const reader = new FileReader()
  // instance.value.logoFileOfOrganization = file
  reader.onload = async (e) => {
    //Initiate the JavaScript Image object.
    let image = new Image()
    //Set the Base64 string return from FileReader as source.
    image.src = `${e.target?.result ?? ''}`
    image.onload = async () => {
      const height = image.height
      const width = image.width
      if (width !== height) {
        toast.add({
          severity: Toast.ERROR,
          summary: t('error'),
          detail: t('avatar_with_1_1_ratio'),
          life: Toast.DURATION,
        })
        return
      }

      //// Upload image
      uploadAvatar(file)
    }
  }
  reader.readAsDataURL(file)
}
/// Upload avatar
const uploadAvatar = async (file: any) => {
  /// Upload images
  const formData = new FormData()
  formData.append('file', file)
  const options: any = {
    method: Method.POST,
    body: formData,
  }
  const { data, error, status } = await CallAPI(
    APIPathAccount.POST_SET_AVATAR_USER,
    options,
    false,
    true
  )
  /// Check error
  if (status.value !== APIStatus.SUCCESS) {
    return
  }
  toast.add({
    severity: Toast.SUCCESS,
    summary: t('success'),
    detail: t('avatar_updated_successful'),
    life: Toast.DURATION,
  })
  const result: any = data.value
  if (result.data.avatar) {
    instance.value.user.avatar = result.data.avatar
  }
}

/// init data
const initData = async () => {
  const options: any = {
    method: Method.GET,
  }
  const { data, error, status } = await CallAPI(
    APIPathAccount.GET_USER,
    options,
    toast,
    t,
    false
  )
  /// Check error
  if (status.value !== APIStatus.SUCCESS) {
    return
  }
  const result: any = data.value
  instance.value.user = result.data
}

/// Init data
initData()
</script>
<style scoped lang="scss">
//// Override
:deep(.p-fileupload-advanced) {
  background-color: unset !important;
  border: unset !important;
  .p-fileupload-header {
    padding: 0px !important;
    width: 30px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    .pencil {
      filter: invert(60%) sepia(75%) saturate(440%) hue-rotate(89deg)
        brightness(87%) contrast(99%);
      &:hover {
        cursor: pointer;
        filter: invert(52%) sepia(41%) saturate(3616%) hue-rotate(166deg)
          brightness(100%) contrast(89%);
      }
    }
  }
  .p-fileupload-content {
    display: none !important;
  }
}

.page {
  padding: 16px !important;
}
.profile {
  flex: 1;
  padding: 30px;
}
.upload-icon {
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  border-radius: 50px !important;
}
.group-information,
.group-org,
.group-introduction {
  max-width: 700px;
  border: 1px solid $border-color;
  // border: 1px solid #cbd5e1;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  width: 100%;
  padding: 30px;
  padding-top: 20px;
}

.line {
  border-radius: 5px;
  border-bottom: 1px dashed $border-color;
}
.line2 {
  border-radius: 5px;
  border-bottom: 1px solid $border-color;
}
.group-description {
  flex-direction: column;
  .img-description {
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
    border-color: $second-color;
    border-style: solid;
    border-width: 1px;
  }
  .description {
    margin-top: 10px;
    .no-value {
      color: $primary-color;
    }
    .pencil-contain {
      // background-color: $info-color;
      padding: 3px;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 5px;
      height: 21px;
      width: 21px;
    }
    .pencil {
      filter: invert(60%) sepia(75%) saturate(440%) hue-rotate(89deg)
        brightness(87%) contrast(99%);
      &:hover {
        cursor: pointer;
        filter: invert(52%) sepia(41%) saturate(3616%) hue-rotate(166deg)
          brightness(100%) contrast(89%);
      }
    }
  }
}

.avatar {
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
  border-color: $second-color;
  border-style: solid;
  border-width: 1px;
  .image {
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}

.item {
  .label {
    width: 110px;
  }
  .no-value {
    color: $primary-color;
  }
  .value {
  }
  .pencil-contain {
    // background-color: $info-color;

    padding: 3px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 21px;
    height: 21px;
  }
  .pencil {
    filter: invert(60%) sepia(75%) saturate(440%) hue-rotate(89deg)
      brightness(87%) contrast(99%);
    &:hover {
      cursor: pointer;
      filter: invert(52%) sepia(41%) saturate(3616%) hue-rotate(166deg)
        brightness(100%) contrast(89%);
    }
  }
}

.group-information {
  margin-top: 30px;
}
.group-org {
  margin-top: 30px;
  .org-item {
    .image {
      border-top-right-radius: 8px;
      border-bottom-left-radius: 8px;
      border-color: $second-color;
      border-style: solid;
      border-width: 1px;
    }
    .work-date {
    }
  }

  .status-enable,
  .status-disable,
  .status-enable2,
  .status-disable2 {
    background: $primary-color;
    font-size: 10px;
    color: white;
    padding-left: 3px;
    padding-right: 3px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .status-disable,
  .status-disable2 {
    background-color: $danger-color;
  }
  .status-enable2,
  .status-disable2 {
    font-size: 14px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .view-more {
    border-radius: unset;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}

/// Tablet mini
@media screen and (min-width: $tablet-mini-min) and (max-width: $tablet-mini-max) {
  .group-description {
    flex-direction: column;
    .img-description {
      margin-right: unset;
      .image {
        height: 250px;
        width: 100%;
        object-fit: cover;
      }
    }
    .description {
      margin-top: 10px;
      margin-left: unset;
    }
  }
  .contain {
    flex-direction: column;
    .group-information {
      margin-right: unset;
    }
    .group-org {
      margin-left: unset;
      .work-date {
      }
    }
  }
}
/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  .page {
    padding: 8px !important;
  }
  .profile {
    flex: 1;
    padding: 8px;
  }
  .group-introduction {
    padding: 8px;
    padding-bottom: 20px;
    padding-top: 20px;
  }
  .group-description {
    flex-direction: column;
    .img-description {
      margin-right: unset;
      .image {
        height: 250px;
        width: 100%;
        object-fit: cover;
      }
    }
    .description {
      margin-top: 10px;
      margin-left: unset;
    }
  }
  .contain {
    flex-direction: column;
    .group-information {
      margin-right: unset;
      padding: 8px;
      padding-bottom: 20px;
      padding-top: 20px;
    }
    .group-org {
      margin-top: 30px;
      margin-left: unset;
      padding: 8px;
      padding-bottom: 20px;
      padding-top: 20px;
      .work-date {
        flex-direction: column;
      }
    }
  }
}
</style>
