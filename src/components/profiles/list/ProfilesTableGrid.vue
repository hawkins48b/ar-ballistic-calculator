<template>
  <div>
    <div class="row items-center">
      <div class="col">
        <exportBtn />
      </div>
      <q-space />
      <div class="col">
        <q-input
          v-model="filter"
          borderless
          filled
          debounce="300"
          placeholder="Search"
          hint="Rifle, caliber or optic"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <q-table
      ref="qtable"
      v-model:selected="localSelected"
      :rows="profiles"
      :columns="columns"
      :row-key="row => row.id"
      :selection="selection"
      :filter="filter"
      grid
      grid-header
      :rows-per-page-options="[0]"
    >
      <template #item="props">
        <div
          class="q-pa-sm col-xs-12 col-sm-6 col-lg-4 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <zroCard>
            <q-card-section v-if="selection==='multiple'">
              <q-checkbox
                v-model="props.selected"
                dense
                :label="props.row.name"
              />
            </q-card-section>
            <q-separator v-if="selection==='multiple'" />
            <div class="row">
              <div class="col">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>
                        RIFLE
                      </q-item-label>
                      <q-item-label class="text-bold">
                        {{ props.row.weapon.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>
                        OPTIC
                      </q-item-label>
                      <q-item-label class="text-bold">
                        {{ props.row.optic.model }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>
                        ZERO DISTANCE
                      </q-item-label>
                      <q-item-label class="text-bold">
                        {{ props.row.optic.zero }} {{ props.row.optic.zeroUnit }}
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
                        AMMUNITION
                      </q-item-label>
                      <q-item-label class="text-bold">
                        {{ props.row.bullet.brand }} {{ props.row.bullet.diameter }} {{ props.row.bullet.diameterUnit }} {{ props.row.bullet.weight }} {{ props.row.bullet.weightUnit }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>
                        VELOCITY
                      </q-item-label>
                      <q-item-label class="text-bold">
                        {{ props.row.measures.velocity }} {{ props.row.measures.velocityUnit }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>
                        BALLISTIC COEFFICIENT
                      </q-item-label>
                      <q-item-label class="text-bold">
                        {{ props.row.bullet.ballisticCoefficient }} {{ props.row.bullet.ballisticCoefficientProfile }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div
                v-if="profileActions.length > 0"
                class="col-auto"
              >
                <ProfileEditButton
                  :profile-id="props.row.id"
                  :actions="profileActions"
                />
              </div>
            </div>
          </zroCard>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import ExportBtn from 'components/profiles/list/ExportBtn.vue'
import ProfileEditButton from 'components/profiles/ProfileEditButton.vue'
import { ref, onMounted } from 'vue'
import { useProfilesStore } from 'stores/profiles'
import { storeToRefs } from 'pinia'

// props
const {
  selection,
  selected,
  profileActions
} =
defineProps({
  selection: {
    type: String,
    required: false,
    default: 'none'
  },
  selected: {
    type: Array,
    required: false,
    default: () => []
  },
  profileActions: {
    type: Array,
    required: false,
    default: () => []
  }
})

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)

// columns
const columns = [
  {
    name: 'id',
    label: 'Insertion',
    field: row => row.id,
    sortable: true
  },
  {
    name: 'weapon',
    label: 'Weapon',
    field: row => row.weapon.name,
    sortable: true
  },
  {
    name: 'caliber',
    label: 'Caliber',
    field: row => row.bullet.diameter,
    sortable: true
  },
  {
    name: 'optic',
    label: 'Optic',
    field: row => row.optic.model,
    sortable: true
  }
]

// selected
const localSelected = ref(selected)

// filter
const filter = ref('')

// sort by insert desc
const qtable = ref(null)
onMounted(() => {
  // call twice for order DESC
  qtable.value.sort('id')
  qtable.value.sort('id')
})
</script>
