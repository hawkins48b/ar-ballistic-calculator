<template>
  <div>
    <q-btn
      color="primary"
      icon="zoom_in"
      @click="dialog=true"
    >
      Search
    </q-btn>
    <q-dialog v-model="dialog">
      <q-card
        :class="{'bg-grey-3':!$q.dark.isActive}"
        flat
        class="q-pa-md"
      >
        <q-card-section>
          <p class="text-h3">
            Search Caliber
          </p>
          <p>
            Select predefined ammunition data.<br>
            Please update the bullet specification to the manufacturer's data.
          </p>
          <q-input
            v-model="ammoSearchInput"
            debounce="500"
            label="Ammo name or caliber"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section v-if="ammoSearchInput !=='' && ammoList.length > 0">
          <p>Results</p>
          <q-list

            bordered
            separator
          >
            <q-item
              v-for="(ammo) in ammoList"
              :key="ammo.brand"
              v-ripple
              clickable
              :active="ammo.brand === selectedAmmo"
              onchange="selectedAmmo = null"
            >
              <q-item-section

                @click="selectAmmo(ammo.brand)"
              >
                {{ ammo.brand }} - {{ ammo.weight }} {{ ammo.weightUnit }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section v-if="ammoSearchInput !=='' && ammoList.length === 0">
          <p>No caliber found.</p>
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="q-ml-sm"
            color="primary"
            :disable="selectedAmmo === null"
            @click="applyAmmo"
          >
            Select
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineModel } from 'vue'
import ammoSource from '../../../models/ammoFinder.json'

// props
const ammoProfile = defineModel({
  type: Object,
  required: true
})

const dialog = ref(false)
const ammoSearchInput = ref('')
const selectedAmmo = ref(null)

// filtered ammo list
const ammoList = computed(() => {
  const needle = ammoSearchInput.value.toLowerCase().replaceAll(',', '').replaceAll('.', '').replaceAll(' ', '')

  return ammoSource.filter((bullet) => bullet.brand.toLowerCase().replaceAll(' ', '').replaceAll('.', '').indexOf(needle) > -1)
})

// select ammo
const selectAmmo = (ammoBrand) => {
  selectedAmmo.value = ammoBrand
}

const applyAmmo = () => {
  const indexSource = ammoSource.map((ammo) => {
    return ammo.brand
  }).indexOf(selectedAmmo.value)

  if (indexSource > -1) {
    // doing it twice isn't a mistake. it prevent unit conversion issues due to watchers
    ammoProfile.value = {
      skipConversion: true,
      ...ammoSource[indexSource]
    }
    dialog.value = false
  }
}

watch(dialog, () => {
  // when dialog is closed, reset values
  if (!dialog.value) {
    selectedAmmo.value = null
    ammoSearchInput.value = ''
  }
})

</script>
