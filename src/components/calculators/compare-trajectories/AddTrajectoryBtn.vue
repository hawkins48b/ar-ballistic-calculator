<template>
  <div>
    <q-btn
      color="primary"
      icon="add"
      @click="dialog=true"
    >
      Add trajectory
    </q-btn>
    <q-dialog v-model="dialog">
      <q-card>hello</q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
</script>
