<template>
  <zroCard>
    <div class="text-h6">
      Optic
    </div>
    <q-input
      v-model="localProfile.optic.model"
      label="Optic name"
      filled
      type="text"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please name your optic']"
      class="q-mt-md"
      hint="e.g Trijicon ACOG TA31"
    />
    <q-input
      v-model="localProfile.optic.height"
      label="Optic height"
      filled
      type="number"
      step="any"
      lazy-rules
      :rules="[ val => val && val > 0 || 'Optic height must be positive']"
      class="q-mt-md"
      hint="Distance between the center of the optic and the bore axis"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.optic.heightUnit"
          no-caps
          :options="[
            {label: 'IN', value: 'IN'},
            {label: 'CM', value: 'CM'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="localProfile.optic.zero"
      label="Optic zero distance"
      filled
      type="number"
      step="any"
      lazy-rules
      :rules="[ val => val && val > 0 || 'Zero distance must be positive']"
      class="q-mt-md"
      hint="Distance from the muzzle to the zeroing target"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.optic.zeroUnit"
          no-caps
          :options="[
            {label: 'YD', value: 'YD'},
            {label: 'M', value: 'M'}
          ]"
        />
      </template>
    </q-input>
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import * as BC from 'js-ballistics'
import { ref, watch } from 'vue'

// props
const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

// event emit
const emits = defineEmits(['update:profile'])// props
const localProfile = ref(props.profile)

watch(localProfile, (newValue) => {
  emits('update:profile', newValue)
})

/*
 * Unit conversion
 */

// conversion for optic height
watch(() => localProfile.value.optic.heightUnit, (newValue) => {
  if (newValue === 'IN') {
    localProfile.value.optic.height = BC.UNew.Centimeter(localProfile.value.optic.height).In(BC.Unit.Inch)
    localProfile.value.optic.height = Math.round(localProfile.value.optic.height * 100) / 100
  }
  if (newValue === 'CM') {
    localProfile.value.optic.height = BC.UNew.Inch(localProfile.value.optic.height).In(BC.Unit.Centimeter)
    localProfile.value.optic.height = Math.round(localProfile.value.optic.height * 100) / 100
  }
})
// converion for optic zero
watch(() => localProfile.value.optic.zeroUnit, (newValue) => {
  if (newValue === 'YD') {
    localProfile.value.optic.zero = BC.UNew.Meter(localProfile.value.optic.zero).In(BC.Unit.Yard)
    localProfile.value.optic.zero = Math.round(localProfile.value.optic.zero * 100) / 100
  }
  if (newValue === 'M') {
    localProfile.value.optic.zero = BC.UNew.Yard(localProfile.value.optic.zero).In(BC.Unit.Meter)
    localProfile.value.optic.zero = Math.round(localProfile.value.optic.zero * 100) / 100
  }
})
</script>
