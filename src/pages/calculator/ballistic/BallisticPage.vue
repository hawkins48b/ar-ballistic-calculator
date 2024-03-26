<template>
  <div>
    <div class="row justify-between">
      <div class="col-auto">
        <div class="row">
          <div class="col-auto">
            <q-btn
              to="/calculator"
              outline
            >
              Back
            </q-btn>
          </div>
          <div class="col-auto text-h6 q-pl-md">
            Results
          </div>
        </div>
      </div>

      <div class="col-auto q-pr-md">
        <q-btn-dropdown
          color="primary"
          label="Options"
        >
          <q-list>
            <q-item
              v-close-popup
              clickable
            >
              <q-item-section>
                <q-toggle />
              </q-item-section>
              <q-item-section>
                <q-item-label>Multiple trajectories</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
            >
              <q-item-section>
                <q-item-label>Videos</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
            >
              <q-item-section>
                <q-item-label>Articles</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <!-- Profiles -->
    <div class="row q-mt-md">
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm">
        <ProfileCard
          :profile="profile"
          :actions="['edit']"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm">
        <RangeCard
          :range="range"
          :zero="zero"
        />
      </div>
    </div>
    <!-- chart -->
    <div class="row" />
    <!-- table -->
    <div class="row" />
  </div>
</template>

<script setup>
// imports
import ProfileCard from 'components/profiles/view/ProfileCard.vue'
import RangeCard from 'components/calculator/ballistic/RangeCard.vue'

import { storeToRefs } from 'pinia'
import { useCalculatorStore } from 'stores/calculator'
import { useProfilesStore } from 'stores/profiles'
import { reactive } from 'vue'
const calculatorStore1 = useCalculatorStore()
const profilesStore = useProfilesStore()

// calculator store properties
const { profileId, range, zero } = storeToRefs(calculatorStore1)

// profiles store property
const profile = reactive(profilesStore.profilebyId(profileId.value))

</script>
