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
      <zroCard>hello</zroCard>
    </q-dialog>
  </div>
</template>

<script setup>
import zroCard from 'components/zroCard.vue'
import { ref } from 'vue'

const dialog = ref(false)
</script>
