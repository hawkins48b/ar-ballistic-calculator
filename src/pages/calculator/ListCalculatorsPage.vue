<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm">
        <BallisticCalculatorCard
          flat
          class="q-pa-md"
          :class="{'bg-grey-3':!$q.dark.isActive}"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm">
        <MaximumPointBlankRangeCard
          flat
          class="q-pa-md"
          :class="{'bg-grey-3':!$q.dark.isActive}"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MaximumPointBlankRangeCard from 'components/calculator/list-calculators/MaximumPointBlankRangeCard.vue'
import BallisticCalculatorCard from 'components/calculator/list-calculators/BallisticCalculatorCard.vue'

</script>
