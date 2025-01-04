<template>
  <div>
    <RadioCard
      v-model="isZoomVariable"
      :options="[
        { label:'Fixed', value: false },
        { label:'Variable', value: true }
      ]"
      label-class="text-body1"
    />

    <div
      class="
      row
      q-gutter-md q-mt-xs"
    >
      <div
        v-if="!isZoomVariable"
        class="col"
      >
        <q-input
          v-model.number="zoomFixed"
          filled
          type="number"
          label="Magnification"
          lazy-rules
          :rules="[
            val => val && val > 0 || 'Magnification must be positive'
          ]"
          suffix="x"
        />
      </div>
      <div
        v-if="isZoomVariable"
        class="col"
      >
        <q-input
          v-model.number="zoomMin"
          filled
          type="number"
          lazy-rules
          :rules="[
            val => val && val > 0 || 'Magnification must be positive'
          ]"
          label="Min magnification"
          suffix="x"
        />
      </div>
      <div
        v-if="isZoomVariable"
        class="col"
      >
        <q-input
          v-model.number="zoomMax"
          filled
          type="number"
          lazy-rules
          :rules="[
            val => val && val >= zoomMin || 'must be greater.'
          ]"
          label="Max magnification"
          suffix="x"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import RadioCard from 'src/components/RadioCard.vue'
import { watch, ref, onMounted } from 'vue'

const zoom = defineModel({
  type: [Number, String, Array]
})

const isZoomVariable = ref(false)
const zoomFixed = ref(1)
const zoomMin = ref(1)
const zoomMax = ref(1)

onMounted(() => {
  if (Array.isArray(zoom.value)) {
    isZoomVariable.value = true
    zoomMin.value = zoom.value[0]
    zoomMax.value = zoom.value[1]
  } else {
    zoomFixed.value = zoom.value
  }
})

watch(zoomFixed, () => {
  zoom.value = zoomFixed.value
})

watch(zoomMin, () => {
  zoom.value = [zoomMin.value, zoomMax.value]
})

watch(zoomMax, () => {
  zoom.value = [zoomMin.value, zoomMax.value]
})

watch(isZoomVariable, () => {
  if (isZoomVariable.value) {
    zoom.value = [zoomMin.value, zoomMax.value]
  } else {
    zoom.value = zoomMin.value
  }
})
</script>
