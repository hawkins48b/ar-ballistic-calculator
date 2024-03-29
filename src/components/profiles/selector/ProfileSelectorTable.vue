<template>
  <q-table
    ref="profilesTable"
    v-model:selected="selected"
    :rows="profiles"
    :columns="columns"
    :filter="filter"
    row-key="id"
    selection="single"
    title="Profiles"
    hide-selected-banner
    :class="{'bg-grey-3':!$q.dark.isActive}"
    :dense="$q.screen.lt.lg"
    no-data-label="No profile found."
    flat
  >
    <template #top-right>
      <q-input
        v-model="filter"
        filled
        debounce="300"
        placeholder="Search"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template #body-selection="scope">
      <q-checkbox
        v-model="scope.selected"
        color="primary"
      />
    </template>
    <template #body-append="scope">
      <q-checkbox
        v-model="scope.selected"
        color="primary"
      />
    </template>
  </q-table>
</template>

<script setup>
// imports
import { useProfilesStore } from 'stores/profiles'
import { useBallisticStore } from 'stores/ballistic'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useQuasar } from 'quasar'

// quasar
const $q = useQuasar()

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)

// set calculation profile
const ballisticStore = useBallisticStore()
const { profileId } = storeToRefs(ballisticStore)

const filter = ref('')

const columns = [
  {
    name: 'weapon',
    field: (row) => row.weapon.name,
    label: 'Weapon',
    align: 'left',
    sortable: true
  },
  {
    name: 'optic',
    field: (row) => row.optic.model,
    label: 'Optic',
    align: 'left',
    sortable: true
  },
  {
    name: 'opticHeight',
    field: (row) => row.optic.height,
    label: 'Optic Height',
    format: (val, row) => `${val} ${row.optic.heightUnit}`,
    align: 'left',
    sortable: true
  },
  {
    name: 'ammo',
    field: (row) => row.bullet.brand,
    label: 'Ammo brand',
    align: 'left',
    sortable: true
  },
  {
    name: 'caliber',
    field: (row) => row.bullet.diameter,
    label: 'Caliber',
    format: (val, row) => `${val} ${row.bullet.diameterUnit}`,
    align: 'left',
    sortable: true
  },
  {
    name: 'velocity',
    field: (row) => row.bullet.velocity,
    label: 'Velocity',
    format: (val, row) => `${val} ${row.bullet.velocityUnit}`,
    align: 'left',
    sortable: true
  }
]

// selection
const selected = ref([])
// set value if found in ballistic store
watch(profileId, (newValue) => {
  if (newValue) {
    selected.value = [profilesStore.profilebyId(profileId.value)]
  }
}, {
  immediate: true
})
// update ballistic store when selected is updated
watch(selected, (newValue) => {
  if (newValue.length > 0) {
    ballisticStore.profileId = newValue[0].id
  } else {
    ballisticStore.profileId = null
  }
})

// sort table after component is mounted
const profilesTable = ref()
onMounted(() => {
  profilesTable.value.sort('weapon')
})

</script>
