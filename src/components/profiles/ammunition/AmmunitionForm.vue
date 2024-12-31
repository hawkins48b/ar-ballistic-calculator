<template>
  <q-form @submit="submit">
    <AmmunitionNameInput
      v-model="ammunition.name"
      class="q-mt-md"
    />
    <AmmunitionDiameterInput
      v-model:diameter="ammunition.diameter"
      v-model:unit="ammunition.diameterUnit"
      class="q-mt-md"
    />
    <AmmunitionLengthInput
      v-model:length="ammunition.length"
      v-model:unit="ammunition.lengthUnit"
      class="q-mt-md"
    />
    <AmmunitionWeightInput
      v-model:weight="ammunition.weight"
      v-model:unit="ammunition.weightUnit"
      class="q-mt-md"
    />
    <AmmunitionBallisticCoefficientInput
      v-model:coefficient="ammunition.ballisticCoefficient"
      v-model:profile="ammunition.ballisticCoefficientProfile"
      class="q-mt-md"
    />
    <div class="q-mt-md">
      <q-btn
        v-if="context === 'new'"
        type="submit"
        icon="add"
        color="primary"
        class="full-width"
      >
        Add
      </q-btn>
      <q-btn
        v-if="context === 'edit'"
        type="submit"
        icon="edit"
        class="full-width"
        color="primary"
      >
        Edit
      </q-btn>
    </div>
  </q-form>
</template>

<script setup>
import AmmunitionNameInput from './AmmunitionNameInput.vue'
import AmmunitionDiameterInput from './AmmunitionDiameterInput.vue'
import AmmunitionLengthInput from './AmmunitionLengthInput.vue'
import AmmunitionWeightInput from './AmmunitionWeightInput.vue'
import AmmunitionBallisticCoefficientInput from './AmmunitionBallisticCoefficientInput.vue'
import { ref, computed } from 'vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'

const emit = defineEmits(['submited'])

const props = defineProps({
  id: {
    type: Number,
    required: false,
    default: -1
  }
})

const ammunitionStore = useAmmunitionStore()
const ammunition = ref({})

const context = computed(() => {
  let context = ''
  if (props.id === -1) {
    context = 'new'
  } else {
    context = 'edit'
  }
  return context
})

if (context.value === 'new') {
  ammunition.value = {
    ...ammunitionStore.getAmmunitionModel()
  }
}
if (context.value === 'edit') {
  ammunition.value = {
    ...ammunitionStore.getAmmunition(props.id)
  }
}

const submit = function () {
  if (context.value === 'new') {
    ammunitionStore.addAmmunition(ammunition.value)
  }
  if (context.value === 'edit') {
    ammunitionStore.editAmmunition(ammunition.value)
  }
  emit('submited')
}
</script>
