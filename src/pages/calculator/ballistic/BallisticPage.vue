<template>
  <div>
    <div class="row justify-between">
      <div class="col-auto">
        <div class="row">
          <div class="col-auto">
            <q-btn
              flat
              to="/calculator"
              icon="arrow_back"
            />
          </div>
          <div class="col-auto text-h6 q-pl-md">
            Ballistic
          </div>
        </div>
      </div>

      <div class="col-auto q-pr-sm">
        <OptionButton />
      </div>
    </div>
    <!-- Profiles -->
    <div class="row q-mt-md q-col-gutter-md items-stretch">
      <div class="col-xs-12 col-sm-6">
        <CalculationCard />
      </div>
      <div class="col-xs-12 col-sm-6">
        <ProfileCard />
      </div>
    </div>
    <div class="row q-mt-xs q-col-gutter-md items-stretch">
      <div class="col-xs-12 col-sm-6">
        <!-- Atmospheric -->
        <AtmosphereCard
          v-show="options.showAtmospheric"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <WindConditionsCard
          v-show="options.showWindConditions"
        />
        <ShotAngleCard
          v-show="options.showShotAngle"
          class="q-mt-md"
        />
      </div>
    </div>
    <ResultCalculator v-if="showCalcResult" />
  </div>
</template>

<script setup>
// imports
import OptionButton from 'components/calculator/ballistic/OptionButton.vue'
import ProfileCard from 'components/calculator/ballistic/ProfileCard.vue'
import CalculationCard from 'components/calculator/ballistic/CalculationCard.vue'
import ResultCalculator from 'components/calculator/ballistic/ResultCalculator.vue'
import AtmosphereCard from 'components/calculator/ballistic/AtmosphereCard.vue'
import WindConditionsCard from 'components/calculator/ballistic/WindConditionsCard.vue'
import ShotAngleCard from 'components/calculator/ballistic/ShotAngleCard.vue'
import { useCalculatorStore } from 'stores/calculator'
import { computed } from 'vue'

// options
// calculator store
const calculatorStore = useCalculatorStore()
const options = computed(() => calculatorStore.options)
const showCalcResult = computed(() => calculatorStore.profileId > -1)
</script>
