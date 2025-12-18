<template>
  <Dialog
    modal
    :dismissableMask="false"
    v-model:visible="instance.visible"
    @update:visible="updateVisible"
  >
    <template #container>
      <div class="filter-position">
        <div class="header w-full flex relative">
          <div
            class="text-[20px] w-full font-bold flex items-center justif-start"
          >
            {{ $t('filter') }}
          </div>
          <img
            :src="Times"
            class="w-[20px] close absolute right-0"
            @click="clickClose"
          />
        </div>
        <div class="contain items-center justify-center">
          <div class="inner">
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label for="name" class="label">{{ $t('name') }}</label>
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
                ></InputText>
              </div>
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
                ></Textarea>
              </div>
            </div>
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label for="department-name" class="label">
                  {{ $t('status') }}
                </label>
                <Checkbox
                  v-model="instance.active"
                  binary
                  class="mr-[10px]"
                  @value-change="changeActive"
                />
                {{ $t('active') }}
                <Checkbox
                  v-model="instance.inActive"
                  binary
                  @value-change="changeInActive"
                  class="ml-[20px] mr-[10px]"
                />
                <span>
                  {{ $t('inactive') }}
                </span>
              </div>
            </div>
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label for="department-name" class="label">
                  {{ $t('sort') }}
                </label>
                <Checkbox
                  v-model="instance.active"
                  binary
                  class="mr-[10px]"
                  @value-change="changeActive"
                />
                {{ $t('name') }}
                <Checkbox
                  v-model="instance.inActive"
                  binary
                  @value-change="changeInActive"
                  class="ml-[20px] mr-[10px]"
                />
                <span>
                  {{ $t('description') }}
                </span>
              </div>
            </div>
            <div class="w-full line h-[1px] mt-[20px]"></div>
            <div class="w-full flex items-center justify-center footer">
              <Button
                severity="info"
                :label="$t('filter')"
                class="h-[30px] button"
                @click="clickSave"
              >
                <template #icon>
                  <img :src="Filter" class="w-[14px] icon" />
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
import Times from '~/assets/icons/times.svg'
import Filter from '~/assets/icons/filter.svg'
import type { FilterPositionDialogType } from '~/types/org/positions/FilterPositionDialogType'
const props = defineProps({
  data: {
    type: Object as PropType<any>,
  },
  visible: {
    type: Boolean,
    required: false,
  },
})
const instance = ref<FilterPositionDialogType>({
  visible: false,
  name: null,
  description: null,
  sort: null,
  active: false,
  inActive: false,
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
const changeName = (evt: any) => {}

/// click close
const clickClose = () => {
  emits('click-close')
}

/// Change active
const changeActive = (evt: any) => {
  if (evt) {
    instance.value.inActive = false
  }
}
/// Change inactive
const changeInActive = (evt: any) => {
  if (evt) {
    instance.value.active = false
  }
}

/// Create save position
const clickSave = async (evt: any) => {
  emits('click-ok', {
    name: instance.value.name,
    description: instance.value.description,
    active: instance.value.active,
    inActive: instance.value.inActive,
  })
}
watch(
  () => props.visible,
  (value) => {
    /// Update show or hide from parent
    instance.value.visible = props.visible

    instance.value.name = null
    instance.value.description = null
    instance.value.active = true

    if (value && props.data) {
      instance.value.name = props.data.name
      instance.value.description = props.data.description
      instance.value.active = props.data.active
    }
  }
)
</script>
<style scoped lang="scss">
@import url('~/assets/scss/org/positions/FilterPosition.scss');
</style>
