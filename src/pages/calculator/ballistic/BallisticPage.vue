<template>
  <div>
    <div class="row justify-between">
      <div class="col-auto">
        <div class="row">
          <div class="col-auto">
            <q-btn
              to="/calculator"
              outline
            >
              Back
            </q-btn>
          </div>
          <div class="col-auto text-h6 q-pl-md">
            Results
          </div>
        </div>
      </div>

      <div class="col-auto q-pr-sm">
        <OptionButton
          style="top:10px"
        />
      </div>
    </div>
    <!-- Profiles -->
    <div class="row q-mt-md q-col-gutter-md items-strech">
      <div class="col-xs-12 col-sm-6">
        <ProfileCard />
      </div>
      <div class="col-xs-12 col-sm-6">
        <CalculationCard />
      </div>
    </div>
    <!-- Atmospheric -->
    <AtmosphereCard
      v-show="options.showAtmospheric"
      class="q-mt-md"
    />
    <!-- Elevation chart -->
    <ElevationChartCard class="q-mt-md" />
    <!-- Elevation table -->
    <ElevationTableCard class="q-mt-md" />
    <!-- Velocity chart -->
    <VelocityChartCard
      v-show="options.showVelocityGraph"
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
// imports
import OptionButton from 'components/calculator/ballistic/OptionButton.vue'
import ProfileCard from 'components/calculator/ballistic/ProfileCard.vue'
import CalculationCard from 'components/calculator/ballistic/CalculationCard.vue'
import ElevationChartCard from 'components/calculator/ballistic/ElevationChartCard.vue'
import ElevationTableCard from 'components/calculator/ballistic/ElevationTableCard.vue'
import VelocityChartCard from 'components/calculator/ballistic/VelocityChartCard.vue'
import AtmosphereCard from 'components/calculator/ballistic/AtmosphereCard.vue'
import { useCalculatorStore } from 'stores/calculator'
import { computed } from 'vue'

// options
// calculator store
const calculatorStore = useCalculatorStore()
const options = computed(() => calculatorStore.options)
</script>
