<template>
  <div>
    <div class="row">
      <div class="col-auto">
        <BackBtn />
      </div>
    </div>
    <div class="row">
      <div class="col-auto">
        <AddTrajectoryBtn />
      </div>
    </div>
    <TrajectoriesList />
    <TrajectoriesChart />
  </div>
</template>

<script setup>
import BackBtn from 'components/calculators/compare-trajectories/BackBtn.vue'
import TrajectoriesList from 'components/calculators/compare-trajectories/TrajectoriesList.vue'
import TrajectoriesChart from 'components/calculators/compare-trajectories/TrajectoriesChart.vue'
import AddTrajectoryBtn from 'components/calculators/compare-trajectories/AddTrajectoryBtn.vue'

</script>
