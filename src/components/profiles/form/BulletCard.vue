<template>
  <zroCard>
    <q-card-section>
      <div class="row justify-between">
        <div class="col text-h6">
          Ammuntion
        </div>
        <div class="col text-right">
          <AmmoFinderBtn v-model="localProfile.bullet" />
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input
        v-model="localProfile.bullet.brand"
        label="Bullet brand"
        filled
        type="text"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please name your ammo']"
        class="q-mt-md"
        hint="Manufacturer and type"
      />

      <q-input
        v-model="localProfile.bullet.diameter"
        label="Bullet diameter"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[
          val => val && val > 0 || 'Bullet diameter must be positive',
          val => val && val < 13 || val + ' ' + localProfile.bullet.diameterUnit +' is a big bullet, are you missing a comma ?'
        ]"
        class="q-mt-md"
        hint="e.g .223 inch or 5.56 mm"
      >
        <template #append>
          <q-btn-toggle
            v-model="localProfile.bullet.diameterUnit"
            no-caps
            :options="[
              {label: 'IN', value: 'IN'},
              {label: 'MM', value: 'MM'}
            ]"
          />
        </template>
      </q-input>

      <q-input
        v-model="localProfile.bullet.weight"
        label="Bullet weight"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Bullet weight must be positive']"
        class="q-mt-md"
        hint="e.g 55 GR"
      >
        <template #append>
          <q-btn-toggle
            v-model="localProfile.bullet.weightUnit"
            no-caps
            :options="[
              {label: 'GR', value: 'GR'},
              {label: 'G', value: 'G'}
            ]"
          />
        </template>
      </q-input>
      <q-input
        v-model="localProfile.bullet.ballisticCoefficient"
        label="Ballistic coefficient"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Ballistic coefficient must be positive']"
        class="q-mt-md"
        hint="e.g 0.290 G1"
      >
        <template #append>
          <q-btn-toggle
            v-model="localProfile.bullet.ballisticCoefficientProfile"
            no-caps
            :options="[
              {label: 'G1', value: 'G1'},
              {label: 'G7', value: 'G7'}
            ]"
          />
        </template>
      </q-input>
      <div v-if="localProfile.options.enableSpinDrift">
        <q-input
          v-model="localProfile.bullet.length"
          label="Bullet length"
          filled
          step="any"
          type="number"
          lazy-rules
          :rules="[
            val => val && val > 0 && localProfile.options.enableSpinDrift|| 'bullet length must be positive'
          ]"
          class="q-mt-md"
          hint="The length of the bullet, e.g 0.746 for M193"
        >
          <template #append>
            <q-btn-toggle
              v-model="localProfile.bullet.lengthUnit"
              no-caps
              :options="[
                {label: 'IN', value: 'IN'},
                {label: 'MM', value: 'MM'}
              ]"
            />
          </template>
        </q-input>
      </div>
    </q-card-section>
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import AmmoFinderBtn from './AmmoFinderBtn.vue'
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

// conversion for bullet diameter
watch(() => localProfile.value.bullet.diameterUnit, (newValue) => {
  if (localProfile.value.bullet.skipConversion !== true) {
    if (newValue === 'IN') {
      localProfile.value.bullet.diameter = BC.UNew.Millimeter(localProfile.value.bullet.diameter).In(BC.Unit.Inch)
      localProfile.value.bullet.diameter = Math.round(localProfile.value.bullet.diameter * 1000) / 1000
    }
    if (newValue === 'MM') {
      localProfile.value.bullet.diameter = BC.UNew.Inch(localProfile.value.bullet.diameter).In(BC.Unit.Millimeter)
      localProfile.value.bullet.diameter = Math.round(localProfile.value.bullet.diameter * 100) / 100
    }
  }
})
// conversion for bullet weight
watch(() => localProfile.value.bullet.weightUnit, (newValue) => {
  if (localProfile.value.bullet.skipConversion !== true) {
    if (newValue === 'GR') {
      localProfile.value.bullet.weight = BC.UNew.Gram(localProfile.value.bullet.weight).In(BC.Unit.Grain)
      localProfile.value.bullet.weight = Math.round(localProfile.value.bullet.weight)
    }
    if (newValue === 'G') {
      localProfile.value.bullet.weight = BC.UNew.Grain(localProfile.value.bullet.weight).In(BC.Unit.Gram)
      localProfile.value.bullet.weight = Math.round(localProfile.value.bullet.weight * 100) / 100
    }
  }
})
// conversion for bullet length
watch(() => localProfile.value.bullet.lengthUnit, (newValue) => {
  if (localProfile.value.bullet.skipConversion !== true) {
    if (newValue === 'IN') {
      localProfile.value.bullet.length = BC.UNew.Millimeter(localProfile.value.bullet.length).In(BC.Unit.Inch)
      localProfile.value.bullet.length = Math.round(localProfile.value.bullet.length * 1000) / 1000
    }
    if (newValue === 'MM') {
      localProfile.value.bullet.length = BC.UNew.Inch(localProfile.value.bullet.length).In(BC.Unit.Millimeter)
      localProfile.value.bullet.length = Math.round(localProfile.value.bullet.length * 100) / 100
    }
  }
})

// reset skipConversion if detected
watch(() => localProfile.value.bullet.skipConversion, (newValue) => {
  if (newValue) {
    localProfile.value.bullet.skipConversion = false
  }
})
</script>
