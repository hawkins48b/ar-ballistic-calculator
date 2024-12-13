<template>
  <div>
    <q-btn
      color="primary"
      icon="zoom_in"
      @click="dialog=true"
    >
      Ammo Finder
    </q-btn>
    <q-dialog v-model="dialog">
      <q-card
        :class="{'bg-grey-3':!$q.dark.isActive}"
        flat
        class="q-pa-md"
      >
        <q-card-section>
          <p class="text-h3">
            Ammo Finder
          </p>
          <p>
            Select predefined ammunition data.<br>Please update the bullet specification to the manufacturer's data.
          </p>
          <q-select
            v-model="ammoSelected"
            clearable
            filled
            :options="ammoList"
            label="Predefined bullet"
            @change="console.log(ammoSelected)"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="q-ml-sm"
            color="primary"
          >
            Select
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ammoSource from '../../../models/ammoFinder.json'

const dialog = ref(true)
const ammoSelected = ref(null)

const ammoList = ammoSource.map((ammo, index) => {
  return {
    label: ammo.brand,
    value: index
  }
})

</script>
