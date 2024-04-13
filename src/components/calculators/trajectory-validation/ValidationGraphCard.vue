<template>
  <div>
    <div>
      {{ settings }}
    </div>
    <div>
      {{ validShot }}
    </div>
  </div>
</template>

<script setup>
// imports
import { useTrajectoryValidationStore } from 'stores/trajectoryValidation'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

// set trajectory validation store
const trajectoryValidationStore = useTrajectoryValidationStore()
const { settings } = storeToRefs(trajectoryValidationStore)

const validShot = ref()

watch(() => trajectoryValidationStore, () => {
  if (trajectoryValidationStore.profileId && trajectoryValidationStore.settings.range.distance > 0) {
    if (trajectoryValidationStore.settings.measures.elevation <= 10) {
      validShot.value = trajectoryValidationStore.calculatTrajectoryValidation()
    }
  }
},
{
  immediate: true,
  deep: true
})
</script>
