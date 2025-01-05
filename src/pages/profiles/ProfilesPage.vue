<template>
  <q-page class="q-pa-md">
    <PageHeader />
    <NavCard
      label="Setups"
      to="/profiles/setups"
      icon="category"
    />
    <NavCard
      class="q-mt-md"
      label="Firearms"
      to="/profiles/firearms"
      icon="start"
    />
    <NavCard
      class="q-mt-md"
      label="Optics"
      to="/profiles/optics"
      icon="fiber_smart_record"
    />
    <NavCard
      class="q-mt-md"
      label="Ammunitions"
      to="/profiles/ammunitions"
      icon="align_vertical_bottom"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import NavCard from 'src/components/NavCard.vue'

</script>
