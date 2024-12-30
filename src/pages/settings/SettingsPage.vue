<template>
  <PageHeader />
  <q-page class="q-pl-md q-pr-md">
    <GeneralCard />
    <NavCard
      label="About"
      class="q-mt-md"
      to="/settings/about"
      icon="info"
    />
    <NavCard
      label="Privacy policy"
      class="q-mt-md"
      to="/settings/privacy-policy"
      icon="privacy_tip"
    />
  </q-page>
</template>

<script setup>
import GeneralCard from 'components/settings/GeneralCard.vue'
import NavCard from 'components/NavCard.vue'
import PageHeader from 'components/layout/PageHeader.vue'

</script>
