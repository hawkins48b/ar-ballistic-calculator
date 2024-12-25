<template>
  <zroCard>
    <q-card-section>
      <div class="text-h6">
        <q-icon
          name="cloud"
          size="lg"
          class="q-mr-sm"
        />
        Atmospheric Conditions
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <AtmosphereForm
        v-model="atmosphere"
        class="q-mt-md"
      />
    </q-card-section>
  </zroCard>
</template>

<script setup>
// imports
import AtmosphereForm from 'components/calculators/ballistic/AtmosphereForm.vue'
import zroCard from 'components/zroCard.vue'
import { storeToRefs } from 'pinia'
import { useBallisticStore } from 'stores/ballistic'

// ballistic store
const ballisticStore = useBallisticStore()

// options
const {
  atmosphere
} = storeToRefs(ballisticStore)

</script>
