<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class=""
  >
    <div class="row">
      <div class="col">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                RIFLE
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.rifle }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                OPTIC
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.optic }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                OPTIC HEIGHT
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.opticHeight }} {{ profile.opticHeightUnit }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                AMMO
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.bulletName }} {{ profile.bulletDiameter }} {{ profile.bulletDiameterUnit }} {{ profile.bulletWeight }} {{ profile.bulletWeightUnit }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                VELOCITY
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.bulletVelocity }} {{ profile.bulletVelocityUnit }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                BALLISTIC COEFFICIENT
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.bulletBallisticCoefficient }} {{ profile.bulletBallisticCoefficientProfile }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <q-btn
      outline
      class="q-ma-md"
      @click="removeProfile(index)"
    >
      Remove
    </q-btn>
  </q-card>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  props: {
    profile: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeProfile (index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to remove this profile ?',
        cancel: true
      }).onOk(() => {
        // get the list from LocalStorage
        const profiles = JSON.parse(LocalStorage.getItem('profiles'))

        // remove profile from profiles
        profiles.splice(index, 1)

        // persist data
        LocalStorage.set('profiles', JSON.stringify(profiles))
      })
    }
  }
}
</script>
