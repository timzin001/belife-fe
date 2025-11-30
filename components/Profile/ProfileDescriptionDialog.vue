<template>
  <Dialog
    modal
    :dismissableMask="true"
    v-model:visible="instance.visible"
    @update:visible="updateVisible"
  >
    <template #container>
      <div class="header flex">
        <span class="font-bold text-[16px] flex-1">{{
          instance.titleDialog
        }}</span>
        <div class="flex loading" v-if="instance.loading">
          <div class="spinner-mini"></div>
        </div>
      </div>
      <div class="body">
        <div class="line h-[2px] rouned-[5px]"></div>

        <div class="mt-[20px] mb-[20px]">
          <div class="flex items-center justify-start">
            <textarea id="tiny-description"></textarea>
          </div>

          <Message
            v-if="instance.descriptionError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.descriptionError }}</Message
          >
        </div>

        <div class="line h-[2px] rouned-[5px]"></div>
      </div>
      <div class="footer flex item-center justify-end">
        <Button
          class="h-[32px] w-[90px]"
          type="button"
          :label="$t('cancel')"
          severity="warn"
          icon="pi pi-times"
          @click="clickClose"
        ></Button>

        <Button
          class="ml-[20px] h-[32px] w-[90px]"
          type="button"
          severity="success"
          :label="$t('save')"
          icon="pi pi-save"
          @click="clickSave"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
/// Import
import type { UpdateDescriptionData } from '~/types/account/ProfileType'
import { ProfileValidate } from '~/validate/ProfileValidate'
import { GlobalStore } from '~/store/Global'
/// Define
const store = GlobalStore()
const toast = useToast()
const { t } = useI18n()
const emits = defineEmits(['click-close', 'click-save'])
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
})
const instance = ref<UpdateDescriptionData>({
  titleDialog: t('update_description'),
})

/// Method
const clickSave = async () => {
  // @ts-ignore
  const descriptionText = tinymce
    .get('tiny-description')
    .getContent({ format: 'text' })
  // @ts-ignore
  const descriptionHtml = tinymce.get('tiny-description').getContent()
  const validate = ProfileValidate.description(instance, descriptionText, t)
  if (!validate) {
    return
  }
  /// Show loading
  instance.value.loading = true
  /// Update description
  const options: any = {
    method: Method.POST,
    body: {
      description: descriptionHtml,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPath.POST_UPDATE_DESCRIPTION_USER,
    options,
    toast,
    t,
    false
  )
  instance.value.loading = false
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
  const contain: any = data.value
  const result = contain.data
  toast.add({
    severity: Toast.SUCCESS,
    summary: t('success'),
    detail: t('description_updated_successful'),
    life: Toast.DURATION,
  })
  emits('click-save', result)
}

/// Click close dialog
const clickClose = () => {
  emits('click-close')
}
/// Update visible
const updateVisible = (value: any) => {
  if (!value) {
    /// Close dialog
    instance.value.visible = props.visible
    emits('click-close')
  }
}

watch(
  () => props.visible,
  (value) => {
    /// Update show or hide from parent
    instance.value.visible = props.visible
    if (value) {
      setTimeout(() => {
        //@ts-ignore
        tinymce.init({
          selector: '#tiny-description',
          menubar: false,
          statusbar: false,
          height: 200,
          content_style: 'body { font-size: 14px; }',
          toolbar:
            'undo redo | bold italic underline| alignleft aligncenter alignright alignjustify | indent outdent | wordcount | subscript superscript strikethrough |',

          setup: (editor: any) => {
            editor.on('init', (e: any) => {
              editor.setContent(props.description)
            })
            editor.on('keydown', (e: any) => {
              //@ts-ignore
              const description = tinymce
                .get('tiny-description')
                .getContent({ format: 'text' })

              ProfileValidate.description(instance, description, t)
            })
          },
        })
      }, 50)
    } else {
      //@ts-ignore
      tinymce.activeEditor.remove('tiny-descriptions')
    }
  }
)
</script>

<style scoped lang="scss">
textarea {
  width: 100%;
}
:deep(.tox) {
  width: 100%;
}
:deep(.p-message-text) {
  padding-left: 110px !important;
}
.header,
.body,
.footer {
  width: 500px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 14px;
}
.header {
  padding-top: 30px;
  padding-bottom: 20px;
}
.footer {
  padding-top: 20px;
  padding-bottom: 30px;
}
.body {
  padding-bottom: unset;
  padding-top: unset;
  .line {
    border-radius: 5px;
    border-bottom: 1px dashed $border-color;
  }
  .label {
    width: 110px;
    span {
      color: red;
      margin-left: 2px;
    }
  }
  .image {
    width: 50px;
  }
  .avatar-des {
    margin-left: 110px;
  }
}
/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  :deep(.p-message-text) {
    padding-left: 100px !important;
  }
  .header,
  .body,
  .footer {
    width: 100%;
    padding: 10px;
  }
  .header {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .footer {
    padding-top: 20px;
  }
  .body {
    padding-bottom: unset;
    padding-top: unset;
    .avatar-des {
      margin-left: 100px;
    }
    .line {
      background-color: $border-color;
    }
    .label {
      width: 100px;
    }
    .image {
      width: 50px;
    }
  }
}
</style>
