<template>
  <div>
    <!-- Elevation chart -->
    <ElevationChartCard
      class="q-mt-md"
    />
    <!-- Elevation table -->
    <TableCard
      class="q-mt-md"
    />
    <!-- Velocity chart -->
    <VelocityChartCard
      v-show="options.showVelocityGraph"
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
// imports
import ElevationChartCard from 'components/calculators/ballistic/ElevationChartCard.vue'
import TableCard from 'components/calculators/ballistic/TableCard.vue'
import VelocityChartCard from 'components/calculators/ballistic/VelocityChartCard.vue'
import { useBallisticStore } from 'stores/ballistic'
import { computed } from 'vue'

// options
// ballistic store
const ballisticStore = useBallisticStore()
const options = computed(() => ballisticStore.options)
</script>
