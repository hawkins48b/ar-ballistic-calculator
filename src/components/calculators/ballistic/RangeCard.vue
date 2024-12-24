<template>
  <zroCard
    class="full-height"
  >
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
    <q-separator />
    <q-card-section>
      <RangeForm v-model="range" />
    </q-card-section>
  </zroCard>
</template>

<script setup>
import { useBallisticStore } from 'stores/ballistic'
import { storeToRefs } from 'pinia'
import zroCard from 'components/zroCard.vue'
import RangeForm from 'components/calculators/ballistic/RangeForm.vue'// set calculation profile

const ballisticStore = useBallisticStore()
const { range } = storeToRefs(ballisticStore)

</script>
