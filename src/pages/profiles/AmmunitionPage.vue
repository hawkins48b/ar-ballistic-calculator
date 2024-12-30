<template>
  <PageHeader back-to="/profilesv2">
    <q-btn
      icon="add"
      class="desktop-only"
      color="primary"
    >
      Add
    </q-btn>
  </PageHeader>
  <q-page class="q-pa-md">
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
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import AmmunitionItem from 'components/profiles/ammunition/AmmunitionItem.vue'

</script>
