<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div v-if="profiles.length > 0">
      <p class="text-h6">
        Select a profile
      </p>
      <div class="row">
        <div class="col">
          <q-select
            v-model="profileOption"
            label="Profile"
            :options="profileOptions"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-h6">
        You have no profile
      </p>
      <p>Please insert a profile before using the calculators.</p>
      <q-btn
        to="profiles/"
        class="q-mt-md"
        color="primary"
      >
        Add a profile
      </q-btn>
    </div>
  </q-card>
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

</script>
