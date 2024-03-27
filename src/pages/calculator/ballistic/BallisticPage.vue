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
          v-if="false"
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
    <!-- chart -->
    <ElevationChart class="q-mt-md" />
    <!-- table -->
    <ElevationTable class="q-mt-md" />
  </div>
</template>

<script setup>
// imports
import OptionButton from 'components/calculator/ballistic/OptionButton.vue'
import ProfileCard from 'components/calculator/ballistic/ProfileCard.vue'
import CalculationCard from 'components/calculator/ballistic/CalculationCard.vue'
import ElevationChart from 'components/calculator/ballistic/ElevationChart.vue'
import ElevationTable from 'components/calculator/ballistic/ElevationTable.vue'
</script>
