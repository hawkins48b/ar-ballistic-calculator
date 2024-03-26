<template>
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
    <template #top-left>
      <q-btn
        icon="add"
        class="q-mt-sm"
        color="primary"
        to="/profiles/add"
        style="top:-15px"
      >
        Add
      </q-btn>
    </template>
    <template #top-right>
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
    </template>

    <template #item="props">
      <div
        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 grid-style-transition"
        :style="props.selected ? 'transform: scale(0.95);' : ''"
      >
        <q-card
          flat
          :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''"
        >
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
                      OPTIC HEIGHT
                    </q-item-label>
                    <q-item-label class="text-bold">
                      {{ props.row.optic.height }} {{ props.row.optic.heightUnit }}
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
                      {{ props.row.bullet.velocity }} {{ props.row.bullet.velocityUnit }}
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
                :profile="props.row"
                :actions="profileActions"
              />
            </div>
          </div>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script setup>
// imports
import ProfileEditButton from 'components/profiles/ProfileEditButton.vue'
import { ref, onMounted } from 'vue'

// props
const {
  profiles,
  selection,
  selected,
  profileActions
} =
defineProps({
  profiles: {
    type: Array,
    required: false,
    default: () => []
  },
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

// columns
const columns = [
  { name: 'id', label: 'Insertion', field: row => row.id, sortable: true },
  { name: 'weapon', label: 'Weapon', field: row => row.weapon.name, sortable: true },
  { name: 'caliber', label: 'Caliber', field: row => row.bullet.diameter, sortable: true },
  { name: 'optic', label: 'Optic', field: row => row.optic.model, sortable: true }
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
