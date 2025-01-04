<template>
  <q-input
    v-model="name"
    label="Setup name"
    filled
    type="text"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please name your setup']"
    hint="Name of your setup"
  />
</template>

<script setup>

const name = defineModel({
  type: String
})

</script>
