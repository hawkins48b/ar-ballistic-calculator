<template>
  <q-page padding>
    <!-- content -->
    <div class="text-h3 q-mb-md">
      Calculator
    </div>
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
    <div v-if="profileOptions.length > 0">
      <div
        class="row"
      >
        <div class="col-xs-12 col-sm-4 q-pa-sm">
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
      </div>
      <div class="row q-mt-md">
        <div class="col-xs-12 col-sm-4 q-pa-sm">
          <BallisticCalculatorCard
            flat
            class="q-pa-md"
            :class="{'bg-grey-3':!$q.dark.isActive}"
            :profile="profile"
          />
        </div>
        <div class="col-xs-12 col-sm-4 q-pa-sm">
          <MaximumPointBlankRangeCard
            flat
            class="q-pa-md"
            :class="{'bg-grey-3':!$q.dark.isActive}"
            :profile="profile"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
import MaximumPointBlankRangeCard from 'components/calculator/MaximumPointBlankRangeCard.vue'
import BallisticCalculatorCard from 'components/calculator/BallisticCalculatorCard.vue'

export default {
  // name: 'PageName',

  components: {
    MaximumPointBlankRangeCard,
    BallisticCalculatorCard
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
        label: item.rifle + ' ' + item.optic + ' ' + item.bulletName + ' ' + item.bulletDiameter + ' ' + item.bulletDiameterUnit + ' ' + item.bulletWeight + ' ' + item.bulletWeightUnit,
        value: item
      })
    })
  }
}
</script>
