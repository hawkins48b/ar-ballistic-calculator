<template>
  <div>
    <RadioCard
      v-model="usePowderSensitivity"
      :options="[
        { label:'No sensitivity', value: false },
        { label:'Powder sensitive', value: true }
      ]"
      label-class="text-body1"
    />
    <q-input
      v-if="usePowderSensitivity"
      v-model.number="modifier"
      label="Speed modifier"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Speed modifier must be positive'
      ]"
      hint="Speed variation per degree temperature change"
      class="q-mt-md"
    >
      <template #append>
        <q-btn-toggle
          v-model="powderModifierUnit"
          no-caps
          dense
          :options="[
            {label: 'FPS/°F', value: 'FPS/°F'},
            {label: 'MPS/°C', value: 'MPS/°C'}
          ]"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import RadioCard from 'src/components/RadioCard.vue'
import { ref, onMounted, watch } from 'vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'

const usePowderSensitivity = defineModel('use-powder-sensitivity', {
  type: [Boolean]
})
const powderModifier = defineModel('powder-modifier', {
  type: [String, Number]
})
const powderModifierUnit = defineModel('powder-modifier-unit', {
  type: [String]
})

const modifier = ref(0)

const ammunitionStore = useAmmunitionStore()

onMounted(() => {
  if (powderModifierUnit.value === 'FPS/°F') {
    modifier.value = ammunitionStore.convertMPSbyCtoFPSbyF(powderModifier.value)
  }
  if (powderModifierUnit.value === 'MPS/°C') {
    modifier.value = powderModifier.value
  }
})

/*
 * Unit conversion
 */

// conversion for powder modifier
watch(powderModifierUnit, (newUnit) => {
  if (newUnit === 'FPS/°F') {
    modifier.value = ammunitionStore.convertMPSbyCtoFPSbyF(modifier.value)
  }
  if (newUnit === 'MPS/°C') {
    modifier.value = ammunitionStore.convertFPSbyFtoMPSbyC(modifier.value)
  }
})

// save only MPS/°C in the store
watch(modifier, () => {
  if (powderModifierUnit.value === 'FPS/°F') {
    powderModifier.value = ammunitionStore.convertFPSbyFtoMPSbyC(modifier.value)
  }

  if (powderModifierUnit.value === 'MPS/°C') {
    powderModifier.value = modifier.value
  }
})

</script>
