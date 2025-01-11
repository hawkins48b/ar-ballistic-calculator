<template>
  <q-form>
    <RadioCard
      v-model="range.unit"
      :options="[
        { label:'YD', value: 'YD' },
        { label:'M', value: 'M' }
      ]"
      label-class="text-body1"
    />
    <q-input
      v-model="range.distance"
      debounce="500"
      filled
      label="Range"
      type="number"
      :suffix="range.unit"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Range must be positive',
        val => val && val <= 3000 || 'Range excessive'
      ]"
      class="q-mt-md"
    />

    <div>
      <div clasS="q-mb-sm">
        Divider
      </div>
      <RadioCard
        v-model="range.step"
        :options="[
          { label:`1${range.unit}`, value: 1 },
          { label:`25${range.unit}`, value: 25 },
          { label:`50${range.unit}`, value: 50 },
          { label:`100${range.unit}`, value: 100 }
        ]"
        label-class="text-caption"
      />
    </div>
  </q-form>
</template>

<script setup>
import RadioCard from 'src/components/RadioCard.vue'

// imports
const range = defineModel({
  type: Object,
  required: true
})

</script>
