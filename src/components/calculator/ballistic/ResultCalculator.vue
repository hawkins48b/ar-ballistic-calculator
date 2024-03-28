<template>
  <div>
    <!-- Elevation chart -->
    <ElevationChartCard
      class="q-mt-md"
    />
    <!-- Elevation table -->
    <ElevationTableCard
      class="q-mt-md"
    />
    <!-- Velocity chart -->
    <VelocityChartCard
      v-show="options.showVelocityGraph"
      class="q-mt-md"
    />
    <!-- Windage table (includes canted angle effect) -->
    <WindageTableCard
      v-show="options.showWindConditions"
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
// imports
import ElevationChartCard from 'components/calculator/ballistic/ElevationChartCard.vue'
import ElevationTableCard from 'components/calculator/ballistic/ElevationTableCard.vue'
import VelocityChartCard from 'components/calculator/ballistic/VelocityChartCard.vue'
import WindageTableCard from 'components/calculator/ballistic/WindageTableCard.vue'
import { useBallisticStore } from 'stores/ballistic'
import { computed } from 'vue'

// options
// ballistic store
const ballisticStore = useBallisticStore()
const options = computed(() => ballisticStore.options)
</script>
