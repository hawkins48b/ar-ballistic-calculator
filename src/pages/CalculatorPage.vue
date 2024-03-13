<template>
  <q-page padding>
    <!-- content -->
    <p class="text-h4 q-ma-md">
      Calculator
    </p>
    <div
      v-if="profileOptions.length == 0"
      class="row"
    >
      <q-card

        :class="{'bg-grey-3':!$q.dark.isActive}"
        flat
        class="q-pa-md"
      >
        <p>
          Before using the calculator, you must create at least one bullet profile.
        </p>
        <q-btn

          color="primary"
          @click="$router.push('profiles')"
        >
          Add Profiles
        </q-btn>
      </q-card>
    </div>
    <div
      v-if="profileOptions.length > 0"
      class="row"
    >
      <div class="col-xs-12 col-sm-4 q-pa-md">
        <q-card
          flat
          class="q-pa-md"
          :class="{'bg-grey-3':!$q.dark.isActive}"
        >
          <p class="text-h4">
            Profile
          </p>
          <p>Select a profile</p>
          <q-select
            v-model="profileOption"
            filled
            :options="profileOptions"
          />
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 q-pa-md">
        <MaximumPointBlankRangeCard
          flat
          class="q-pa-md"
          :class="{'bg-grey-3':!$q.dark.isActive}"
          :profile="profile"
        />
      </div>
    </div>

    <div class="q-ma-md" />
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
import MaximumPointBlankRangeCard from 'components/calculator/MaximumPointBlankRangeCard.vue'

export default {
  // name: 'PageName',

  components: {
    MaximumPointBlankRangeCard
  },

  data: function () {
    return {
      persistedProfiles: [],
      profileOptions: [],
      profileOption: null,
      profile: null
    }
  },
  watch: {
    profileOption (newValue) {
      this.profile = newValue.value
    }
  },
  mounted () {
    // load persisted data
    this.persistedProfiles = JSON.parse(LocalStorage.getItem('profiles')) || []
    // build profile options list
    this.profileOptions = []
    this.persistedProfiles.forEach((item, index) => {
      this.profileOptions.push({
        label: item.rifleName + ' ' + item.rifleOptic + ' ' + item.bulletName + ' ' + item.bulletWeight + ' ' + item.bulletWeightUnit,
        value: item
      })
    })
  }
}
</script>
