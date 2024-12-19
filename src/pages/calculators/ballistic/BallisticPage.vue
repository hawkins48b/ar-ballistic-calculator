<template>
  <div>
    <div class="row justify-between">
      <div class="col-auto">
        <q-btn
          flat
          to="/calculators"
          icon="arrow_back"
        />
      </div>

      <div class="col-auto q-pr-sm">
        <OptionButton />
      </div>
    </div>
    <!-- Profiles -->
    <ProfileCard class="q-mt-md" />
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
  </div>
</template>

<script setup>
// imports
import OptionButton from 'components/calculators/ballistic/OptionButton.vue'
import ProfileCard from 'components/calculators/ballistic/ProfileCard.vue'
import RangeCard from 'components/calculators/ballistic/RangeCard.vue'
import ResultCalculator from 'components/calculators/ballistic/ResultCalculator.vue'
import AtmosphereCard from 'components/calculators/ballistic/AtmosphereCard.vue'
import WindConditionsCard from 'components/calculators/ballistic/WindConditionsCard.vue'
import SightAdjustmentCard from 'components/calculators/ballistic/SightAdjustmentCard.vue'
import { useBallisticStore } from 'stores/ballistic'
import { computed } from 'vue'

// options
// ballistic store
const ballisticStore = useBallisticStore()
const options = computed(() => ballisticStore.options)
const showCalcResult = computed(() => ballisticStore.profileId)
</script>
