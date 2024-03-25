<template>
  <div class="row justify-start">
    <div class="q-pl-sm">
      <q-btn
        to="/profiles"
        outline
      >
        Back
      </q-btn>
    </div>
    <div class="text-h6 q-pl-md">
      Add new profile
    </div>
  </div>
  <ProfileForm
    :profile="profile"
    submit-text="Add"
    @submit="addProfile"
  />
</template>

<script setup>
// imports
import ProfileForm from 'components/profiles/ProfileForm.vue'
import { useProfilesStore } from 'stores/profiles'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import profileModel from 'src/models/profiles'

// Define router instance
const router = useRouter()

// store instance
const profilesStore = useProfilesStore()

// init profile
const profile = reactive(profileModel())

// add profile
const addProfile = (newProfile) => {
  profilesStore.addProfile(newProfile)
  // go back to profile list
  router.push('/profiles')
}
</script>
