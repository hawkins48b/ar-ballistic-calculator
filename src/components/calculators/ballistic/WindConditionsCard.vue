<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md full-height"
  >
    <div class="row justify-between">
      <div class="col-auto">
        <div class="text-h6">
          <q-icon
            name="air"
            size="lg"
            class="q-mr-sm"
          />
          Wind conditions
        </div>
      </div>
      <div class="col-auto">
        <q-btn
          icon="restart_alt"
          flat
          @click="ballisticStore.resetWind"
        >
          <q-tooltip>
            Reset
          </q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-input
      v-model="wind.speed"
      label="Wind speed"
      type="number"
      step="any"
      filled
      debounce="500"
      class="q-mt-md"
      :rules="[
        val => val && parseFloat(val) >= 0 || 'Wind speed must be 0 or positive'
      ]"
      lazy-rules
    >
      <template #append>
        <q-btn-toggle
          v-model="wind.speedUnit"
          no-caps
          :options="[
            {label: 'MPH', value: 'MPH'},
            {label: 'MPS', value: 'MPS'}
          ]"
        />
      </template>
    </q-input>

    <div class="row">
      <div class="col">
        <q-input
          v-model="wind.direction"
          label="Wind direction"
          type="number"
          step="any"
          filled
          debounce="500"
          class="q-mt-md"
          suffix="Clock bearing"
          :rules="[
            val => val && parseFloat(val) >= 0 && parseFloat(val) <= 12 || 'Wind direction must be 0 or positive'
          ]"
          lazy-rules
        />
      </div>
      <div class="col-auto">
        <q-knob
          v-model="wind.direction"
          :min="0"
          :max="12"
          show-value
          size="50px"
          :thickness="0.22"
          color="primary"
          track-color="grey-3"
          class="q-ma-md no-shadow"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
// imports
import { storeToRefs } from 'pinia'
import { useBallisticStore } from 'stores/ballistic'
import { watch } from 'vue'

// ballistic store
const ballisticStore = useBallisticStore()
// wind state
const {
  wind,
  options
} = storeToRefs(ballisticStore)

// if we hide wind conditions, reset wind parameters
watch(() => options.value.showWindConditions, (newValue) => {
  if (!newValue) {
    ballisticStore.resetWind()
  }
}, {
  immediate: true
})
</script>
