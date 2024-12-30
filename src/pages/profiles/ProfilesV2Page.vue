<template>
  <PageHeader />
  <q-page class="q-pl-md q-pr-md">
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
      to="nowhere"
      icon="fiber_smart_record"
    />
    <NavCard
      class="q-mt-md"
      label="Ammunition"
      to="nowhere"
      icon="align_vertical_bottom"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import NavCard from 'src/components/NavCard.vue'

</script>
