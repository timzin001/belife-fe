<template>
  <div class="page">
    <div class="card rounded-[8px] create-position">
      <div
        class="text-[25px] font-bold ml-[0px] mb-[20px] w-full flex items-center justify-center"
      >
        {{ $t('create_name', { name: $t('position').toLocaleLowerCase() }) }}
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
                id="title"
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
          <div class="w-full line h-[1px] mt-[20px]"></div>
          <div class="w-full flex items-center mt-[30px]">
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
  </div>
</template>
<script setup lang="ts">
/// Import
import { ref } from 'vue'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import ArrowLeft from '~/assets/icons/arrow-left.svg'
import Save from '~/assets/icons/save.svg'
import { CreatePositionValidate } from '~/validate/staff/CreatePositionValidate'
import type { CreatePositionType } from '~/types/staff/CreatePositionType'
import { GlobalStore } from '~/store/Global'
import { useToast } from 'primevue/usetoast'
/// Define
const router = useRouter()
const store = GlobalStore()
const toast = useToast()

const { t, locale } = useI18n()
const instance = ref(<CreatePositionType>{
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

/// Change name
const changeName = (evt: any) => {
  CreatePositionValidate.name(instance, t, toast, locale.value)
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
      CreatePositionValidate.avatar(instance, t)
    }
  }
  reader.readAsDataURL(file)
}
/// Click back
const clickBack = () => {
  router.back()
}

/// Create save position
const clickSave = async (evt: any) => {
  // const validate = await CreatePositionValidate.all(
  //   instance,
  //   t,
  //   toast,
  //   locale.value
  // )
  // if (!validate) {
  //   return
  // }
  const name = instance.value.name || {}
  const description = instance.value.description || {}
  let formData = new FormData()
  formData.append('file', instance.value.avatarFile)
  formData.append('name', JSON.stringify(name))
  formData.append('description', JSON.stringify(description))
  const options: any = {
    method: Method.POST,
    body: formData,
  }
  const { data, error, status } = await CallAPI(
    APIPathPosition.POST_CREATE,
    options,
    toast,
    t,
    true,
    true
  )
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    toast.add({
      severity: Toast.ERROR,
      summary: t('error'),
      detail: getErrorMessages(error, t),
      life: Toast.DURATION,
    })
    return
  }
  toast.add({
    severity: Toast.SUCCESS,
    summary: t('success'),
    detail: t('name_created_successfully', { name: t('position') }),
    life: Toast.DURATION,
  })
  const result: any = data.value
  // return result.data
  router.back()
}

onMounted(() => {})
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
.create-position {
  flex: 1;
  padding: 30px;
  .contain {
    display: flex;
    flex-direction: column;

    .inner {
      width: 100%;
      max-width: 700px;
      border: 1px solid $border-color;
      border-top-right-radius: 15px;
      border-bottom-left-radius: 15px;
      padding: 30px;
    }
  }

  .label {
    width: 110px;
    span {
      margin-left: 2px;
      color: red;
    }
  }
  .icon {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
      brightness(102%) contrast(102%);
  }

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
  .create-position {
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
  }
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
  .create-position {
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
  }
  .avatar-des {
    margin-left: 100px !important;
  }
  .label {
    width: 100px !important;
  }
}
</style>
