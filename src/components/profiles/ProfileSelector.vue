<template>
  <q-form>
    <q-select
      v-model="profileId"
      label="Select a profile"
      :options="profiles"
      :option-label="optionLabel"
      option-value="id"
      emit-value
      map-options
      use-input
      :filter="filter"
      input-debounce="0"
      hint="You can type for filtering profiles"
    >
      <template #no-option>
        <q-item>
          <q-item-section>
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </q-form>
</template>

<script setup>
// imports
import { useProfilesStore } from 'stores/profiles'
import { useBallisticStore } from 'stores/ballistic'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)

// set calculation profile
const ballisticStore = useBallisticStore()
const { profileId } = storeToRefs(ballisticStore)

// option label
const optionLabel = (item) => {
  let label = null
  if (item !== null) {
    label = profilesStore.profileLabel(item.id)
  }
  return label
}

// filter fn
const optionsResult = ref(profiles)
const filter = (val, update, abort) => {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    optionsResult.value = profiles.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

</script>
