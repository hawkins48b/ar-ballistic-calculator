<template>
  <div class="q-pa-md row items-center">
    <div class="col-auto">
      <q-btn
        v-if="backTo"
        :to="backTo"
        icon="arrow_back"
        flat
        class="q-mr-sm"
        round
      />
    </div>
    <div class="col text-h4">
      {{ $route.name }}
    </div>
    <div class="col-auto">
      <slot />
    </div>
  </div>
</template>

<script setup>

defineProps({
  backTo: {
    type: String,
    required: false,
    default: ''
  }
})

</script>
