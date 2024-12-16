<template>
  <div>
    <div class="row">
      <div class="col-auto">
        <q-btn
          flat
          to="/calculators"
          icon="arrow_back"
        />
      </div>
      <div class="col-auto text-h6 q-pl-md">
        Trajectory Validation
      </div>
    </div>
    <!-- Profiles -->
    <ProfileCard class="q-mt-sm" />
    <div class="row q-mt-xs q-col-gutter-md items-stretch">
      <div
        class="col-xs-12 col-sm-6"
      >
        <SettingsCard />
      </div>
      <div
        class="col-xs-12 col-sm-6"
      >
        <MeasuresCard />
      </div>
    </div>
    <ValidationGraphCard
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
// imports
import ProfileCard from 'components/calculators/trajectory-validation/ProfileCard.vue'
import SettingsCard from 'components/calculators/trajectory-validation/SettingsCard.vue'
import ValidationGraphCard from 'components/calculators/trajectory-validation/ValidationGraphCard.vue'
import MeasuresCard from 'components/calculators/trajectory-validation/MeasuresCard.vue'

</script>
