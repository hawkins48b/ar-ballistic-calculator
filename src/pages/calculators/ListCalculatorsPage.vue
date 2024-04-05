<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <BallisticCalculatorCard
          flat
          class="q-pa-md"
          :class="{'bg-grey-3':!$q.dark.isActive}"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
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
import MaximumPointBlankRangeCard from 'components/calculators/list-calculators/MaximumPointBlankRangeCard.vue'
import BallisticCalculatorCard from 'components/calculators/list-calculators/BallisticCalculatorCard.vue'

</script>
