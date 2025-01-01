<template>
  <div>
    <q-btn
      icon="manage_search"
      flat
      round
      @click="dialog=true"
    />
    <q-dialog v-model="dialog">
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-center">
            <div class="text-h5">
              Search caliber
            </div>
            <p class="text-body1">
              Select predefined ammunition data.<br>
              Please update the bullet specification to the manufacturer's data.
            </p>
          </div>
          <q-input
            v-model="search"
            debounce="500"
            label="Search"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section v-if="search !==''">
          <q-card
            v-for="predefinedAmmunition in predefinedAmmunitionList"
            :key="predefinedAmmunition.name"
            v-ripple
            class="q-mt-sm cursor-pointer"
            :class="{active:selectedAmmunition.name === predefinedAmmunition.name}"
            @click="selectedAmmunition = predefinedAmmunition"
          >
            <q-card-section>
              <div class="text-h6">
                {{ predefinedAmmunition.name }}
              </div>

              <div>
                {{ predefinedAmmunition.weight }} {{ predefinedAmmunition.weightUnit }}
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-actions vertical>
          <q-btn
            color="primary"
            @click="select"
          >
            Select
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'
import { ref, computed, nextTick } from 'vue'

const ammunition = defineModel({
  type: Object
})

const dialog = ref(false)

const search = ref('')

const ammuntionStore = useAmmunitionStore()

const predefinedAmmunitionList = computed(() => {
  const ammunitionList = ammuntionStore.predefinedAmmunitionList
  const needle = search.value.toLowerCase().replaceAll(',', '').replaceAll('.', '').replaceAll(' ', '')

  return ammunitionList.filter((bullet) => bullet.name.toLowerCase().replaceAll(' ', '').replaceAll('.', '').indexOf(needle) > -1)
})

const selectedAmmunition = ref({})

const select = function () {
  if (selectedAmmunition.value.name !== undefined) {
    // keep the original id
    if (ammunition.value.id) {
      selectedAmmunition.value.id = ammunition.value.id
    }

    ammunition.value = {
      ...selectedAmmunition.value
    }
    // trick for preventing unit conversion on subsequent inputs
    nextTick(() => {
      ammunition.value = {
        ...selectedAmmunition.value
      }
      // reset form
      resetDialog()
      dialog.value = false
    })
  }
}

function resetDialog () {
  search.value = ''
  selectedAmmunition.value = {}
}

</script>
