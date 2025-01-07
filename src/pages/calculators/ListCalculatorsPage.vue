<template>
  <q-page class="q-pa-md">
    <PageHeader />
    <NavCard
      label="Ballistic calculator"
      :to="{ name: 'ballistic-calculator' }"
    />
  </q-page>
</template>

<script setup>
import NavCard from 'src/components/NavCard.vue'
import PageHeader from 'src/components/layout/PageHeader.vue'

</script>
