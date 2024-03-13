<template>
  <q-page padding>
    <!-- content -->
    <div class=" q-ma-md">
      <p class="text-h4">
        Profiles
      </p>
      <div class="row">
        <div class="col-xs-12 col-sm-4">
          <q-card
            class="q-pa-md"
            flat
            :class="{'bg-grey-3':!$q.dark.isActive}"
          >
            <p>Manage your bullet profiles.</p>
            <q-btn
              icon="add"
              class="q-mt-sm"
              color="primary"
              @click="newProfileDialog=true"
            >
              Add new profile
            </q-btn>
          </q-card>
        </div>
      </div>
    </div>

    <div class="row">
      <div
        v-for="(profile, index) in profilesArray"
        :key="index"
        class="col-xs-12 col-sm-4 col-md-3 q-pa-md"
      >
        <q-card

          class=""
          padding
          :class="{'bg-grey-3':!$q.dark.isActive}"
          flat
        >
          <q-card-section>
            <div class="text-h6">
              {{ profile.rifleName }}
            </div>
            <div>
              {{ profile.rifleOptic }}
            </div>
            <div>{{ profile.rifleOpticHeight }} {{ profile.rifleOpticHeightUnit }} height over bore</div>
          </q-card-section>
          <q-card-section>
            <p class="text-bold">
              {{ profile.bulletName }}
            </p>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-icon
                    name="scale"
                    size="md"
                  />
                </q-item-section>
                <q-item-section class="text-bold">
                  {{ profile.bulletWeight }} {{ profile.bulletWeightUnit }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-icon
                    name="speed"
                    size="md"
                  />
                </q-item-section>
                <q-item-section class="text-bold">
                  {{ profile.bulletVelocity }} {{ profile.bulletVelocityUnit }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-icon
                    name="moving"
                    size="md"
                  />
                </q-item-section>
                <q-item-section class="text-bold">
                  {{ profile.bulletBallisticCoefficient }} {{ profile.bulletBallisticCoefficientProfile }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions
            vertical
          >
            <q-btn
              outline
              @click="removeProfile(index)"
            >
              Remove
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog
      v-model="newProfileDialog"
      medium-width
    >
      <q-card
        style="width: 700px; max-width: 80vw;"
        flat
      >
        <q-form
          @submit="addNewProfile"
        >
          <q-card-section
            class="row items-center q-pb-none"
          >
            <div class="text-h6">
              Add new profile
            </div>
            <q-space />
            <q-btn
              v-close-popup
              icon="close"
              flat
              round
              dense
            />
          </q-card-section>

          <q-card-section class="q-pt-none">
            Enter your bullet and rifle data.
            <q-input
              v-model="newProfile.rifleName"
              label="Weapon"
              filled
              type="text"
              class="q-mt-md"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please name your weapon']"
            />
            <q-input
              v-model="newProfile.rifleOptic"
              label="Optic"
              filled
              type="text"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please name your optic']"
              class="q-mt-md"
            />
            <q-input
              v-model="newProfile.rifleOpticHeight"
              label="Optic height"
              filled
              type="number"
              step="any"
              lazy-rules
              :rules="[ val => val && val > 0 || 'Optic height must be positive']"
              class="q-mt-md"
            >
              <template #append>
                <q-btn-toggle
                  v-model="newProfile.rifleOpticHeightUnit"
                  no-caps
                  :options="[
                    {label: 'inch', value: 'inch'},
                    {label: 'cm', value: 'cm'}
                  ]"
                />
              </template>
            </q-input>

            <q-separator
              class="q-mt-md"
            />

            <q-input
              v-model="newProfile.bulletName"
              label="Bullet name"
              filled
              type="text"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please name your ammo']"
              class="q-mt-md"
            />

            <q-input
              v-model="newProfile.bulletWeight"
              label="Bullet weight"
              filled
              step="any"
              type="number"
              lazy-rules
              :rules="[ val => val && val > 0 || 'Bullet weight must be positive']"
              class="q-mt-md"
            >
              <template #append>
                <q-btn-toggle
                  v-model="newProfile.bulletWeightUnit"
                  no-caps
                  :options="[
                    {label: 'grain', value: 'grain'},
                    {label: 'gram', value: 'gram'}
                  ]"
                />
              </template>
            </q-input>
            <q-input
              v-model="newProfile.bulletVelocity"
              label="Velocity"
              filled
              step="any"
              type="number"
              lazy-rules
              :rules="[ val => val && val > 0 || 'Velocity must be positive']"
              class="q-mt-md"
            >
              <template #append>
                <q-btn-toggle
                  v-model="newProfile.bulletWeightUnit"
                  no-caps
                  :options="[
                    {label: 'grain', value: 'grain'},
                    {label: 'gram', value: 'gram'}
                  ]"
                />
              </template>
            </q-input>
            <q-input
              v-model="newProfile.bulletBallisticCoefficient"
              label="Ballistic coefficient"
              filled
              step="any"
              type="number"
              lazy-rules
              :rules="[ val => val && val > 0 || 'Ballistic coefficient must be positive']"
              class="q-mt-md"
            >
              <template #append>
                <q-btn-toggle
                  v-model="newProfile.bulletBallisticCoefficientProfile"
                  no-caps
                  :options="[
                    {label: 'G1', value: 'G1'},
                    {label: 'G7', value: 'G7'}
                  ]"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions
            align="right"
          >
            <q-btn
              flat
              label="Add"
              color="primary"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  // name: 'PageName',
  data: function () {
    return {
      newProfileDialog: false,
      newProfile: this.blankProfile(),
      profilesArray: []
    }
  },
  mounted () {
    this.profilesArray = JSON.parse(LocalStorage.getItem('profiles')) || []
  },
  methods: {
    blankProfile () {
      return {
        rifleName: '',
        rifleOptic: '',
        rifleOpticHeight: 0.0,
        rifleOpticHeightUnit: 'inch',
        bulletName: '',
        bulletWeight: 0,
        bulletWeightUnit: 'grain',
        bulletVelocity: 0.0,
        bulletVelocityUnit: 'FPS',
        bulletBallisticCoefficient: 0,
        bulletBallisticCoefficientProfile: 'G1'
      }
    },
    addNewProfile () {
      // push the new item into the profiles array
      this.profilesArray.push(this.newProfile)

      // persist data
      this.persistProfiles()

      // reset the form
      this.newProfile = this.blankProfile()

      // close window
      this.newProfileDialog = false
    },
    removeProfile (index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to remove this profile ?',
        cancel: true
      }).onOk(() => {
        // remove profile from profilesArray
        this.profilesArray.splice(index, 1)
        // persist data
        this.persistProfiles()
      })
    },
    persistProfiles () {
      LocalStorage.set('profiles', JSON.stringify(this.profilesArray))
    }
  }

}
</script>
