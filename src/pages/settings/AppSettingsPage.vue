<template>
  <div>
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
  </div>
</template>

<script setup>
import GeneralCard from 'components/settings/GeneralCard.vue'
import NavCard from 'components/NavCard.vue'

</script>
