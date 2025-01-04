<template>
  <div>
    <q-btn
      to="/profiles/add"
      color="primary"
      icon="add"
      class="desktop-only"
    >
      Add
    </q-btn>
    <profilesTable
      :profile-actions="['edit','duplicate','remove']"
      class="q-mt-md gt-md"
    />
    <profilesTableGrid
      :profile-actions="['edit','duplicate','remove']"
      class="lt-lg"
    />
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        to="/profiles/add"
        fab
        icon="add"
        color="primary"
        class="mobile-only"
      />
    </q-page-sticky>
  </div>
</template>

<script setup>
// imports
import ProfilesTable from 'components/profiles/list/ProfilesTable.vue'
import profilesTableGrid from 'components/profiles/list/ProfilesTableGrid.vue'

</script>
