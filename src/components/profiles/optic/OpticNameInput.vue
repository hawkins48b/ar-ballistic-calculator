<template>
  <q-input
    v-model="name"
    label="Optic name"
    filled
    type="text"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please name your optic']"
    hint="Manufacturer and model"
  />
</template>

<script setup>

const name = defineModel({
  type: String
})

</script>
