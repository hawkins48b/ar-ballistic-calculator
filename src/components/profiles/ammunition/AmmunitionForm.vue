<template>
  <q-form @submit="submit">
    <AmmunitionNameInput
      v-model="ammunition.name"
    />
    <AmmunitionNotesInput
      v-model="ammunition.notes"
      class="q-mt-md"
    />
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">
          Bullet
        </div>
      </q-card-section>
      <q-card-section>
        <AmmunitionDiameterInput
          v-model:diameter="ammunition.diameter"
          v-model:unit="ammunition.diameterUnit"
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
      </q-card-section>
    </q-card>

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
import { computed } from 'vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'
import AmmunitionNotesInput from './AmmunitionNotesInput.vue'

const emit = defineEmits(['submited'])

const ammunition = defineModel({
  type: Object
})

const ammunitionStore = useAmmunitionStore()

const context = computed(() => {
  let context = ''
  if (ammunition.value.id === undefined) {
    context = 'new'
  } else {
    context = 'edit'
  }
  return context
})

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
