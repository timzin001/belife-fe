<template>
  <Dialog
    modal
    :dismissableMask="true"
    v-model:visible="instance.visible"
    @update:visible="updateVisible"
  >
    <template #container>
      <div class="create-position">
        <div
          class="text-[20px] font-bold ml-[0px] mb-[20px] w-full flex items-center justify-center"
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
            <div class="w-full flex items-center justify-center mt-[30px]">
              <Button
                severity="success"
                :label="$t('save')"
                class="h-[32px] button"
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
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import type { CreatePositionType } from '~/types/org/create-position/CreatePositionType'
import Check from '~/assets/icons/check.svg'
import Times from '~/assets/icons/times.svg'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import ArrowLeft from '~/assets/icons/arrow-left.svg'
import Save from '~/assets/icons/save.svg'
import { CreatePositionValidate } from '~/validate/org/CreatePositionValidate'
const { t, locale } = useI18n()
const { $orgAPI, $socialAPI } = useNuxtApp()
const props = defineProps({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  data: {
    type: Object as PropType<any>,
  },
  visible: {
    type: Boolean,
    required: false,
  },
})

const instance = ref<CreatePositionType>({
  visible: false,
  name: {
    vi: '',
    en: '',
  },
  nameError: null,
  description: {
    vi: '',
    en: '',
  },
  active: true,
  avatar: DefaultAvatar,
  avatarFile: null,
  widthAvatar: null,
  heightAvatar: null,
  avatarError: null,
  position: null,
  nameAbort: null,
})
const emits = defineEmits(['click-close', 'click-ok'])
/// Update visible
const updateVisible = (value: any) => {
  if (!value) {
    /// Close dialog
    instance.value.visible = props.visible
    emits('click-close')
  }
}

/// Change name
const changeName = (evt: any) => {
  CreatePositionValidate.name(instance, t, $orgAPI, locale.value)
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
watch(
  () => props.visible,
  (value) => {
    /// Update show or hide from parent
    instance.value.visible = props.visible
  }
)
</script>
<style scoped lang="scss">
@import url('~/assets/scss/org/CreatePosition.scss');
</style>
