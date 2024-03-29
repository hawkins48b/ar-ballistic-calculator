<template>
  <div>
    <div class="row">
      <div class="col-auto q-pa-sm">
        <q-btn
          to="/profiles"
          flat
          icon="arrow_back"
        />
      </div>
      <div class="col-auto q-pa-sm text-h6">
        Edit Profile
      </div>
    </div>
    <!-- content -->
    <ProfileForm
      :profile="profile"
      submit-text="Edit"
      submit-icon="edit"
      @submit="editProfile"
    />
  </div>
</template>

<script setup>
// imports
import ProfileForm from 'components/profiles/form/ProfileForm.vue'
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
