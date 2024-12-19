<template>
  <div class="row justify-between">
    <div class="col-auto">
      <q-btn
        to="/profiles"
        flat
        icon="arrow_back"
      />
    </div>
    <div class="col-auto self-center self-end">
      <OptionsButton v-model="profile" />
    </div>
  </div>
  <ProfileForm
    :profile="profile"
    class="q-mt-md"
    @submit="addProfile"
  />
</template>

<script setup>
// imports
import ProfileForm from 'components/profiles/form/ProfileForm.vue'
import OptionsButton from 'components/profiles/form/OptionsButton.vue'
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
