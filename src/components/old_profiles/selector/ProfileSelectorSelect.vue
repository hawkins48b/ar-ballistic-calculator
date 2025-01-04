<template>
  <q-select
    v-model="selected"
    :options="options"
    option-value="id"
    :option-label="(row) => profilesStore.profileLabel(row.id)"
    filled
    label="Select a profile"
    :bg-color="!profileId ? 'primary' : ''"
    :label-color="!profileId ? 'white' : ''"
    :color="!profileId ? 'white' : ''"
  >
    <template #append>
      <q-btn
        v-if="profileId"
        round
        dense
        flat
        icon="edit"
        :to="`/profiles/edit/${profileId}`"
      />
    </template>
  </q-select>
</template>

<script setup>
// imports
import { useProfilesStore } from 'stores/profiles'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

// eslint-disable-next-line vue/require-prop-types
const profileId = defineModel()

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)
const options = ref(profiles.value)

// selection
const selected = ref()
// set value if provided by v-model
watch(profileId, () => {
  selected.value = profilesStore.profilebyId(profileId.value)
}, {
  immediate: true
})
// update v-model when selected is updated
watch(selected, (newValue) => {
  if (newValue) {
    profileId.value = newValue.id
  } else {
    profileId.value = null
  }
})

</script>
