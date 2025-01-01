<template>
  <PageHeader />
  <q-page class="q-pa-md">
    <NavCard
      label="Profiles"
      to="nowhere"
      icon="list"
    />
    <NavCard
      class="q-mt-md"
      label="Firearms"
      to="nowhere"
      icon="start"
    />
    <NavCard
      class="q-mt-md"
      label="Optics"
      to="/profilesv2/optics"
      icon="fiber_smart_record"
    />
    <NavCard
      class="q-mt-md"
      label="Ammunition"
      to="/profilesv2/ammunition"
      icon="align_vertical_bottom"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import NavCard from 'src/components/NavCard.vue'

</script>
