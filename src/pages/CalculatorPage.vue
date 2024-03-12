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
            v-model="profileIndex"
            filled
            :options="profileOptions"
          />
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 q-pa-md">
        <q-card
          flat
          class="q-pa-md"
          :class="{'bg-grey-3':!$q.dark.isActive}"
        >
          <p class="text-h4">
            Maximum point blank range
          </p>
          <p>Find your ideal zeroing distance based on MBPR</p>
          <q-btn
            filled
            color="primary"
          >
            Calculate maximum point blank Range
          </q-btn>
        </q-card>
      </div>
    </div>

    <div class="q-ma-md" />
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  // name: 'PageName',

  data: function () {
    return {
      profileIndex: null,
      persistedProfiles: [],
      profileOptions: []
    }
  },
  mounted () {
    // load persisted data
    this.persistedProfiles = JSON.parse(LocalStorage.getItem('profiles')) || []
    // build proper option list
    this.profileOptions = []
    this.persistedProfiles.forEach((item, index) => {
      this.profileOptions.push({
        label: item.rifleName + ' ' + item.rifleOptic + ' ' + item.bulletName + ' ' + item.bulletWeight + ' ' + item.bulletWeightUnit,
        value: index
      })
    })
  }
}
</script>
