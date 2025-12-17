<template>
  <div class="no-data" v-if="props.status">
    <div class="content flex flex-row">
      <div class="status">
        <div class="status1"></div>
      </div>
      <div class="inner flex-1 flex flex-row">
        <LoadingImg :src="NoData"></LoadingImg>
        <div class="flex-1 ml-[10px]">
          {{
            $t(
              'the_system_could_not_find_any_data_corresponding_to_your_request_please_check_the_applied_search_parameters_or_try_again_later'
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import NoData from '~/assets/icons/no-data.svg'
const props = defineProps({
  status: {
    type: Boolean,
  },
})
</script>
<style scoped lang="scss">
@import url('~/assets/scss/components/NoData.scss');
</style>
