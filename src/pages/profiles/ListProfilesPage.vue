<template>
  <div>
    <q-btn
      to="/profiles/add"
      color="primary"
      icon="add"
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
  </div>
</template>

<script setup>
// imports
import ProfilesTable from 'components/profiles/list/ProfilesTable.vue'
import profilesTableGrid from 'components/profiles/list/ProfilesTableGrid.vue'

</script>
