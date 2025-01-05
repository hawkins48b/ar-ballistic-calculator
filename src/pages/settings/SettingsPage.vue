<template>
  <q-page class="q-pa-md">
    <PageHeader />
    <GeneralCard />
    <ProfilesCard class="q-mt-md" />
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
import ProfilesCard from 'components/settings/ProfilesCard.vue'
import NavCard from 'components/NavCard.vue'
import PageHeader from 'components/layout/PageHeader.vue'

</script>
