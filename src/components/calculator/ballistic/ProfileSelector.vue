<template>
  <q-form>
    <q-select
      v-model="profileOption"
      label="Select a profile"
      :options="profileOptions"
      use-input
      input-debounce="0"
      hint="You can type for retrieving information"
      @filter="filterFn"
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
import { useCalculatorStore } from 'stores/calculator'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)

// build option list
const profileOption = ref()
const profileOptions = ref([])

profiles.value.forEach(profile => {
  profileOptions.value.push({
    label: profilesStore.profileLabel(profile.id),
    value: profile.id
  })
})

// set calculation profile
const calculatorStore = useCalculatorStore()

// set selected option by default
if (calculatorStore.profileId) {
  profileOption.value = profileOptions.value.find(profile => profile.value === calculatorStore.profileId)
}

// update calculator profile if option changes
watch(profileOption, (newProfileOption) => {
  if (newProfileOption) {
    calculatorStore.profileId = newProfileOption.value
  }
})

// autocomplete functions
const filterFn = (val, update) => {
  const options = ref(profileOption)
  if (val === '') {
    update(() => {
      options.value = profileOption

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = profileOption.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

</script>
