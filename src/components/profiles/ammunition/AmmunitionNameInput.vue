<template>
  <q-input
    v-model="name"
    label="Ammunition name"
    filled
    type="text"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please name your ammunition']"
    hint="Manufacturer and type"
  />
</template>

<script setup>

const name = defineModel({
  type: String
})

</script>
