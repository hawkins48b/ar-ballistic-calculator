<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div class="row justify-between">
      <div class="col-auto">
        <p class="text-h6">
          Shot Angle
        </p>
      </div>
      <div class="col-auto">
        <q-btn
          icon="restart_alt"
          flat
          @click="ballisticStore.resetShotAngle"
        >
          <q-tooltip>
            Reset
          </q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-input
      v-model="shotAngle.relativeAngle"
      label="Rifle elevation angle"
      type="number"
      filled
      debounce="500"
      class="q-mt-md"
      suffix="degrees"
    />
  </q-card>
</template>

<script setup>
// imports
import { storeToRefs } from 'pinia'
import { useBallisticStore } from 'stores/ballistic'
import { watch } from 'vue'

// ballistic store
const ballisticStore = useBallisticStore()
// wind state
const {
  shotAngle,
  options
} = storeToRefs(ballisticStore)

// if we hide wind conditions, reset wind parameters
watch(() => options.value.showShotAngle, (newValue) => {
  if (!newValue) {
    ballisticStore.resetShotAngle()
  }
}, {
  immediate: true
})
</script>
