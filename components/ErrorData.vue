<template>
  <div class="error-data" v-if="props.status">
    <div class="content flex flex-row">
      <div class="status">
        <div class="status1"></div>
      </div>
      <div class="inner flex-1 flex flex-row">
        <LoadingImg :src="ErrorData"></LoadingImg>
        <div class="flex-1 ml-[10px]">
          {{
            $t(
              'an_unexpected_technical_issue_occurred_while_processing_your_request_our_system_is_currently_unable_to_complete_this_action_please_try_again_later'
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ErrorData from '~/assets/icons/error-data.svg'
const props = defineProps({
  status: {
    type: Boolean,
  },
})
</script>
<style scoped lang="scss">
@import url('~/assets/scss/components/ErrorData.scss');
</style>
