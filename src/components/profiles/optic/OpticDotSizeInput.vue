<template>
  <q-input
    v-model="dotSize"
    label="Center dot size"
    filled
    type="text"
    lazy-rules
    :rules="[ val => val && val > 0 || 'the dot size must be positive' ]"
    hint="The size of the center dot in the reticle."
  >
    <template #append>
      <q-btn-toggle
        v-model="unit"
        no-caps
        :options="[
          {label: 'MOA', value: 'MOA'}
        ]"
      />
    </template>
  </q-input>
</template>

<script setup>
import { ref } from 'vue'

const unit = ref('MOA')

const dotSize = defineModel({
  type: [String, Number]
})

</script>
