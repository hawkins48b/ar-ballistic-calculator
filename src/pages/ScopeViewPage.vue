<template>
  <q-page padding>
    <ProfileSelectorCard />
    <div class="row q-mt-xs q-gutter-md">
      <div class="col-4">
        <ConditionsCard />
      </div>
      <div class="col-4">
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
