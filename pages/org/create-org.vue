<template>
  <div class="page">
    <div class="card rounded-[8px] create-org">
      <div
        class="text-[25px] font-bold ml-[0px] mb-[20px] w-full flex items-center justify-center"
      >
        {{
          $t('create_name', { name: $t('organization').toLocaleLowerCase() })
        }}
      </div>
      <div class="contain">
        <div class="flex-1 group-information">
          <div class="w-full flex items-center justify-center mb-[20px]">
            <span class="text-[20px] font-[700] ml-[10px] mr-[10px]">{{
              $t('information_of_org')
            }}</span>
          </div>
          <div class="w-full line h-[1px] mb-[20px]"></div>
          <div>
            <div class="flex mt-[20px] items-center justify-start">
              <div class="label">{{ $t('logo') }}<span>*</span></div>
              <FileUpload
                mode="basic"
                @select="onFileSelectOrganization"
                customUpload
                :chooseLabel="$t('choose')"
                auto
                severity="secondary"
                class="p-button-outlined h-[32px]"
              />
              <img
                v-if="instance.logoOfOrganization"
                :src="instance.logoOfOrganization"
                alt="Image"
                class="rounded-[8px] image"
              />
            </div>
            <div class="avatar-des">{{ $t('logo_with_1_1_ratio') }}</div>
            <Message
              v-if="instance.logoOfOrganizationError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.logoOfOrganizationError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label for="org-name" class="label"
                >{{ $t('name') }}<span>*</span></label
              >
              <InputText
                id="org-name"
                autocomplete="off"
                @blur="changeNameOfOrg"
                class="flex-1"
                v-model="instance.nameOfOrg"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('name').toLocaleLowerCase(),
                  })
                "
                @value-change="changeNameOfOrg"
              />
            </div>
            <Message
              v-if="instance.nameOfOrgError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.nameOfOrgError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label for="org-slogan" class="label"
                >{{ $t('slogan') }}<span>*</span></label
              >
              <InputText
                id="org-slogan"
                autocomplete="off"
                class="flex-1"
                @blur="changeSloganOfOrg"
                v-model="instance.sloganOfOrg"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('slogan').toLocaleLowerCase(),
                  })
                "
                @value-change="changeSloganOfOrg"
              />
            </div>
            <Message
              v-if="instance.sloganOfOrganizationError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.sloganOfOrganizationError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label for="org-fields" class="label"
                >{{ $t('fields') }}<span>*</span></label
              >
              <InputText
                id="org-fields"
                class="flex-1"
                v-model="instance.fieldsOfOrg"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('name').toLocaleLowerCase(),
                  })
                "
                @blur="changeFieldsOfOrg"
                @value-change="changeFieldsOfOrg"
                autocomplete="off"
              />
            </div>
            <Message
              v-if="instance.fieldsOfOrganizationError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.fieldsOfOrganizationError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label for="org-size" class="label"
                >{{ $t('size') }}<span>*</span></label
              >
              <InputNumber
                id="org-size"
                class="flex-1"
                v-model="instance.sizeOfOrg"
                @value-change="changeSizeOfOrg"
                @blur="changeSizeOfOrg"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('size').toLocaleLowerCase(),
                  })
                "
                inputId="integeronly"
                :locale="instance.locale"
                :minFractionDigits="instance.minFractionDigits"
                autocomplete="off"
                fluid
              />
            </div>
            <Message
              v-if="instance.sizeOfOrganizationError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.sizeOfOrganizationError }}</Message
            >
          </div>

          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('description') }}</div>
              <Textarea
                class="flex-1"
                autocomplete="off"
                rows="2"
                v-model="instance.descriptionOfOrg"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('description').toLocaleLowerCase(),
                  })
                "
              />
            </div>
          </div>
        </div>
        <div class="flex-1 group-branch">
          <div class="w-full flex items-center justify-center">
            <span
              class="text-[20px] font-[700] ml-[10px] mb-[20px] mr-[10px]"
              >{{ $t('main_branch_of_organization') }}</span
            >
          </div>
          <div class="w-full line h-[1px] mb-[20px]"></div>
          <div>
            <div class="flex mt-[20px] items-center justify-start">
              <label class="label">{{ $t('avatar') }}<span>*</span></label>
              <FileUpload
                mode="basic"
                @select="onFileSelectBranch"
                customUpload
                auto
                :chooseLabel="$t('choose')"
                severity="secondary"
                class="p-button-outlined h-[32px] flex-1"
              />
              <img
                :src="instance.avatarOfBranch"
                alt="Image"
                class="rounded-[8px] w-full image"
              />
            </div>
            <div class="avatar-des">{{ $t('avatar_with_1_1_ratio') }}</div>
            <Message
              v-if="instance.avatarOfBranchError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.avatarOfBranchError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label id="branch-name" class="label"
                >{{ $t('name') }}<span>*</span></label
              >
              <InputText
                id="branch-name"
                autocomplete="off"
                class="flex-1"
                v-model="instance.nameOfBranch"
                @blur="changeNameOfBranch"
                @value-change="changeNameOfBranch"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('name').toLocaleLowerCase(),
                  })
                "
              />
            </div>
            <Message
              v-if="instance.nameOfBranchError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.nameOfBranchError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label for="branch-email" class="label"
                >{{ $t('email') }}<span>*</span></label
              >
              <InputText
                id="branch-email"
                autocomplete="off"
                @value-change="changeEmailOfBranch"
                @blur="changeEmailOfBranch"
                class="flex-1"
                v-model="instance.emailOfBranch"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('email').toLocaleLowerCase(),
                  })
                "
              />
            </div>
            <Message
              v-if="instance.emailOfBranchError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.emailOfBranchError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label class="label" for="branch-phone-number"
                >{{ $t('phone_number') }}<span>*</span></label
              >
              <Select
                v-model="instance.dialCode"
                :options="instance.countries"
                optionLabel="name"
                @change="changeDialCode"
                placeholder="Select a Country"
                class="w-[110px] h-[32px] mr-[5px]"
              >
                <template #value="slotProps">
                  <div
                    v-if="slotProps.value"
                    class="flex items-center justify-center h-[32px] pl-[10px]"
                  >
                    <img
                      :alt="slotProps.value.code"
                      :src="slotProps.value.icon"
                      style="width: 18px"
                    />
                    <div class="text-[14px] ml-[5px]">
                      {{ slotProps.value.code }}
                    </div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div
                    class="flex items-center justify-center pl-[10px] h-[32px]"
                  >
                    <img
                      :alt="slotProps.option.code"
                      :src="slotProps.option.icon"
                      style="width: 18px"
                    />
                    <div class="text-[14px] ml-[5px]">
                      {{ slotProps.option.code }}
                    </div>
                  </div>
                </template>
              </Select>
              <InputMask
                class="h-[32px] flex-1"
                autocomplete="off"
                id="branch-phone-number"
                @value-change="changePhoneNumberOfBranch"
                @blur="changePhoneNumberOfBranch"
                v-model="instance.phoneNumberOfBranch"
                :mask="instance.phoneNumberOfBranchPattern"
                :placeholder="instance.phoneNumberOBranchPlaceHolder"
                fluid
              />
            </div>
            <Message
              v-if="instance.phoneNumberOfBranchError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.phoneNumberOfBranchError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label for="branch-address" class="label"
                >{{ $t('address') }}<span>*</span></label
              >
              <InputText
                id="branch-address"
                class="flex-1"
                autocomplete="off"
                @blur="changeAddressOfBranch"
                @value-change="changeAddressOfBranch"
                v-model="instance.addressOfBranch"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('address').toLocaleLowerCase(),
                  })
                "
              />
            </div>
            <Message
              v-if="instance.addressOfBranchError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.addressOfBranchError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('description') }}</div>
              <Textarea
                class="flex-1"
                autocomplete="off"
                rows="2"
                v-model="instance.descriptionOfBranch"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('description').toLocaleLowerCase(),
                  })
                "
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex items-center justify-center mt-[30px]">
        <Button
          :label="$t('save')"
          class="w-[130px] h-[32px] register"
          icon="pi pi-save"
          @click="clickSave"
        />
      </div>

      <div class="w-full mt-[30px] pricing-group">
        <div
          class="text-[20px] font-[700] ml-[0px] mb-[20px] w-full flex items-center justify-center"
        >
          Cộng đồng doanh nghiệp
        </div>
        <div class="w-full line h-[1px] mb-[20px]"></div>
        <div class="contain">
          Nhóm ABC là một [mô tả ngắn gọn về mục đích và lĩnh vực hoạt động của
          nhóm]. Chúng tôi tập hợp những cá nhân có chung [liệt kê các điểm
          chung, ví dụ: sở thích, mục tiêu, mối quan tâm] để cùng nhau [liệt kê
          các hoạt động chính của nhóm, ví dụ: học hỏi, chia sẻ, hợp tác, phát
          triển]. Tham gia nhóm ABC, bạn sẽ có cơ hội: Kết nối: Gặp gỡ và giao
          lưu với những người có cùng chí hướng, mở rộng mạng lưới quan hệ. Học
          hỏi và phát triển: Chia sẻ kiến thức, kinh nghiệm và học hỏi những
          điều mới từ các thành viên khác. Hợp tác: Tham gia vào các dự án, hoạt
          động nhóm để cùng nhau đạt được mục tiêu chung. Đóng góp: Chia sẻ tài
          năng, kỹ năng và ý tưởng của bạn để xây dựng cộng đồng ngày càng vững
          mạnh. Cập nhật thông tin: Nắm bắt những thông tin mới nhất về [lĩnh
          vực liên quan đến nhóm]. Tìm kiếm sự hỗ trợ: Nhận được sự giúp đỡ, lời
          khuyên và động viên từ các thành viên khác khi cần thiết. Tham gia các
          sự kiện: Tham gia các buổi gặp mặt, hội thảo, workshop, hoạt động
          ngoại khóa do nhóm tổ chức.
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/// Import
import { ref } from 'vue'
import type { CreateOrganizationType } from '~/types/org/CreateOrganizationType'
import SingaporeFlag from '~/assets/flags/singapore.svg'
import VietNamFlag from '~/assets/flags/vietnam.svg'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import { CreateOrganizationValidate } from '~/validate/org/CreateOrgValidate'
import { GlobalStore } from '~/store/Global'
import { useToast } from 'primevue/usetoast'
/// Define
const store = GlobalStore()
const toast = useToast()

const { t } = useI18n()
const instance = ref(<CreateOrganizationType>{
  logoOfOrganization: DefaultAvatar,
  avatarOfBranch: DefaultAvatar,
  phoneNumberOfBranchPattern: '999-999-999',
  // +65 XXXX XXXX
  phoneNumberOBranchPlaceHolder: '123-345-789',
  dialCode: {
    code: '(+84)',
    icon: VietNamFlag,
  },
  countries: [
    {
      code: '(+84)',
      icon: VietNamFlag,
    },
    {
      code: '(+65)',
      icon: SingaporeFlag,
    },
  ],
})
/// Function

/// Change name of org
const changeNameOfOrg = async (evt: any) => {
  CreateOrganizationValidate.nameOfOrg(instance, t)
}
/// Change name of org
const changeSloganOfOrg = async (evt: any) => {
  CreateOrganizationValidate.sloganOfOrg(instance, t)
}

/// Change size of org
const changeSizeOfOrg = async (evt: any) => {
  CreateOrganizationValidate.sizeOfOrg(instance, t)
}

/// Chnage fields of org
const changeFieldsOfOrg = async (evt: any) => {
  CreateOrganizationValidate.fieldsOfOrg(instance, t)
}
/// Change name of branch
const changeNameOfBranch = async (evt: any) => {
  CreateOrganizationValidate.nameOfBranch(instance, t)
}
/// Change email of branch
const changeEmailOfBranch = async (evt: any) => {
  CreateOrganizationValidate.emailOfBranch(instance, t)
}

/// Change address of branch
const changeAddressOfBranch = async (evt: any) => {
  CreateOrganizationValidate.addressOfBranch(instance, t)
}

/// Change phone number of branch
const changePhoneNumberOfBranch = async (evt: any) => {
  // validatePhoneNumberWithExist(instance, t, abortController)
  CreateOrganizationValidate.phoneNumberOfBranch(instance, t)
}
/// Change dial code
const changeDialCode = async (evt: any) => {
  CreateOrganizationValidate.changeDialCode(evt, instance)
}
/// Select logo
const onFileSelectOrganization = (event: any) => {
  const file = event.files[0]
  const reader = new FileReader()
  instance.value.logoFileOfOrg = file
  reader.onload = async (e) => {
    //Initiate the JavaScript Image object.
    let image = new Image()
    //Set the Base64 string return from FileReader as source.
    image.src = `${e.target?.result ?? ''}`
    instance.value.logoOfOrganization = `${e.target?.result ?? ''}`
    image.onload = async () => {
      const height = image.height
      const width = image.width
      instance.value.widthLogoOfOrganization = width
      instance.value.heightLogoOfOrganization = height
      CreateOrganizationValidate.logoOfOrganization(instance, t)
    }
  }
  reader.readAsDataURL(file)
}
/// Select avatar
const onFileSelectBranch = (event: any) => {
  const file = event.files[0]
  instance.value.avatarFileOfBranch = file
  const reader = new FileReader()
  reader.onload = async (e) => {
    //Initiate the JavaScript Image object.
    let image = new Image()
    //Set the Base64 string return from FileReader as source.
    image.src = `${e.target?.result ?? ''}`
    instance.value.avatarOfBranch = `${e.target?.result ?? ''}`
    image.onload = async () => {
      const height = image.height
      const width = image.width
      instance.value.widthAvatarOfBranch = width
      instance.value.heightAvatarOfBranch = height
      CreateOrganizationValidate.avatarOfBranch(instance, t)
    }
  }
  reader.readAsDataURL(file)
}

/// Create org
const callAPICreateOrg = async (): Promise<boolean> => {
  /// Create org
  const nameOfOrg = instance.value.nameOfOrg ?? ''
  const sloganOfOrg = instance.value.sloganOfOrg ?? ''
  const fieldsOfOrg = instance.value.fieldsOfOrg ?? ''
  const sizeOfOrg = instance.value.sizeOfOrg ?? 0
  const descriptionOfOrg = instance.value.descriptionOfOrg ?? ''
  const nameOfBranch = instance.value.nameOfBranch ?? ''
  const emailOfBranch = instance.value.emailOfBranch ?? ''
  const addressOfBranch = instance.value.addressOfBranch ?? ''
  const phoneNumberOfBranch = `${instance.value.dialCode?.code ?? ''}${(
    instance.value.phoneNumberOfBranch ?? ''
  ).replaceAll('-', '')}`
  const descriptionOfBranch = instance.value.descriptionOfBranch ?? ''

  const formData = new FormData()
  formData.append('files', instance.value.logoFileOfOrg)
  formData.append('files', instance.value.avatarFileOfBranch)
  formData.append('nameOfOrg', nameOfOrg)
  formData.append('sloganOfOrg', sloganOfOrg)
  formData.append('fieldsOfOrg', fieldsOfOrg)
  formData.append('sizeOfOrg', `${sizeOfOrg}`)
  formData.append('descriptionOfOrg', descriptionOfOrg)
  formData.append('nameOfBranch', nameOfBranch)
  formData.append('emailOfBranch', emailOfBranch)
  formData.append('addressOfBranch', addressOfBranch)
  formData.append('phoneNumberOfBranch', phoneNumberOfBranch)
  formData.append('descriptionOfBranch', descriptionOfBranch)

  const options: any = {
    method: Method.POST,
    body: formData,
  }
  const { data, error, status } = await CallAPI(
    APIPathOrg.POST_CREATE_ORG,
    options,
    toast,
    t,
    false,
    true
  )

  /// Check error
  if (status.value !== APIStatus.SUCCESS) {
    return false
  }
  const result: any = data.value
  instance.value.org = result.data.org
  /// Save auth
  store.setOrgAuth(result.data.auth)
  return true
}

/// Get orgs of user
const callAPIOrgsOfUser = async () => {
  const options: any = {
    method: Method.GET,
  }
  const { data, error, status } = await CallAPI(
    APIPathUser.GET_ORGANIZATION_OF_USER,
    options,
    toast,
    t,
    false
  )

  if (status.value !== APIStatus.SUCCESS) {
    return []
  }

  const result: any = data.value
  return result.data
}

/// Create save org
const clickSave = async (evt: any) => {
  const validate = await CreateOrganizationValidate.validateAll(instance, t)
  if (!validate) {
    return
  }
  /// Create org
  const create = await callAPICreateOrg()
  if (!create) {
    return
  }

  const orgs = await callAPIOrgsOfUser()

  /// Set org to store
  store.setListOrgs(orgs)
  /// Move to information of org
  /// Go to information of org
  await navigateTo({
    path: Path.INFORM_OF_ORG,
  })
}

const setFormatNumber = (lang: string) => {
  /// Set format number
  if (!lang || lang == 'en') {
    instance.value.locale = Locale.EN_US
    instance.value.minFractionDigits = 0
  } else {
    instance.value.locale = Locale.VI_VN
    instance.value.minFractionDigits = 0
  }
}

watch(
  () => store.getLanguage(),
  (value) => {
    setFormatNumber(value)
  }
)
onMounted(() => {
  /// Turn off auto complete
  const sizeElement = document.getElementById('org-size')
  let size: any = sizeElement?.firstChild
  size.setAttribute('autocomplete', 'off')

  /// Set format number
  setFormatNumber(store.getLanguage())
})
</script>

<style scoped lang="scss">
:deep(.p-textarea) {
  font-size: 14px;
}

:deep(.p-message-text) {
  padding-left: 110px;
}
.page {
  display: flex;
  padding: 10px;
}
.create-org {
  flex: 1;
  padding: 30px;
  .contain {
    display: flex;
    flex-direction: row;
    .group-information {
      margin-right: 20px;
      padding: 20px;
      border: 1px solid $border-color;
      border-top-right-radius: 15px;
      border-bottom-left-radius: 15px;
    }
    .group-branch {
      margin-top: 0px;
      margin-left: 20px;
      padding: 20px;

      border: 1px solid $border-color;
      border-top-right-radius: 15px;
      border-bottom-left-radius: 15px;
    }
  }

  .pricing-group {
    border: 1px solid $border-color;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 20px;
    .contain {
      margin-left: 20px;
      margin-right: 20px;
      display: flex;
      flex-direction: row;
      .icon {
        color: $primary-color;
        margin-top: 3px;
      }
    }
  }
  .label {
    width: 110px;
    span {
      margin-left: 2px;
      color: red;
    }
  }
  .logo-des,
  .avatar-des {
    margin-left: 110px;
  }
  .line {
    border-radius: 5px;
    border-bottom: 1px dashed $border-color;
  }
  .image {
    margin-left: 50px;
    width: 50px;
  }
}

/// Tablet
@media screen and (min-width: $tablet-min) and (max-width: $tablet-max) {
}

/// Tablet mini
@media screen and (min-width: $tablet-mini-min) and (max-width: $tablet-mini-max) {
  :deep(.p-message-text) {
    padding-left: 100px;
  }
  .page {
    display: flex;
    padding: 8px;
  }
  .create-org {
    flex: 1;
    padding: 10px;
    padding-top: 20px;
    .contain {
      display: flex;
      flex-direction: column;
      .group-information {
        margin-left: 0px;
        margin-right: 0px;
        padding: 10px;
        padding-top: 20px;
      }
      .group-branch {
        margin-top: 20px;
        margin-left: 0px;
        margin-right: 0px;
        padding: 10px;
        padding-top: 20px;
      }
    }
    .pricing-group {
      padding: 10px;
      padding-top: 20px;
      // display: inline-block;
      margin-top: 10px;
      .contain {
        margin-left: 0px;
        margin-right: 0px;
        flex-direction: column;
        .icon {
        }
      }
    }
  }
  .logo-des,
  .avatar-des {
    margin-left: 100px !important;
  }
  .label {
    width: 100px !important;
  }
}

/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  :deep(.p-message-text) {
    padding-left: 100px;
  }
  .page {
    display: flex;
    padding: 8px;
  }
  .create-org {
    flex: 1;
    padding: 10px;
    padding-top: 20px;
    .contain {
      display: flex;
      flex-direction: column;
      .group-information {
        margin-left: 0px;
        margin-right: 0px;
        padding: 10px;
        padding-top: 20px;
      }
      .group-branch {
        margin-top: 20px;
        margin-left: 0px;
        margin-right: 0px;
        padding: 10px;
        padding-top: 20px;
      }
    }
    .pricing-group {
      padding: 10px;
      padding-top: 20px;
      // display: inline-block;
      margin-top: 10px;
      .contain {
        margin-left: 0px;
        margin-right: 0px;
        flex-direction: column;
        .icon {
        }
      }
    }
  }
  .logo-des,
  .avatar-des {
    margin-left: 100px !important;
  }
  .label {
    width: 100px !important;
  }
}
</style>
