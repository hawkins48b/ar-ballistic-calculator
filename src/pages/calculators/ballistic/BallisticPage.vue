<template>
  <q-page class="q-pa-md">
    <pageHeader>
      <OptionButton />
    </pageHeader>
    <!-- Profiles -->
    <SetupCard />
    <div class="row q-mt-xs q-col-gutter-md items-stretch">
      <div class="col-xs-12 col-sm-6">
        <RangeCard />
      </div>
      <div
        v-show="options.showAtmospheric"
        class="col-xs-12 col-sm-6"
      >
        <AtmosphereCard />
      </div>
      <div
        v-show="options.showWindConditions"
        class="col-xs-12 col-sm-6"
      >
        <WindConditionsCard />
      </div>
      <div
        v-show="options.showSightAdjustment"
        class="col-xs-12 col-sm-6"
      >
        <SightAdjustmentCard />
      </div>
    </div>
    <ResultCalculator v-if="showCalcResult" />
  </q-page>
</template>

<script setup>
// imports
import PageHeader from 'src/components/layout/PageHeader.vue'
import OptionButton from 'components/calculators/ballistic/OptionButton.vue'
import SetupCard from 'components/calculators/ballistic/SetupCard.vue'
import RangeCard from 'components/calculators/ballistic/RangeCard.vue'
import ResultCalculator from 'components/calculators/ballistic/ResultCalculator.vue'
import AtmosphereCard from 'components/calculators/ballistic/AtmosphereCard.vue'
import WindConditionsCard from 'components/calculators/ballistic/WindConditionsCard.vue'
import SightAdjustmentCard from 'components/calculators/ballistic/SightAdjustmentCard.vue'
import { useBallisticStore } from 'stores/calculators/ballistic'
import { computed } from 'vue'

// options
// ballistic store
const ballisticStore = useBallisticStore()
const options = computed(() => ballisticStore.options)
const showCalcResult = computed(() => ballisticStore.setupId)
</script>
