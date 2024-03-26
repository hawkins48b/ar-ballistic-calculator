<template>
  <div>
    <div class="row">
      <div class="col-auto" />
    </div>
    <div class="row">
      <profilesTable
        class="col"
        :profiles="profiles"
        :profile-actions="['edit','duplicate','remove']"
      />
    </div>
  </div>
</template>

<script setup>
// imports
import ProfilesTable from 'components/profiles/list/ProfilesTable.vue'
import { useProfilesStore } from 'stores/profiles'
import { storeToRefs } from 'pinia'

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)

</script>
