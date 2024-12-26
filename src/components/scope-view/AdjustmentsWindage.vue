<template>
  <div class="row items-center q-gutter-md">
    <div class="col-auto">
      <div>
        <q-icon
          :name="direction === 'LEFT' || direction === '' ? 'arrow_back' : 'arrow_forward'"
          size="xl"
        />
      </div>
      <div class="text-center">
        {{ direction }}
      </div>
    </div>
    <div class="col text-h4">
      {{ Math.abs(scopeViewStore.getWindage) }} {{ adjustments.windage }}
    </div>
  </div>
</template>

<script setup>

import { useScopeViewStore } from 'stores/scopeview'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const scopeViewStore = useScopeViewStore()
const { adjustments } = storeToRefs(scopeViewStore)

const direction = computed(() => {
  let dir = ''
  if (scopeViewStore.getWindage > 0) {
    dir = 'LEFT'
  }
  if (scopeViewStore.getWindage < 0) {
    dir = 'RIGHT'
  }
  return dir
})

</script>
