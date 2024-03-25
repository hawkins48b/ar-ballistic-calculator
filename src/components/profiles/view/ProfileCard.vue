<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
  >
    <div class="row justify-end">
      <div class="col-auto">
        <q-btn
          color="grey-7"
          round
          flat
          icon="more_vert"
        >
          <q-menu
            auto-close
            cover
          >
            <q-list>
              <q-item
                clickable
                :to="`profiles/edit/${profile.id}`"
              >
                <q-item-section
                  avatar
                  side
                >
                  <q-icon
                    name="edit"
                  />
                </q-item-section>
                <q-item-section>Edit</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section
                  avatar
                  side
                >
                  <q-icon
                    name="content_copy"
                  />
                </q-item-section>
                <q-item-section @click="duplicate">
                  Duplicate
                </q-item-section>
              </q-item>
              <q-item
                clickable
              >
                <q-item-section
                  avatar
                  side
                >
                  <q-icon
                    color="red"
                    name="delete"
                  />
                </q-item-section>
                <q-item-section
                  class="text-red"
                  @click="removeProfile"
                >
                  Delete
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
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
    </div>
  </q-card>
</template>

<script setup>
// imports
import { useProfilesStore } from 'stores/profiles'
import { defineProps } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// props
const {
  profile,
  id
} = defineProps({
  profile: {
    type: Object,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

// profiles store
const profilesStore = useProfilesStore()

// remove profile feature
const removeProfile = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to remove this profile ?',
    cancel: true
  }).onOk(() => {
    profilesStore.removeProfile(id)
  })
}

// duplicate profile feature
const duplicate = () => {
  profilesStore.duplicateProfile(id)
}

</script>
