<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
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
                {{ profile.weapon.name }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                OPTIC
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.optic.model }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                OPTIC HEIGHT
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.optic.height }} {{ profile.optic.heightUnit }}
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
                {{ profile.bullet.brand }} {{ profile.bullet.diameter }} {{ profile.bullet.diameterUnit }} {{ profile.bullet.weight }} {{ profile.bullet.weightUnit }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                VELOCITY
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.bullet.velocity }} {{ profile.bullet.velocityUnit }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                BALLISTIC COEFFICIENT
              </q-item-label>
              <q-item-label class="text-bold">
                {{ profile.bullet.ballisticCoefficient }} {{ profile.bullet.ballisticCoefficientProfile }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-auto">
        <ProfileEditButton
          :profile="profile"
          :actions="actions"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
// imports
import ProfileEditButton from 'components/profiles/view/ProfileEditButton.vue'
import { defineProps } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// props
const {
  profile,
  actions
} = defineProps({
  profile: {
    type: Object,
    required: true
  },
  actions: {
    type: Array,
    required: false,
    default: () => []
  }
})

</script>
