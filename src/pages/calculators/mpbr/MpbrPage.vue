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
    </div>
    <!-- Profiles -->
    <ProfileCard class="q-mt-sm" />
    <div class="row q-mt-xs q-col-gutter-md items-stretch">
      <div
        class="col-xs-12 col-sm-6"
      >
        <TargetCard />
      </div>
    </div>
    <MpbrGraphCard
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
// imports
import ProfileCard from 'components/calculators/mpbr/ProfileCard.vue'
import TargetCard from 'components/calculators/mpbr/TargetCard.vue'
import MpbrGraphCard from 'components/calculators/mpbr/MpbrGraphCard.vue'

</script>
