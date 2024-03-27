<template>
  <q-form @submit="calculate">
    <q-input
      v-model="zero.distance"
      label="Rifle zero distance"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'The distance must be positive'
      ]"
      class="q-mt-md"
      hint="e.g 25 YD or 25 M"
    >
      <template #append>
        <q-btn-toggle
          v-model="zero.unit"
          no-caps
          :options="[
            {label: 'YD', value: 'YD'},
            {label: 'M', value: 'M'}
          ]"
        />
      </template>
    </q-input>

    <q-input
      v-model="range.distance"
      label="Range"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Range must be positive'
      ]"
      class="q-mt-md"
      hint="e.g 500 YD or 500 M"
    >
      <template #append>
        <q-btn-toggle
          v-model="range.unit"
          no-caps
          :options="[
            {label: 'YD', value: 'YD'},
            {label: 'M', value: 'M'}
          ]"
        />
      </template>
    </q-input>

    <q-input
      v-model="range.step"
      label="Step"
      filled
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Step must be positive',
        val => val && val < range.distance || 'Step must be lower than range'
      ]"
      class="q-mt-md"
      hint="Recommended value is 25"
    />

    <q-btn
      color="primary"
      class="q-mt-md"
      type="submit"
    >
      Calculate
    </q-btn>
  </q-form>
</template>

<script setup>
// imports
import { useCalculatorStore } from 'stores/calculator'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { computed } from 'vue'

const $q = useQuasar()

const router = useRouter()

// set calculation profile
const calculatorStore = useCalculatorStore()
const { range, zero } = storeToRefs(calculatorStore)
const profileId = computed(() => calculatorStore.profileId)

// calculate event
const calculate = () => {
  if (profileId.value === null) {
    $q.dialog({
      title: 'No profile selected',
      message: 'You must select a profile for the ballistic calculator'
    })
  } else {
    router.push('/calculator/ballistic')
  }
}
</script>
