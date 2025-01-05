<template>
  <q-page class="q-pa-md">
    <PageHeader />
    <NavCard
      label="Setups"
      to="/profiles/setups"
      icon="svguse:icons.svg#setup"
    />
    <NavCard
      class="q-mt-md"
      label="Firearms"
      to="/profiles/firearms"
      icon="svguse:icons.svg#sniper-rifle"
    />
    <NavCard
      class="q-mt-md"
      label="Optics"
      to="/profiles/optics"
      icon="svguse:icons.svg#scope-reticle"
    />
    <NavCard
      class="q-mt-md"
      label="Ammunitions"
      to="/profiles/ammunitions"
      icon="svguse:icons.svg#ammunition"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import NavCard from 'src/components/NavCard.vue'

</script>
