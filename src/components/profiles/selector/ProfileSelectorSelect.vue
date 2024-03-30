<template>
  <q-select
    v-model="selected"
    :options="options"
    option-value="id"
    :option-label="(row) => profilesStore.profileLabel(row.id)"
    filled
    label="Select a profile"
  />
</template>

<script setup>
// imports
import { useProfilesStore } from 'stores/profiles'
import { useBallisticStore } from 'stores/ballistic'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)
const options = ref(profiles.value)

// set calculation profile
const ballisticStore = useBallisticStore()
const { profileId } = storeToRefs(ballisticStore)

// selection
const selected = ref()
// set value if found in ballistic store
watch(profileId, (newValue) => {
  selected.value = profilesStore.profilebyId(profileId.value)
}, {
  immediate: true
})
// update ballistic store when selected is updated
watch(selected, (newValue) => {
  if (newValue) {
    ballisticStore.profileId = newValue.id
  } else {
    ballisticStore.profileId = null
  }
})

</script>
