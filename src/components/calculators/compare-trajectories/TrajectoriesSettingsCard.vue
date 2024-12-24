<template>
  <ZroCard>
    <q-card-section>
      <div class="text-h6">
        <q-icon
          name="tune"
          size="lg"
          class="q-mr-sm"
        />
        Range
      </div>
    </q-card-section>
    <q-card-section>
      <RangeForm v-model="range" />
    </q-card-section>
  </ZroCard>
</template>

<script setup>
import ZroCard from 'src/components/zroCard.vue'
import RangeForm from '../ballistic/RangeForm.vue'

import { useTrajectoriesStore } from 'stores/trajectories'
import { storeToRefs } from 'pinia'

const trajectoriesStore = useTrajectoriesStore()
const { range } = storeToRefs(trajectoriesStore)

</script>
