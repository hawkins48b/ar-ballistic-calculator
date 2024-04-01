<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md"
  >
    <q-inner-loading
      :showing="loading"
      color="primary"
    />

    <q-card-section v-show="!loading">
      <p class="text-h6">
        MPBR Results
      </p>
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label overline>
              NEAR ZERO
            </q-item-label>
            <q-item-label class="text-bold">
              {{ nearZero }} {{ distanceUnit }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label overline>
              FAR ZERO
            </q-item-label>
            <q-item-label class="text-bold">
              {{ farZero }} {{ distanceUnit }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label overline>
              Maximum Point Blank Range
            </q-item-label>
            <q-item-label class="text-bold">
              {{ mpbrDistance }} {{ distanceUnit }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
// imports
import { computed, ref, watch } from 'vue'
import { useMpbrStore } from 'stores/mpbr'

// mpbr store
const mpbrStore = useMpbrStore()
// load series by watching shot
// const mpbrShot = ref()
const loading = ref(false)

const nearZero = ref(0)
const farZero = ref(0)
const mpbrDistance = ref(0)
const distanceUnit = computed(() => mpbrStore.distanceUnit)

// watch if data changes
watch(mpbrStore, async () => {
  if (mpbrStore.profileId && mpbrStore.target.size > 0) {
    // calculate maximum point blank range
    // mpbrShot.value = await mpbrStore.calculateMpbr()
  }
},
{
  deep: true
})

</script>
