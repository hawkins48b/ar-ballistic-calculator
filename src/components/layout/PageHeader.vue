<template>
  <div class="q-pa-md row items-center">
    <div class="col">
      <q-btn
        v-if="backTo"
        icon="arrow_back"
        flat
        class="q-mr-sm"
        round
        @click="router.push(props.backTo)"
      />
      <q-btn
        v-if="back"
        icon="arrow_back"
        flat
        class="q-mr-sm"
        round
        @click="router.back()"
      />
    </div>
    <div class="col-auto text-h6 text-bold">
      {{ $route.name }}
    </div>
    <div class="col text-right">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  backTo: {
    type: String,
    required: false,
    default: ''
  },
  back: {
    type: Boolean,
    required: false,
    default: false
  }
})

</script>
