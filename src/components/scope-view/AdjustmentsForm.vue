<template>
  <div class="row items-center q-gutter-md">
    <div class="col">
      <q-select
        v-model="adjustments.elevation"
        emit-value
        label="Elevation adjustment"
        :options="options"
        filled
        @update:model-value="changeElevation"
      />
      <q-select
        v-model="adjustments.windage"
        emit-value
        class="q-mt-md"
        label="Windage adjustment"
        :options="options"
        filled
        @update:model-value="changeWindage"
      />
    </div>
    <div class="col-auto">
      <q-btn
        :icon="adjustments.link ? 'link' : 'link_off'"
        @click="adjustments.link = !adjustments.link"
      />
    </div>
  </div>
</template>

<script setup>

import { useScopeViewStore } from 'src/stores/scopeview'
import { storeToRefs } from 'pinia'

const scopeViewStore = useScopeViewStore()
const { adjustments } = storeToRefs(scopeViewStore)

const options = [
  {
    label: 'MOA',
    value: 'MOA'
  },
  {
    label: 'MRAD',
    value: 'MRAD'
  },
  {
    label: 'IN',
    value: 'IN'
  },
  {
    label: 'FT',
    value: 'FEET'
  },
  {
    label: 'CM',
    value: 'CM'
  },
  {
    label: 'M',
    value: 'M'
  }
]

const changeElevation = function () {
  if (adjustments.value.link) {
    adjustments.value.windage = adjustments.value.elevation
  }
}
const changeWindage = function () {
  if (adjustments.value.link) {
    adjustments.value.elevation = adjustments.value.windage
  }
}

</script>
