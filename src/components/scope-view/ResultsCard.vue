<template>
  <q-card v-if="scopeViewStore.getTrajectory">
    <q-card-section>
      <div class="text-h6">
        <q-icon
          name="build_circle"
          size="lg"
          class="q-mr-sm"
        />
        Adjustments
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row items-center">
        <div class="col">
          <AdjustmentsElevation />
        </div>
        <div class="col">
          <AdjustmentsWindage />
        </div>
      </div>
      <q-separator class="q-mt-md" />
      <TrajectoryInfo />

      <q-separator class="q-mt-md" />
      <AdjustmentsForm class="q-mt-md" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import AdjustmentsForm from './AdjustmentsForm.vue'
import AdjustmentsElevation from './AdjustmentsElevation.vue'
import AdjustmentsWindage from './AdjustmentsWindage.vue'
import TrajectoryInfo from './TrajectoryInfo.vue'
import { useScopeViewStore } from 'stores/scopeview'

const scopeViewStore = useScopeViewStore()

</script>
