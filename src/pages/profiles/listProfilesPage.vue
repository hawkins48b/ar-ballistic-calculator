<template>
  <div>
    <div class="row">
      <div class="col-auto" />
    </div>
    <div class="row">
      <profilesTable
        :profile-actions="['edit','duplicate','remove']"
        class="col"
      />
    </div>
  </div>
</template>

<script setup>
// imports
import ProfilesTable from 'components/profiles/list/ProfilesTable.vue'

</script>
