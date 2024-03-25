<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-4 q-pa-sm">
        <q-card
          flat
          class="q-pa-md"
          :class="{'bg-grey-3':!$q.dark.isActive}"
        >
          <p>Manage your bullet profiles.</p>
          <q-btn
            icon="add"
            class="q-mt-sm"
            color="primary"
            to="/profiles/add"
          >
            Add new profile
          </q-btn>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(profile, index) in profiles"
        :key="index"
        class="col-xs-12 col-md-4 q-pa-sm"
      >
        <ProfileCard
          :profile="profile"
          :index="index"
          removable
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import ProfileCard from 'components/profiles/view/ProfileCard.vue'
import { useProfilesStore } from 'stores/profiles'
import { storeToRefs } from 'pinia'

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)

</script>
