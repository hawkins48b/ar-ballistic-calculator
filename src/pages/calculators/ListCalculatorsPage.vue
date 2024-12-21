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
      <div class="col-xs-12 col-sm-6 col-md-4">
        <TrajectoryValidationCard
          flat
          class="q-pa-md"
          :class="{'bg-grey-3':!$q.dark.isActive}"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <CompareTrajectoriesCard
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
import TrajectoryValidationCard from 'components/calculators/list-calculators/TrajectoryValidationCard.vue'
import CompareTrajectoriesCard from 'components/calculators/list-calculators/CompareTrajectoriesCard.vue'

</script>
