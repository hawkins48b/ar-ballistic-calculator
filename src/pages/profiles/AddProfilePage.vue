<template>
  <q-page>
    <!-- content -->
    <div class="row justify-start">
      <div class="q-pl-sm">
        <q-btn
          to="/profiles"
          outline
        >
          Back
        </q-btn>
      </div>
      <div class="text-h6 q-pl-md">
        Add new profile
      </div>
    </div>
    <q-form @submit="addNewProfile">
      <div class="row q-mt-md">
        <div class="col-xs-12 col-md-4 q-pa-sm">
          <RifleCard
            ref="rifle"
            :profile="profile"
          />
          <OpticCard
            :profile="profile"
            class="q-mt-md"
          />
        </div>
        <div class="col-xs-12 col-md-4 q-pa-sm">
          <BulletCard :profile="profile" />
        </div>
      </div>
      <div class="row">
        <div class="q-pl-sm q-mt-md">
          <q-btn
            color="primary"
            icon="add"
            type="submit"
          >
            Add
          </q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import RifleCard from 'components/profiles/add/RifleCard.vue'
import OpticCard from 'components/profiles/add/OpticCard.vue'
import BulletCard from 'components/profiles/add/BulletCard.vue'
import { LocalStorage } from 'quasar'

export default {
  components: {
    RifleCard,
    OpticCard,
    BulletCard
  },
  data: function () {
    return {
      profile: this.newProfile()
    }
  },
  mounted () {

  },
  methods: {
    newProfile () {
      return {
        rifle: '',
        optic: '',
        opticHeight: 0.0,
        opticHeightUnit: 'IN',
        bulletName: '',
        bulletDiameter: 0,
        bulletDiameterUnit: 'IN',
        bulletWeight: 0,
        bulletWeightUnit: 'GR',
        bulletVelocity: 0.0,
        bulletVelocityUnit: 'FPS',
        bulletBallisticCoefficient: 0,
        bulletBallisticCoefficientProfile: 'G1'
      }
    },
    addNewProfile () {
      // persist data
      this.persistProfiles()

      // back to profiles
      this.$router.push('/profiles')
    },
    /*
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
    */
    persistProfiles () {
      // get profiles
      const profiles = JSON.parse(LocalStorage.getItem('profiles')) || []
      // add profiles to the list
      profiles.push(this.profile)
      // persists profiles
      LocalStorage.set('profiles', JSON.stringify(profiles))
    }
  }
}
</script>
