<template>
  <Dialog
    modal
    :dismissableMask="false"
    v-model:visible="instance.visible"
    @update:visible="updateVisible"
  >
    <template #container>
      <div class="create-position">
        <div class="header w-full flex relative">
          <div
            class="text-[20px] w-full font-bold flex items-center justify-center"
          >
            {{
              $t('create_name', { name: $t('position').toLocaleLowerCase() })
            }}
            <div class="flex-1 flex ml-[10px]">
              <div class="spinner-mini" v-if="instance.loading"></div>
            </div>
          </div>
          <img
            :src="Times"
            class="w-[20px] close absolute right-0"
            @click="clickClose"
          />
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
                <label for="name" class="label"
                  >{{ $t('name') }}<span>*</span></label
                >
                <InputText
                  id="name"
                  v-model="instance.name"
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
                  v-model="instance.description"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('description').toLocaleLowerCase(),
                    })
                  "
                />
              </div>
            </div>
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label for="department-name" class="label"
                  >{{ $t('active') }}<span>*</span></label
                >
                <Checkbox v-model="instance.active" binary />
              </div>
            </div>
            <div class="w-full line h-[1px] mt-[20px]"></div>
            <div class="w-full flex items-center justify-center footer">
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
import type { CreatePositionType } from '~/types/org/positions/CreatePositionType'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import Times from '~/assets/icons/times.svg'
import Save from '~/assets/icons/save.svg'
import { CreatePositionValidate } from '~/validate/org/CreatePositionValidate'
const { t, locale } = useI18n()
const toast = useToast()
const { $orgAPI } = useNuxtApp()
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
  loading: false,
  name: '',
  nameError: null,
  description: '',
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
  CreatePositionValidate.name(instance, t, $orgAPI)
}

/// click close
const clickClose = () => {
  emits('click-close')
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

/// Create save position
const clickSave = async (evt: any) => {
  const validate = await CreatePositionValidate.all(instance, t, $orgAPI)
  if (!validate) {
    return
  }
  instance.value.loading = true
  let formData = new FormData()
  formData.append('avatar', instance.value.avatarFile)
  formData.append('name', instance.value.name || '')
  formData.append('description', instance.value.description || '')
  formData.append('active', JSON.stringify(instance.value.active))
  const options: any = {
    method: MethodCons.POST,
    body: formData,
    headers: { 'Content-Type': 'no-content-type' },
  }
  const response: any = await $orgAPI(APIOrgPositionCons.CREATE, options)
  instance.value.loading = false
  toast.add({
    severity: ToastCons.SUCCESS,
    summary: t('success'),
    detail: t('name_of_organization_has_been_created_successfully', {
      name: t('position'),
    }),
    life: ToastCons.DURATION,
  })
  emits('click-ok')
}
watch(
  () => props.visible,
  (value) => {
    /// Update show or hide from parent
    instance.value.visible = props.visible
    instance.value.name = null
    instance.value.description = null
    instance.value.active = true
    instance.value.loading = false
    instance.value.avatar = DefaultAvatar
  }
)
</script>
<style scoped lang="scss">
@import url('~/assets/scss/org/CreatePosition.scss');
</style>
