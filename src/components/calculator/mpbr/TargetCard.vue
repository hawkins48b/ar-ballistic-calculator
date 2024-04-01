<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md"
  >
    <q-form>
      <q-input
        v-model="target.size"
        label="Target size"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[
          val => val && val > 0 || 'The target size must be positive'
        ]"
        class="q-mt-md"
        hint="Recommended value is 17.7 inch / 45 cm"
        debounce="500"
      >
        <template #append>
          <q-btn-toggle
            v-model="target.unit"
            no-caps
            :options="[
              {label: 'IN', value: 'IN'},
              {label: 'CM', value: 'CM'}
            ]"
          />
        </template>
      </q-input>
      <!--
      <div class="q-mt-md">
        <q-img
          v-if="$q.dark.isActive"
          src="~assets/ipsc-target-white.svg"
          style="height:400px;color:white"
          fit="fill"
        />
        <q-img
          v-if="!$q.dark.isActive"
          src="~assets/ipsc-target-black.svg"
          style="height:400px;color:white"
          fit="fill"
        />
      </div>
      <div class="text-center">
        <p>IPSC target</p>
      </div>
      -->
    </q-form>
  </q-card>
</template>

<script setup>
// imports
import { useMpbrStore } from 'stores/mpbr'
import { storeToRefs } from 'pinia'

// set calculation profile
const mpbrStore = useMpbrStore()
const { target } = storeToRefs(mpbrStore)

</script>
