<template>
  <zroCard>
    <div class="text-h6">
      Rifle
    </div>
    <q-input
      v-model="localProfile.weapon.name"
      label="Weapon designation"
      filled
      type="text"
      class="q-mt-md"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please name your weapon']"
      hint="e.g LMT AR 14.5''"
    />
    <div
      v-if="localProfile.options.enableSpinDrift"
      class="q-mt-md"
    >
      <q-input

        v-model="localProfile.weapon.barrelTwist"
        label=" Barrel twist"
        filled
        type="number"
        step="any"
        lazy-rules
        prefix="1 / "
        :rules="[
          val => val && val > 0 && localProfile.options.enableSpinDrift || 'Barrel Twist must be positive'
        ]"
        class="q-mt-md"
        hint="Length of the groove for one rotation of the bullet."
      >
        <template #append>
          <q-btn-toggle
            v-model="localProfile.weapon.barrelTwistUnit"
            no-caps
            :options="[
              {label: 'IN', value: 'IN'},
              {label: 'MM', value: 'MM'}
            ]"
          />
        </template>
      </q-input>
    </div>
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

// conversion for barrel twist
watch(() => localProfile.value.weapon.barrelTwistUnit, (newValue) => {
  if (newValue === 'IN') {
    localProfile.value.weapon.barrelTwist = BC.UNew.Centimeter(localProfile.value.weapon.barrelTwist).In(BC.Unit.Inch)
    localProfile.value.weapon.barrelTwist = Math.round(localProfile.value.weapon.barrelTwist * 10) / 10
  }
  if (newValue === 'MM') {
    localProfile.value.weapon.barrelTwist = BC.UNew.Inch(localProfile.value.weapon.barrelTwist).In(BC.Unit.Centimeter)
    localProfile.value.weapon.barrelTwist = Math.round(localProfile.value.weapon.barrelTwist)
  }
})
</script>
