<template>
  <q-input
    label="Search"
    filled
  >
    <template #append>
      <q-icon name="search" />
    </template>
  </q-input>
  <AmmunitionItem />
  <AmmunitionItem />
  <AmmunitionItem />
  <AmmunitionItem />
  <AmmunitionItem />
  <AmmunitionItem />
  <AmmunitionItem />
  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]"
  >
    <q-btn
      to="/profilesv2/ammunition/add"
      fab
      icon="add"
      color="primary"
      class="mobile-only"
    />
  </q-page-sticky>
</template>
<script setup>
import AmmunitionItem from './AmmunitionItem.vue'

</script>
