<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <BallisticCalculatorCard />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <MaximumPointBlankRangeCard />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <TrajectoryValidationCard />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <CompareTrajectoriesCard />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <DopeCardsCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import MaximumPointBlankRangeCard from 'components/calculators/list-calculators/MaximumPointBlankRangeCard.vue'
import BallisticCalculatorCard from 'components/calculators/list-calculators/BallisticCalculatorCard.vue'
import TrajectoryValidationCard from 'components/calculators/list-calculators/TrajectoryValidationCard.vue'
import CompareTrajectoriesCard from 'components/calculators/list-calculators/CompareTrajectoriesCard.vue'
import DopeCardsCard from 'components/calculators/list-calculators/DopeCardsCard.vue'

</script>
