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
                      <img :src="Times" class="w-[14px] icon" @click="clickClearName"></img>
                    </div>
                </div>
              </div>
            </div>
            <div class="mt-[15px]">
              <div class="flex items-start justify-start w-full">
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
                      <img :src="Times" class="w-[14px] icon" @click="clickClearDescription"></img>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-[10px]">
              <div class="flex items-start justify-start w-full">
                <label class="label">
                  {{ $t('status') }}
                </label>
                <div class="group-status">
                  <div class="flex items-center justify-start">
                    <Checkbox
                      v-model="instance.active"
                      binary
                      class="mr-[10px]"
                      @value-change="changeActive"
                    />
                    {{ $t('active') }}
                  </div>
                  <div class="flex items-center justify-start inactive">
                    <Checkbox
                      v-model="instance.inActive"
                      binary
                      @value-change="changeInActive"
                      class="mr-[10px]"
                    />
                    <span>
                      {{ $t('inactive') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label for="department-name" class="label">
                  {{ $t('sort') }}
                </label>
                <!-- <Checkbox
                  v-model="instance.active"
                  binary
                  class="mr-[10px]"
                  @value-change="changeActive"
                /> -->
                <div class="sort-group flex" @click="clickSort('name')">
                   <img :src="instance.sortNameIcon"class="icon"></img>
                    {{ $t('name') }}
                </div>

                <div class="sort-group flex ml-[20px]" @click="clickSort('description')">
                   <img :src="instance.sortDescriptionIcon" class="icon"></img>
                    {{ $t('description') }}
                </div>
               
            
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
import Sort from '~/assets/icons/sort-alt.svg'
import SortUp from '~/assets/icons/sort-alpha-up.svg'
import SortDown from '~/assets/icons/sort-alpha-down.svg'
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
  active: false,
  inActive: false,
  sortName:1,
  sortDescription:0,
  sortNameIcon:SortUp,
  sortDescriptionIcon:Sort
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
/// Clear name
const clickClearName = ()=>{
  instance.value.name='';
}
/// Clear description
const clickClearDescription = ()=>{
  instance.value.description = ""
}

const clickSort = (type:string)=>{
  // 0: UNSORT
  // 1: ASC
  // 2: DESC
  if(type == "name"){
      instance.value.sortDescription = 0;
      instance.value.sortDescriptionIcon = Sort;
      if(instance.value.sortName == 0){
        instance.value.sortName = 1
        instance.value.sortNameIcon = SortUp
      }else if(instance.value.sortName == 1){
        instance.value.sortName = 2
        instance.value.sortNameIcon = SortDown
      }else if(instance.value.sortName == 2){
        instance.value.sortName = 1
        instance.value.sortNameIcon = SortUp
      }
  }else if(type == "description"){
      instance.value.sortName = 0;
      instance.value.sortNameIcon = Sort;
      if(instance.value.sortDescription == 0){
        instance.value.sortDescription = 1
        instance.value.sortDescriptionIcon = SortUp
      }else if(instance.value.sortDescription == 1){
        instance.value.sortDescription = 2
        instance.value.sortDescriptionIcon = SortDown
      }else if(instance.value.sortDescription == 2){
        instance.value.sortDescription = 1
        instance.value.sortDescriptionIcon = SortUp
      }
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
  let sortField = "";
  let sortStatus = "";
  if(instance.value.sortName != 0){
    sortField = "name";
    if(instance.value.sortName == 1){
      sortStatus = "ASC"
    }else if(instance.value.sortName == 2){
      sortStatus = "DESC"
    }
  }else if(instance.value.sortDescription != 0){
    sortField = "description"
     if(instance.value.sortDescription == 1){
      sortStatus = "ASC"
    }else if(instance.value.sortDescription == 2){
      sortStatus = "DESC"
    }
  }
  console.log(`-------clickSave=${sortStatus}------------`)
  emits('click-ok', {
    name: instance.value.name,
    description: instance.value.description,
    active: instance.value.active,
    inActive: instance.value.inActive,
    sortField:sortField,
    sortStatus:sortStatus
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
