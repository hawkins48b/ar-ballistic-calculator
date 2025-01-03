<template>
  <q-input
    v-model="name"
    label="Notes"
    filled
    type="text"
    autogrow
  />
</template>

<script setup>

const name = defineModel({
  type: String
})

</script>
