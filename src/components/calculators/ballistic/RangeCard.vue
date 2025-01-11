<template>
  <q-card
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
  </q-card>
</template>

<script setup>
import { useBallisticStore } from 'stores/calculators/ballistic'
import { storeToRefs } from 'pinia'
import RangeForm from 'components/calculators/ballistic/RangeForm.vue'// set calculation profile

const ballisticStore = useBallisticStore()
const { range } = storeToRefs(ballisticStore)

</script>
