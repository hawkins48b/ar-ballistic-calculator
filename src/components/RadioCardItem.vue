<template>
  <q-card
    v-ripple
    class="cursor-pointer"
  >
    <q-card-section class="text-center">
      <q-icon
        v-if="icon"
        :name="icon"
        :size="iconSize"
      />
      <div :class="labelClass">
        {{ label }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: false,
    default: ''
  },
  iconSize: {
    type: String,
    default: 'lg',
    required: false
  },
  label: {
    type: String,
    required: true
  },
  labelClass: {
    type: String,
    default: 'text-h7',
    required: false
  }
})
</script>
