<template>
  <q-form>
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
    <div>
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
    </div>
  </q-form>
</template>

<script setup>

const ammunition = defineModel({
  type: Object,
  required: true
})
</script>
