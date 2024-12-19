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
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useQuasar } from 'quasar'

// eslint-disable-next-line vue/require-prop-types
const profileId = defineModel()

// quasar
const $q = useQuasar()

// list profiles
const profilesStore = useProfilesStore()
const { profiles } = storeToRefs(profilesStore)

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
    name: 'opticZero',
    field: (row) => row.optic.zero,
    label: 'Optic Zero',
    format: (val, row) => `${val} ${row.optic.zeroUnit}`,
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
    field: (row) => row.measures.velocity,
    label: 'Velocity',
    format: (val, row) => `${val} ${row.measures.velocityUnit}`,
    align: 'left',
    sortable: true
  }
]

// selection
const selected = ref([])
// set value if found provided by v-model
watch(profileId, (newValue) => {
  if (newValue) {
    selected.value = [profilesStore.profilebyId(profileId.value)]
  }
}, {
  immediate: true
})
// update v-model when selected is updated
watch(selected, (newValue) => {
  if (newValue.length > 0) {
    profileId.value = newValue[0].id
  } else {
    profileId.value = null
  }
})

// sort table after component is mounted
const profilesTable = ref()
onMounted(() => {
  profilesTable.value.sort('weapon')
})

</script>
