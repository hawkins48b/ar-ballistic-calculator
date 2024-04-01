<template>
  <div>
    <div class="row">
      <div class="col-auto">
        <q-btn
          flat
          to="/calculator"
          icon="arrow_back"
        />
      </div>
      <div class="col-auto text-h6 q-pl-md">
        Maximum Point Blank Range
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
      <div
        class="col-xs-12 col-sm-6"
      >
        <MpbrCard />
      </div>
    </div>
    <MpbrGraphCard
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
// imports
import ProfileCard from 'components/calculator/mpbr/ProfileCard.vue'
import TargetCard from 'components/calculator/mpbr/TargetCard.vue'
import MpbrCard from 'components/calculator/mpbr/MpbrCard.vue'
import MpbrGraphCard from 'components/calculator/mpbr/MpbrGraphCard.vue'

</script>
