<template>
  <q-form @submit="submit">
    <q-input
      v-model="ammunition.name"
      label="Ammunition name"
      filled
      type="text"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please name your ammunition']"
      class="q-mt-md"
      hint="Manufacturer and type"
    />

    <q-input
      v-model="ammunition.diameter"
      label="Bullet diameter"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Bullet diameter must be positive',
        val => val && val < 13 || val + ' ' + ammunition.diameterUnit +' is a big bullet, are you missing a comma ?'
      ]"
      class="q-mt-md"
      hint="e.g .223 inch or 5.56 mm"
    >
      <template #append>
        <q-btn-toggle
          v-model="ammunition.diameterUnit"
          no-caps
          :options="[
            {label: 'IN', value: 'IN'},
            {label: 'MM', value: 'MM'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="ammunition.length"
      label="Bullet length"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'bullet length must be positive'
      ]"
      class="q-mt-md"
      hint="The length of the bullet, e.g 0.746 for M193"
    >
      <template #append>
        <q-btn-toggle
          v-model="ammunition.lengthUnit"
          no-caps
          :options="[
            {label: 'IN', value: 'IN'},
            {label: 'MM', value: 'MM'}
          ]"
        />
      </template>
    </q-input>

    <q-input
      v-model="ammunition.weight"
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
          v-model="ammunition.weightUnit"
          no-caps
          :options="[
            {label: 'GR', value: 'GR'},
            {label: 'G', value: 'G'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="ammunition.ballisticCoefficient"
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
          v-model="ammunition.ballisticCoefficientProfile"
          no-caps
          :options="[
            {label: 'G1', value: 'G1'},
            {label: 'G7', value: 'G7'}
          ]"
        />
      </template>
    </q-input>
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

if (props.id === -1) {
  ammunition.value = {
    ...ammunitionStore.getAmmunitionModel()
  }
} else {
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
