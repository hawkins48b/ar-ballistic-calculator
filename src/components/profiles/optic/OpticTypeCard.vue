<template>
  <q-card
    v-ripple
    class="cursor-pointer"
  >
    <q-card-section class="text-center">
      <q-icon
        :name="icon"
        size="lg"
      />
      <div class="text-h7">
        {{ name }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
</script>
