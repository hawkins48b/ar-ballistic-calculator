<template>
  <q-page padding>
    <ProfileSelectorCard />
    <div class="row q-mt-xs q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-lg-4">
        <ConditionsCard />
      </div>
      <div class="col-xs-12 col-sm">
        <ResultsCard />
      </div>
    </div>
  </q-page>
</template>

<script setup>
// import
import ProfileSelectorCard from 'components/scope-view/ProfileSelectorCard.vue'
import ConditionsCard from 'src/components/scope-view/ConditionsCard.vue'
import ResultsCard from 'src/components/scope-view/ResultsCard.vue'
</script>
