<template>
  <Dialog
    modal
    :dismissableMask="false"
    v-model:visible="instance.visible"
    @update:visible="updateVisible"
  >
    <template #container>
      <div class="create-department">
        <div class="header w-full flex relative">
          <div
            class="text-[20px] w-full font-bold flex items-center justify-center"
          >
            {{
              instance.data
                ? $t('update_name', {
                    name: $t('department').toLocaleLowerCase(),
                  })
                : $t('create_name', {
                    name: $t('department').toLocaleLowerCase(),
                  })
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
              <div class="flex item2 items-center justify-start">
                <label class="label">{{ $t('avatar') }}<span>*</span></label>
                <div class="image-group flex items-center">
                  <FileUpload
                    mode="basic"
                    @select="onFileSelectAvatar"
                    customUpload
                    auto
                    :chooseLabel="$t('choose')"
                    severity="secondary"
                    class="p-button-outlined h-[32px] flex-1"
                  />

                  <div class="ml-[50px]">
                    <LoadingImg :src="instance.avatar" />
                  </div>
                </div>
              </div>
              <div class="avatar-des">{{ $t('avatar_with_1_1_ratio') }}</div>
              <Message
                v-if="instance.avatarError"
                severity="error"
                size="small"
                class="avatar-error"
                variant="simple"
                >{{ instance.avatarError }}</Message
              >
            </div>
            <div class="mt-[15px]">
              <div class="flex item1 items-center justify-start w-full">
                <label for="name" class="label"
                  >{{ $t('name') }}<span>*</span></label
                >
                <div class="group-input">
                  <InputText
                    id="name"
                    v-model="instance.name"
                    class="w-full"
                    @value-change="changeName"
                    autocomplete="off"
                    :placeholder="
                      $t('please_enter_name', {
                        name: $t('name').toLocaleLowerCase(),
                      })
                    "
                  ></InputText>
                  <div class="clear" v-if="instance.name">
                    <img
                      :src="Times"
                      class="w-[14px] icon"
                      @click="clickClearName"
                    />
                  </div>
                </div>
              </div>

              <Message
                v-if="instance.nameError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.nameError }}</Message
              >
            </div>
            <div class="mt-[15px]">
              <div class="flex item1 items-center justify-start w-full">
                <label for="name" class="label"
                  >{{ $t('group') }}<span>*</span></label
                >
                <div class="group-input flex">
                  <div class="select-group">
                    <Select
                      v-model="instance.group"
                      :options="props.listGroups"
                      optionLabel="name"
                      :autoOptionFocus="true"
                      @value-change="onChangeGroup"
                      :placeholder="
                        $t('select_name', {
                          name: $t('group').toLocaleLowerCase(),
                        })
                      "
                      class="w-full h-[30px]"
                    >
                      <template #value="slotProps">
                        <div v-if="slotProps.value" class="option-item">
                          <LoadingImg
                            :src="slotProps.value.avatar.location"
                          ></LoadingImg>

                          <div class="option-text1">
                            {{ slotProps.value.name[locale] }}
                          </div>
                        </div>
                        <span v-else class="pl-[10px]">
                          {{ slotProps.placeholder }}
                        </span>
                      </template>
                      <template #option="slotProps">
                        <div class="h-[30px] option-item">
                          <LoadingImg
                            :src="slotProps.option.avatar.location"
                          ></LoadingImg>
                          <div class="option-text2">
                            {{ slotProps.option.name[locale] }}
                          </div>
                        </div>
                      </template>
                    </Select>
                    <div class="clear" v-if="instance.group">
                      <img
                        :src="Times"
                        class="w-[14px] icon"
                        @click="clickClearGroup"
                      />
                    </div>
                  </div>
                  <Button
                    severity="success"
                    :label="$t('create')"
                    class="h-[30px] button ml-[15px]"
                    @click="clickCreateGroup"
                  >
                    <template #icon>
                      <img :src="Add" class="w-[14px] icon" />
                    </template>
                  </Button>
                </div>
              </div>

              <Message
                v-if="instance.groupError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.groupError }}</Message
              >
            </div>
            <div class="mt-[15px]">
              <div class="flex item4 items-start justify-start w-full">
                <div class="label">{{ $t('description') }}</div>
                <div class="group-input">
                  <Textarea
                    class="w-full"
                    autocomplete="off"
                    rows="2"
                    v-model="instance.description"
                    :placeholder="
                      $t('please_enter_name', {
                        name: $t('description').toLocaleLowerCase(),
                      })
                    "
                  ></Textarea>
                  <div class="clear" v-if="instance.description">
                    <img
                      :src="Times"
                      class="w-[14px] icon"
                      @click="clickClearDescription"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-[15px]">
              <div class="flex item3 items-center justify-start w-full">
                <label for="active-name" class="label">{{
                  $t('active')
                }}</label>
                <Checkbox v-model="instance.active" binary id="active-name" />
              </div>
            </div>
            <div class="w-full line h-[1px] mt-[20px]"></div>
            <div class="w-full flex items-center justify-center footer">
              <Button
                severity="success"
                :label="props.data ? $t('update') : $t('save')"
                class="h-[30px] button"
                @click="clickSave"
              >
                <template #icon>
                  <img
                    :src="instance.data ? Update : Save"
                    class="w-[14px] icon"
                  />
                </template>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
  <CreateUpdateGroupDialog
    :visible="instance.createGroupVisible"
    @click-ok="clickOkCreateGroupDialog"
    @click-close="clickCloseCreateGroupDialog"
  />
</template>
<script setup lang="ts">
import type { CreateDepartmentType } from '~/types/org/departments/CreateDepartmentType'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import Times from '~/assets/icons/times.svg'
import Save from '~/assets/icons/save.svg'
import Add from '~/assets/icons/add.svg'
import Update from '~/assets/icons/update.svg'
import { CreateDepartmentValidate } from '~/validate/org/departments/CreateDepartmentValidate'
import LoadingImg from '~/components/LoadingImg.vue'
import CreateUpdateGroupDialog from './create-update-group-dialog.vue'

const { t, locale } = useI18n()
const toast = useToast()
const { $orgAPI } = useNuxtApp()
const props = defineProps({
  data: {
    type: Object as PropType<any>,
  },
  listGroups: {
    type: Array,
  },
  group: {
    type: Object as PropType<any>,
  },
  visible: {
    type: Boolean,
    required: false,
  },
})
const instance = ref<CreateDepartmentType>({
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
  data: null,
  group: null,
  listGroups: [],
  createGroupVisible: false,
  groupError: null,
})
const emits = defineEmits(['click-close', 'reload-list-groups', 'click-ok'])
/// Update visible
const updateVisible = (value: any) => {
  if (!value) {
    /// Close dialog
    instance.value.visible = props.visible
    emits('click-close')
  }
}
const clickOkCreateGroupDialog = () => {
  instance.value.createGroupVisible = false
  console.log('clickOkCreateDialog')
  emits('reload-list-groups')
}
const clickCloseCreateGroupDialog = () => {
  instance.value.createGroupVisible = false
}
/// Click create group
const clickCreateGroup = async () => {
  instance.value.createGroupVisible = true
}
/// Change name
const changeName = (evt: any) => {
  CreateDepartmentValidate.name(instance, t, $orgAPI, locale.value)
}

/// Chnage group
const onChangeGroup = (evt: any) => {
  CreateDepartmentValidate.group(instance, t, locale.value)
}

/// click close
const clickClose = () => {
  emits('click-close')
}
/// Click clear group
const clickClearGroup = () => {
  instance.value.group = null
  CreateDepartmentValidate.group(instance, t, locale.value)
}

/// Clear name
const clickClearName = () => {
  instance.value.name = ''
  CreateDepartmentValidate.name(instance, t, $orgAPI, locale.value)
}
/// Clear description
const clickClearDescription = () => {
  instance.value.description = ''
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

/// Handle update
const handleUpdate = async () => {
  const validate = await CreateDepartmentValidate.all(
    instance,
    t,
    $orgAPI,
    locale.value
  )
  if (!validate) {
    return
  }
  instance.value.loading = true
  let formData = new FormData()
  formData.append('id', instance.value.data.id)
  if (instance.value.avatarFile) {
    formData.append('avatar', instance.value.avatarFile)
  }
  if (instance.value.name) {
    formData.append('name', instance.value.name || '')
  }
  if (instance.value.description) {
    formData.append('description', instance.value.description || '')
  }
  if (props.group?.id != instance.value.group.id) {
    formData.append('groupId', instance.value.group.id || '')
  }

  formData.append('active', JSON.stringify(instance.value.active))
  const options: any = {
    method: MethodCons.POST,
    body: formData,
    headers: { 'Content-Type': 'no-content-type' },
  }
  const response: any = await $orgAPI(APIOrgDepartmentCons.UPDATE, options)
  instance.value.loading = false
  toast.add({
    severity: ToastCons.SUCCESS,
    summary: t('success'),
    detail: t('name_of_organization_has_been_updated_successfully', {
      name: t('position'),
    }),
    life: ToastCons.DURATION,
  })
  emits('click-ok')
}

/// Handle save
const handleSave = async () => {
  const validate = await CreateDepartmentValidate.all(
    instance,
    t,
    $orgAPI,
    locale.value
  )
  if (!validate) {
    return
  }
  instance.value.loading = true
  let formData = new FormData()
  formData.append('avatar', instance.value.avatarFile)
  formData.append('name', instance.value.name || '')
  formData.append('description', instance.value.description || '')
  formData.append('groupId', instance.value.group.id || '')
  formData.append('active', JSON.stringify(instance.value.active))
  const options: any = {
    method: MethodCons.POST,
    body: formData,
    headers: { 'Content-Type': 'no-content-type' },
  }
  const response: any = await $orgAPI(APIOrgDepartmentCons.CREATE, options)
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
/// Create save position
const clickSave = async (evt: any) => {
  if (props.data) {
    handleUpdate()
  } else {
    console.log('Call handleSave')
    handleSave()
  }
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
    instance.value.data = null
    instance.value.group = null

    if (value && props.data) {
      instance.value.name = props.data.name[locale.value]
      instance.value.description = props.data.description[locale.value]
      instance.value.avatar = props.data.avatar.location
      instance.value.active = props.data.active.value
      instance.value.data = props.data
      /// Find group
      const listGroups = props.listGroups || []
      const filter: any = listGroups.filter((item: any) => {
        console.log(item)
        console.log(`${item.id} == ${props.group.id}`)
        console.log(item.id == props.group.id)
        return item.id == props.group.id
      })

      if (filter.length) {
        instance.value.group = filter[0]
      }
    }
  }
)
</script>
<style scoped lang="scss">
@import url('~/assets/scss/org/departments/CreateDepartment.scss');
</style>
