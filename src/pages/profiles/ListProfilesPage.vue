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
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
// imports
import ProfilesTable from 'components/profiles/list/ProfilesTable.vue'

</script>
