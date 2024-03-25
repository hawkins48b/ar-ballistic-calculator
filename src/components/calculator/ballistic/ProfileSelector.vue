<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <p class="text-h6">
      Select a profile
    </p>
    <div class="row">
      <div class="col">
        <q-select
          v-model="profileId"
          label="Profile"
          :options="profileOptions"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
// imports
import { useProfilesStore } from 'stores/profiles'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)

// build option list
const profileId = ref()
const profileOptions = ref([])

profiles.value.forEach(profile => {
  profileOptions.value.push({
    label: profilesStore.profileLabel(profile.id),
    value: profile.id
  })
})

</script>
