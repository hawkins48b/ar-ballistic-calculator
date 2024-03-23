<template>
  <div>
    <!-- content -->
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
          @removed-profile="reloadProfiles"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from 'components/profiles/view/ProfileCard.vue'
import { LocalStorage } from 'quasar'

export default {
  components: {
    ProfileCard
  },
  data: function () {
    return {
      profiles: []
    }
  },
  mounted () {
    // get list of profiles
    this.profiles = JSON.parse(LocalStorage.getItem('profiles'))
  },
  methods: {
    reloadProfiles () {
      this.profiles = JSON.parse(LocalStorage.getItem('profiles'))
    }
  }
}
</script>
