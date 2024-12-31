<template>
  <q-input
    v-model.number="coefficient"
    label="Ballistic coefficient"
    filled
    step="any"
    type="number"
    lazy-rules
    :rules="[ val => val && val > 0 || 'Ballistic coefficient must be positive']"
    hint="e.g 0.290 G1"
  >
    <template #append>
      <q-btn-toggle
        v-model="profile"
        no-caps
        :options="[
          {label: 'G1', value: 'G1'},
          {label: 'G7', value: 'G7'}
        ]"
      />
    </template>
  </q-input>
</template>

<script setup>
const coefficient = defineModel('coefficient', {
  type: [String, Number]
})
const profile = defineModel('profile', {
  type: String
})
</script>
