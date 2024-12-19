<template>
  <div>
    <div class="row justify-between">
      <q-btn
        to="/profiles"
        flat
        icon="arrow_back"
        class="col-auto"
      />
      <div class="col-auto self-center self-end">
        <OptionsButton v-model="profile" />
      </div>
    </div>
    <!-- content -->
    <ProfileForm
      :profile="profile"
      submit-text="Edit"
      submit-icon="edit"
      class="q-mt-md"
      @submit="editProfile"
    />
  </div>
</template>

<script setup>
// imports
import ProfileForm from 'components/profiles/form/ProfileForm.vue'
import OptionsButton from 'components/profiles/form/OptionsButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { useProfilesStore } from 'stores/profiles'
import { reactive } from 'vue'

// Define router instance
const router = useRouter()

// profileIndex to be edited
const route = useRoute()
const profileId = Number(route.params.profileId)

// store instance
const profilesStore = useProfilesStore()

// profile to be edited
const profile = reactive(profilesStore.profilebyId(profileId))

const editProfile = () => {
  // save profile
  profilesStore.updateProfile(profile)
  // go back to profile list
  router.push('/profiles')
}
</script>
